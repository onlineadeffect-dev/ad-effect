import { signUpUser } from './supabaseClient.js';
import { getSupabase } from './supabaseClient.js';

let currentUser = null;

export function getCurrentUser() {
  if (!currentUser) {
    const saved = localStorage.getItem('adeffect_auth_user');
    if (saved) {
      try { currentUser = JSON.parse(saved); } catch (e) {}
    }
  }
  return currentUser;
}

export function setCurrentUser(user) {
  currentUser = user;
  if (user) {
    localStorage.setItem('adeffect_auth_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('adeffect_auth_user');
  }
  window.dispatchEvent(new CustomEvent('authChange', { detail: { user } }));
}

export function initAuth() {
  window.handleDashboardNavigation = handleDashboardNavigation;

  const dashboardBtns = document.querySelectorAll('#btnGoToDashboard, #btnNavDashboard, .btn-nav-dashboard, .btn-explore');
  const btnForgotPassword = document.getElementById('btnForgotPassword');

  if (btnForgotPassword) {
    btnForgotPassword.addEventListener('click', (e) => {
      e.preventDefault();
      handleForgotPassword();
    });
  }

  const btnSwitchToSignInFromReset = document.getElementById('btnSwitchToSignInFromReset');
  if (btnSwitchToSignInFromReset) {
    btnSwitchToSignInFromReset.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAuthMode('signin');
    });
  }

  dashboardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleDashboardNavigation();
    });
  });

  // Bind Sign Up Form
  const signUpForm = document.getElementById('signUpForm');
  if (signUpForm) {
    signUpForm.addEventListener('submit', handleSignUpSubmit);
  }

  // Bind Sign In Form
  const signInForm = document.getElementById('signInForm');
  if (signInForm) {
    signInForm.addEventListener('submit', handleSignInSubmit);
  }

  // Bind Reset Password Form
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', handleResetPasswordSubmit);
  }

  // Auth View Switchers
  const btnHeaderLogin = document.getElementById('btnHeaderLogin');
  if (btnHeaderLogin) {
    btnHeaderLogin.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAuthMode('signin');
    });
  }

  const btnSwitchToSignUp = document.getElementById('btnSwitchToSignUp');
  if (btnSwitchToSignUp) {
    btnSwitchToSignUp.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAuthMode('signup');
    });
  }

  // Handle password reset redirect or hash from link if navigated to directly
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('reset') === 'true' || window.location.hash.includes('access_token')) {
    showPage('authSection');
    toggleAuthMode('reset');
  }

  // Initial routing setup on page load
  showPage('home');
}

function handleForgotPassword() {
  const email = document.getElementById('signinEmail')?.value.trim();
  showPage('authSection');
  toggleAuthMode('reset');
  if (email) {
    const resetEmailField = document.getElementById('resetEmail');
    if (resetEmailField) resetEmailField.value = email;
  }
}

export function handleDashboardNavigation() {
  const user = getCurrentUser();
  if (user && user.status === 'verified') {
    showPage('dashboardSection');
  } else {
    showPage('authSection');
  }
}

export function toggleAuthMode(mode) {
  const signUpBox = document.getElementById('signUpBox');
  const signInBox = document.getElementById('signInBox');
  const resetPasswordBox = document.getElementById('resetPasswordBox');
  const btnHeaderLogin = document.getElementById('btnHeaderLogin');

  if (mode === 'signin') {
    if (signUpBox) signUpBox.style.display = 'none';
    if (signInBox) signInBox.style.display = 'block';
    if (resetPasswordBox) resetPasswordBox.style.display = 'none';
    if (btnHeaderLogin) btnHeaderLogin.textContent = 'SIGN UP';
  } else if (mode === 'reset') {
    if (signUpBox) signUpBox.style.display = 'none';
    if (signInBox) signInBox.style.display = 'none';
    if (resetPasswordBox) resetPasswordBox.style.display = 'block';
    if (btnHeaderLogin) btnHeaderLogin.textContent = 'LOG IN';
  } else {
    if (signUpBox) signUpBox.style.display = 'block';
    if (signInBox) signInBox.style.display = 'none';
    if (resetPasswordBox) resetPasswordBox.style.display = 'none';
    if (btnHeaderLogin) btnHeaderLogin.textContent = 'LOG IN';
  }
}

