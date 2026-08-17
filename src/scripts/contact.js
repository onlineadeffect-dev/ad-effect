/* CONTACT FORM VALIDATION & EMAIL DISPATCH */
export function initContactForm() {
  const form = document.getElementById('contactForm');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  if (!form) return;

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset error states
    emailError.classList.remove('show');
    messageError.classList.remove('show');

    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Validate email
    if (!emailValue || !validateEmail(emailValue)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailError.classList.add('show');
      isValid = false;
    }

    // Validate message
    if (!messageValue) {
      messageError.textContent = 'Please write a message before sending.';
      messageError.classList.add('show');
      isValid = false;
    }

    if (isValid) {
      // Trigger Mailto link to send email to ssamadmiryam@gmail.com
      const targetEmail = 'Reservation@ad-effect.com';
      const subject = encodeURIComponent('New Ad Effect Website Inquiry');
      const body = encodeURIComponent(`From: ${emailValue}\n\nMessage:\n${messageValue}`);
      
      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
      
      // Open user's email client
      window.location.href = mailtoUrl;

      // Show confirmation alert / feedback modal
      alert(`Thank you! Opening your email client to send your message to ssamadmiryam@gmail.com.`);
      
      // Reset form
      form.reset();
    }
  });
}
