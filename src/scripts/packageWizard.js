import { calculateMonths, calculateBillboardPrice } from './discovery.js';
import { getCurrentUser, showPage } from './auth.js';
import { uploadBriefFile, submitPendingPackageBooking } from './supabaseClient.js';
import { refreshDashboardRequests } from './dashboard.js';
import { showToast } from './bookingWizard.js';

export let isPackageMode = false;
export let packageStartDate = '';
export let packageEndDate = '';
export let packageBasket = []; // array of billboard objects
let briefUrl = '';

export function initPackageWizard() {
  const btnBookPackage = document.getElementById('btnBookPackage');
  if (btnBookPackage) {
    btnBookPackage.addEventListener('click', openPackageTimeframeModal);
  }

  const btnClosePackageTimeframe = document.getElementById('btnClosePackageTimeframe');
  if (btnClosePackageTimeframe) {
    btnClosePackageTimeframe.addEventListener('click', () => {
      document.getElementById('packageTimeframeModal').classList.remove('active');
    });
  }

  const btnStartPackage = document.getElementById('btnStartPackage');
  if (btnStartPackage) {
    btnStartPackage.addEventListener('click', handleStartPackage);
  }

  const floatingBasket = document.getElementById('floatingPackageBasket');
  if (floatingBasket) {
    floatingBasket.addEventListener('click', openPackageCheckoutModal);
  }

  const btnClosePackageCheckout = document.getElementById('btnClosePackageCheckout');
  if (btnClosePackageCheckout) {
    btnClosePackageCheckout.addEventListener('click', () => {
      document.getElementById('packageCheckoutModal').classList.remove('active');
    });
  }

  const btnConfirmPackage = document.getElementById('btnConfirmPackage');
  if (btnConfirmPackage) {
    btnConfirmPackage.addEventListener('click', handleConfirmPackage);
  }

  const printChangesInput = document.getElementById('packagePrintChanges');
  if (printChangesInput) {
    printChangesInput.addEventListener('input', updatePackagePrice);
  }

  const extraServicesCheckboxes = document.querySelectorAll('#packageExtraServices input[type="checkbox"]');
  extraServicesCheckboxes.forEach(cb => {
    cb.addEventListener('change', updatePackagePrice);
  });

  const briefInput = document.getElementById('packageBriefInput');
  if (briefInput) {
    briefInput.addEventListener('change', handlePackageBriefUpload);
  }
}

function openPackageTimeframeModal() {
  if (isPackageMode) {
    const confirmExit = confirm("Are you sure you want to exit package mode and clear your basket?");
    if (confirmExit) {
      exitPackageMode();
    }
    return;
  }
  document.getElementById('packageTimeframeModal').classList.add('active');
  const btn = document.getElementById('btnBookPackage');
  btn.style.background = 'var(--primary-red)';
}

export function exitPackageMode() {
  isPackageMode = false;
  packageBasket = [];
  packageStartDate = '';
  packageEndDate = '';
  document.getElementById('floatingPackageBasket').style.display = 'none';
  const btn = document.getElementById('btnBookPackage');
  if(btn) {
    btn.style.background = '#111';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg> Book a Package`;
  }
  window.dispatchEvent(new Event('packageModeChanged'));
}

function handleStartPackage() {
  const sDate = document.getElementById('packageStartDate').value;
  const eDate = document.getElementById('packageEndDate').value;
  const warning = document.getElementById('packageDateWarning');

  if (!sDate || !eDate) {
    warning.textContent = "Please select both start and end dates.";
    warning.style.display = 'block';
    return;
  }

  if (new Date(sDate) >= new Date(eDate)) {
    warning.textContent = "Start date must be before end date.";
    warning.style.display = 'block';
    return;
  }

  warning.style.display = 'none';
  packageStartDate = sDate;
  packageEndDate = eDate;
  isPackageMode = true;

  document.getElementById('packageTimeframeModal').classList.remove('active');
  document.getElementById('floatingPackageBasket').style.display = 'flex';
  
  const btn = document.getElementById('btnBookPackage');
  if(btn) {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Cancel Package`;
  }

  window.dispatchEvent(new Event('packageModeChanged'));
}

export function toggleBillboardInPackage(billboard) {
  const index = packageBasket.findIndex(b => b.billboard_id === billboard.billboard_id);
  if (index >= 0) {
    packageBasket.splice(index, 1);
  } else {
    packageBasket.push({
      ...billboard,
      package_start: packageStartDate,
      package_end: packageEndDate
    });
  }
  updateBasketUI();
  window.dispatchEvent(new Event('packageModeChanged'));
}

function updateBasketUI() {
  const countEl = document.getElementById('basketCount');
  if (countEl) countEl.textContent = packageBasket.length;
}

export function isBillboardInPackage(billboardId) {
  return packageBasket.some(b => b.billboard_id === billboardId);
}

function openPackageCheckoutModal() {
  if (packageBasket.length === 0) {
    alert("Your package is empty. Please add some billboards first.");
    return;
  }
  
  renderPackageCheckout();
  document.getElementById('packageCheckoutModal').classList.add('active');
}