async function handleResetPasswordSubmit(e) {
  e.preventDefault();

  const email = document.getElementById('resetEmail')?.value.trim();
  const newPassword = document.getElementById('resetPassword')?.value.trim();
  const confirmPassword = document.getElementById('resetConfirmPassword')?.value.trim();
  const resetErrorBox = document.getElementById('resetErrorBox');
  const resetSuccessBox = document.getElementById('resetSuccessBox');

  if (resetErrorBox) resetErrorBox.style.display = 'none';
  if (resetSuccessBox) resetSuccessBox.style.display = 'none';

  if (!email || !newPassword || !confirmPassword) {
    showResetError('Please fill out all required fields.');
    return;
  }

  if (newPassword !== confirmPassword) {
    showResetError('Passwords do not match. Please re-enter your new password.');
    return;
  }

  if (newPassword.length < 6) {
    showResetError('Password must be at least 6 characters long.');
    return;
  }

  const sb = getSupabase();
  if (!sb) {
    showResetError('Authentication service is unavailable. Please try again later.');
    return;
  }

  const btnSubmit = document.getElementById('btnResetPasswordSubmit');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'UPDATING PASSWORD...';
  }

  try {
    // 1. Verify that email exists in users table (only allowing password reset for their registered email)
    const { data: userRows, error: userError } = await sb
      .from('users')
      .select('email')
      .eq('email', email);

    if (userError || !userRows || userRows.length === 0) {
      showResetError('No account found with this email address. Password change is only allowed for registered user emails.');
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Update Password';
      }
      return;
    }

    // 2. Perform Supabase password update
    const { error: updateError } = await sb.auth.updateUser({ password: newPassword });
    if (updateError) {
      // If no active session exists for updateUser, attempt recovery / sign-in with password or handle via Supabase Auth
      showResetError(`Supabase Auth Update Notice: ${updateError.message}`);
      if (btnSubmit) {
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Update Password';
      }
      return;
    }

    showResetSuccess('Password updated successfully! You can now log in with your new password.');

    const form = document.getElementById('resetPasswordForm');
    if (form) form.reset();

    setTimeout(() => {
      toggleAuthMode('signin');
      const signinEmail = document.getElementById('signinEmail');
      if (signinEmail) signinEmail.value = email;
    }, 2000);

  } catch (err) {
    console.error('Reset password error:', err);
    showResetError('An unexpected error occurred while resetting your password.');
  } finally {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Update Password';
    }
  }
}

function showResetError(msg) {
  let box = document.getElementById('resetErrorBox');
  if (!box) {
    const form = document.getElementById('resetPasswordForm');
    if (form) {
      box = document.createElement('div');
      box.id = 'resetErrorBox';
      box.style.cssText = 'background: #FEF2F2; border: 2px solid #EF4444; color: #991B1B; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;';
      form.prepend(box);
    }
  }
  if (box) {
    box.textContent = msg;
    box.style.display = 'block';
  } else {
    alert(msg);
  }
}

function showResetSuccess(msg) {
  let box = document.getElementById('resetSuccessBox');
  if (!box) {
    const form = document.getElementById('resetPasswordForm');
    if (form) {
      box = document.createElement('div');
      box.id = 'resetSuccessBox';
      box.style.cssText = 'background: #DCFCE7; border: 2px solid #16A34A; color: #15803D; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;';
      form.prepend(box);
    }
  }
  if (box) {
    box.textContent = msg;
    box.style.display = 'block';
  } else {
    alert(msg);
  }
}

// REAL SUPABASE SIGN IN FUNCTION
async function handleSignInSubmit(e) {
  e.preventDefault();

  const email = document.getElementById('signinEmail')?.value.trim();
  const password = document.getElementById('signinPassword')?.value.trim();
  const signInErrorBox = document.getElementById('signInErrorBox');
  const signInSuccessBox = document.getElementById('signInSuccessBox');

  if (signInErrorBox) signInErrorBox.style.display = 'none';
  if (signInSuccessBox) signInSuccessBox.style.display = 'none';

  if (!email || !password) {
    showAuthError('Please enter both your email address and password.');
    return;
  }

  const sb = getSupabase();
  let userObj = null;

  if (sb) {
    try {
      // 1. Authenticate with Supabase
      const { data, error } = await sb.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        showAuthError(error.message || 'Invalid email or password.');
        return;
      }

      if (data && data.user) {
        const userName = data.user.user_metadata?.full_name || data.user.email.split('@')[0];
        userObj = {
          id: data.user.id,
          email: data.user.email,
          name: userName,
          status: 'verified'
        };
      } else {
        showAuthError('Authentication failed. Please check your credentials.');
        return;
      }
    } catch (err) {
      console.error('Supabase auth exception:', err);
      showAuthError('An error occurred during authentication. Please try again.');
      return;
    }
  } else {
    showAuthError('Authentication service is unavailable. Please try again later.');
    return;
  }

  // Success: Store user session state
  setCurrentUser(userObj);

  showAuthSuccess('Login successful! Redirecting to your Client Dashboard...');

  // Update UI greetings
  const greetingEl = document.getElementById('dashboardGreetingName');
  if (greetingEl) greetingEl.textContent = `Hello, ${userObj.name}`;
  const sidebarName = document.getElementById('sidebarProfileName');
  if (sidebarName) sidebarName.textContent = userObj.name;

  const form = document.getElementById('signInForm');
  if (form) form.reset();

  setTimeout(() => {
    if (signInSuccessBox) signInSuccessBox.style.display = 'none';
    showPage('dashboardSection');
  }, 1000);
}