function renderPackageCheckout() {
  const listEl = document.getElementById('packageBillboardsList');
  if (!listEl) return;

  listEl.innerHTML = packageBasket.map((b, index) => {
    return `
      <div style="display: flex; gap: 16px; border: 1.5px solid #E2E8F0; padding: 16px; border-radius: 12px; align-items: center; background: #fff;">
        <img src="${b.image_url}" alt="${b.billboard_id}" style="width: 100px; height: 70px; object-fit: cover; border-radius: 8px; border: 1px solid #eee;" />
        <div style="flex: 1;">
          <h4 style="font-size: 1.1rem; font-weight: 800;">${b.billboard_id}</h4>
          <div style="font-size: 0.85rem; color: #666;">${b.location}</div>
          <div style="font-size: 0.9rem; font-weight: 700; color: var(--primary-red); margin-top: 4px;">${b.price} / mo</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; min-width: 150px;">
          <input type="date" class="pkg-b-start" data-index="${index}" value="${b.package_start}" style="padding: 6px; border-radius: 6px; border: 1px solid #ccc; font-size: 0.8rem;" />
          <input type="date" class="pkg-b-end" data-index="${index}" value="${b.package_end}" style="padding: 6px; border-radius: 6px; border: 1px solid #ccc; font-size: 0.8rem;" />
        </div>
        <button class="pkg-b-remove" data-index="${index}" style="background: none; border: none; color: #991B1B; cursor: pointer; padding: 8px;" title="Remove from package">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.pkg-b-start').forEach(el => {
    el.addEventListener('change', (e) => {
      packageBasket[e.target.dataset.index].package_start = e.target.value;
      updatePackagePrice();
    });
  });
  document.querySelectorAll('.pkg-b-end').forEach(el => {
    el.addEventListener('change', (e) => {
      packageBasket[e.target.dataset.index].package_end = e.target.value;
      updatePackagePrice();
    });
  });
  document.querySelectorAll('.pkg-b-remove').forEach(el => {
    el.addEventListener('click', (e) => {
      const idx = e.currentTarget.dataset.index;
      packageBasket.splice(idx, 1);
      updateBasketUI();
      renderPackageCheckout();
      window.dispatchEvent(new Event('packageModeChanged'));
      if(packageBasket.length === 0) {
        document.getElementById('packageCheckoutModal').classList.remove('active');
      }
    });
  });

  updatePackagePrice();
}

function updatePackagePrice() {
  let total = 0;
  //let total_without_printing = 0;
  packageBasket.forEach(b => {
    const numPrice = b.numericPrice || parseFloat((b.price || '').toString().replace(/[^0-9.]/g, '')) || 1000;
    const months = calculateMonths(b.package_start, b.package_end);
    total += numPrice * months;
  });

  const printChanges = parseInt(document.getElementById('packagePrintChanges').value) || 0;
  total += printChanges * 350;

  // this will be the new value to use which excludes printing cost because it varies
  //total_without_printing += numPrice * months;

  const priceEl = document.getElementById('packageFinalPrice');
  if (priceEl) priceEl.textContent = `$ ${total.toLocaleString()}`;
}

async function handlePackageBriefUpload(e) {
  if (e.target.files && e.target.files.length > 0) {
    const statusEl = document.getElementById('packageBriefStatus');
    statusEl.textContent = "Uploading...";
    statusEl.style.color = "#666";
    
    const file = e.target.files[0];
    const res = await uploadBriefFile(file);
    if (res.success) {
      briefUrl = res.url;
      statusEl.textContent = "✓ Uploaded Successfully";
      statusEl.style.color = "#16a34a";
    } else {
      statusEl.textContent = "Upload failed. Try again.";
      statusEl.style.color = "var(--primary-red)";
    }
  }
}

async function handleConfirmPackage() {
  const user = getCurrentUser();
  if (!user) {
    alert('Please sign in to submit your booking request.');
    showPage('authSection');
    return;
  }

  let total = 0;
  const items = packageBasket.map(b => {
    const numPrice = b.numericPrice || parseFloat((b.price || '').toString().replace(/[^0-9.]/g, '')) || 1000;
    const months = calculateMonths(b.package_start, b.package_end);
    total += numPrice * months;
    return {
      billboard_id: b.billboard_id,
      start_time: new Date(b.package_start).toISOString(),
      end_time: new Date(b.package_end).toISOString(),
    };
  });

  const printChanges = parseInt(document.getElementById('packagePrintChanges').value) || 0;
  total += printChanges * 350;

  const extraServices = [];
  document.querySelectorAll('#packageExtraServices input[type="checkbox"]:checked').forEach(cb => {
    extraServices.push(cb.value);
  });
  if (printChanges > 0) {
    extraServices.push(`${printChanges} Print Change(s)`);
  }

  const payload = {
    user_email: user.email,
    start_time: new Date(packageStartDate).toISOString(),
    end_time: new Date(packageEndDate).toISOString(),
    brief_url: briefUrl,
    extra_services: extraServices,
    total_price: total,
    items: items
  };

  const btnConfirm = document.getElementById('btnConfirmPackage');
  btnConfirm.disabled = true;
  btnConfirm.textContent = 'Submitting...';

  const result = await submitPendingPackageBooking(payload);

  btnConfirm.disabled = false;
  btnConfirm.textContent = 'Confirm Package Request';

  if (result.success) {
    document.getElementById('packageCheckoutModal').classList.remove('active');
    exitPackageMode();
    showToast('Your package request has been received!');
    refreshDashboardRequests();
    showPage('dashboardSection');
  } else {
    alert('Failed to submit package request.');
  }
}