function showAuthError(msg) {
  let box = document.getElementById('signInErrorBox');
  if (!box) {
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      box = document.createElement('div');
      box.id = 'signInErrorBox';
      box.style.cssText = 'background: #FEF2F2; border: 2px solid #EF4444; color: #991B1B; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;';
      signInForm.prepend(box);
    }
  }
  if (box) {
    box.textContent = msg;
    box.style.display = 'block';
  } else {
    alert(msg);
  }
}

function showAuthSuccess(msg) {
  let box = document.getElementById('signInSuccessBox');
  if (!box) {
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
      box = document.createElement('div');
      box.id = 'signInSuccessBox';
      box.style.cssText = 'background: #DCFCE7; border: 2px solid #16A34A; color: #15803D; padding: 12px 16px; border-radius: 12px; font-weight: 700; font-size: 0.9rem; margin-bottom: 16px;';
      signInForm.prepend(box);
    }
  }
  if (box) {
    box.textContent = msg;
    box.style.display = 'block';
  } else {
    alert(msg);
  }
}

// Sign Up Handler (ACTUAL SUPABASE SIGN UP)
async function handleSignUpSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('signupName')?.value.trim();
  const businessName = document.getElementById('signupBusiness')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const website = document.getElementById('signupWebsite')?.value.trim();
  const phone = document.getElementById('signupPhone')?.value.trim();
  const location = document.getElementById('signupLocation')?.value.trim();
  const password = document.getElementById('signupPassword')?.value.trim();
  const confirmPassword = document.getElementById('signupConfirmPassword')?.value.trim();

  const hearAboutCheckboxes = document.querySelectorAll('input[name="hear_about_us"]:checked');
  const hearAboutUs = Array.from(hearAboutCheckboxes).map(cb => cb.value);

  if (!name || !businessName || !email || !phone || !password || !confirmPassword) {
    alert('Please fill out all required fields.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match. Please re-enter your password.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }

  const userData = {
    user_name: name,
    business_name: businessName,
    email: email,
    website: website,
    phone_number: phone,
    location: location,
    password: password,
    hear_about_us: hearAboutUs
  };

  const btnSubmit = document.getElementById('btnSignUpSubmit');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'CREATING ACCOUNT...';
  }

  try {
    const result = await signUpUser(userData);

    if (result.success) {
      if (result.user) {
        setCurrentUser(result.user);
        const greetingEl = document.getElementById('dashboardGreetingName');
        if (greetingEl) greetingEl.textContent = `Hello, ${result.user.name}`;
        const sidebarName = document.getElementById('sidebarProfileName');
        if (sidebarName) sidebarName.textContent = result.user.name;
      }

      const signUpForm = document.getElementById('signUpForm');
      if (signUpForm) signUpForm.reset();

      const pendingModal = document.getElementById('pendingSuccessModal');
      if (pendingModal) {
        pendingModal.classList.add('active');
      } else {
        showPage('dashboardSection');
      }
    } else {
      alert(result.error || 'Failed to create account. Please try again.');
    }
  } catch (err) {
    console.error('Sign up error:', err);
    alert('An unexpected error occurred during sign up.');
  } finally {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'SIGN UP';
    }
  }
}

// Router Helper with Strict Dashboard Access Isolation
export function showPage(sectionId) {
  const landingSections = ['home', 'about', 'services', 'projects', 'led-screen', 'contact'];
  const standalonePages = ['discoverySection', 'authSection', 'dashboardSection', 'careers'];

  if (sectionId && sectionId.startsWith('#')) {
    sectionId = sectionId.substring(1);
  }

  // Access Control Guard for Dashboard
  if (sectionId === 'dashboardSection') {
    const user = getCurrentUser();
    if (!user || user.status !== 'verified') {
      sectionId = 'authSection';
    }
  }

  if (standalonePages.includes(sectionId)) {
    landingSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.setProperty('display', 'none', 'important');
    });
    standalonePages.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (id === sectionId) {
          const displayValue = (id === 'dashboardSection') ? 'flex' : 'block';
          el.style.setProperty('display', displayValue, 'important');
        } else {
          el.style.setProperty('display', 'none', 'important');
        }
      }
    });

    if (sectionId === 'dashboardSection') {
      window.dispatchEvent(new CustomEvent('authChange'));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    standalonePages.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.setProperty('display', 'none', 'important');
    });
    landingSections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.setProperty('display', 'block', 'important');
    });
  }
}