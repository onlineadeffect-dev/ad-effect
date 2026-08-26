import { getCurrentUser, showPage } from './auth.js';
import { validateBookingDates, uploadBriefFile, submitPendingBooking, fetchConfirmedBookings, fetchPendingBookings } from './supabaseClient.js';
import { refreshDashboardRequests } from './dashboard.js';

let activeBillboard = null;
let bookingState = {
  billboard_id: '',
  start_time: '',
  end_time: '',
  brief_url: '',
  brief_filename: '',
  extra_services: []
};

let calDisplayDate = new Date();
let existingBookingsForCalendar = [];

export function initBookingWizard() {
  // Bind Step Navigation Buttons
  const btnDetailBookNow = document.getElementById('btnDetailBookNow');
  if (btnDetailBookNow) {
    btnDetailBookNow.addEventListener('click', () => startBookingSteps());
  }

  // Step 1 Date Input Change Listeners
  const startInput = document.getElementById('bookingStartDate');
  const endInput = document.getElementById('bookingEndDate');
  if (startInput) startInput.addEventListener('change', onDateInputChange);
  if (endInput) endInput.addEventListener('change', onDateInputChange);

  // Calendar Month Navigation
  const prevBtn = document.getElementById('calPrevMonth');
  const nextBtn = document.getElementById('calNextMonth');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      calDisplayDate.setMonth(calDisplayDate.getMonth() - 1);
      renderBookingCalendar();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      calDisplayDate.setMonth(calDisplayDate.getMonth() + 1);
      renderBookingCalendar();
    });
  }

  // Step 1 -> Step 2
  const btnStep1Next = document.getElementById('btnStep1Next');
  if (btnStep1Next) {
    btnStep1Next.addEventListener('click', handleStep1Submit);
  }

  // Step 2 -> Step 3 (Dropzone)
  setupPdfDropzone();
  const btnStep2Next = document.getElementById('btnStep2Next');
  if (btnStep2Next) {
    btnStep2Next.addEventListener('click', handleStep2Next);
  }

  // Step 3 -> Step 4 (Services)
  setupExtraServicesSelection();
  const btnStep3Next = document.getElementById('btnStep3Next');
  if (btnStep3Next) {
    btnStep3Next.addEventListener('click', handleStep3Next);
  }

  // Step 4 -> Submission
  const btnConfirmBooking = document.getElementById('btnConfirmBooking');
  if (btnConfirmBooking) {
    btnConfirmBooking.addEventListener('click', handleBookingSubmission);
  }

  // Close Detail Modal
  const btnCloseDetailModal = document.getElementById('btnCloseDetailModal');
  if (btnCloseDetailModal) {
    btnCloseDetailModal.addEventListener('click', closeDetailModal);
  }

  // Close Wizard Modal
  const btnCloseWizardModal = document.getElementById('btnCloseWizardModal');
  if (btnCloseWizardModal) {
    btnCloseWizardModal.addEventListener('click', closeWizardModal);
  }
}

async function prepareCalendarForBillboard(billboardId) {
  const confirmed = await fetchConfirmedBookings(billboardId);
  const pending = await fetchPendingBookings();
  const filteredPending = pending.filter(b => b.billboard_id === billboardId && b.status !== 'Rejected');
  
  existingBookingsForCalendar = [...confirmed, ...filteredPending];
  renderBookingCalendar();
}

function onDateInputChange() {
  const warningBox = document.getElementById('dateWarningBox');
  if (warningBox) warningBox.classList.remove('active');
  renderBookingCalendar();
}

async function renderBookingCalendar() {
  const titleEl = document.getElementById('calMonthTitle');
  const gridEl = document.getElementById('calendarDaysGrid');
  if (!gridEl) return;

  const year = calDisplayDate.getFullYear();
  const month = calDisplayDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (titleEl) titleEl.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startVal = document.getElementById('bookingStartDate')?.value;
  const endVal = document.getElementById('bookingEndDate')?.value;

  const startTime = startVal ? new Date(startVal + 'T00:00:00').getTime() : null;
  const endTime = endVal ? new Date(endVal + 'T23:59:59').getTime() : null;

  gridEl.innerHTML = '';

  // Blank lead days
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.style.height = '36px';
    gridEl.appendChild(blank);
  }

  // Render month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = new Date(year, month, day);
    const dayTime = dayDate.getTime();
    const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const dayEl = document.createElement('div');
    dayEl.textContent = day;
    dayEl.style.cssText = 'height: 36px; display: grid; place-content: center; font-weight: 700; border-radius: 8px; font-size: 0.9rem; cursor: pointer; transition: all 0.15s ease; border: 1px solid #E5E7EB;';

    // Check if day is within existing booking
    let isBooked = false;
    for (const b of existingBookingsForCalendar) {
      const bStart = new Date(b.start_time || b.start_date).getTime();
      const bEnd = new Date(b.end_time || b.end_date).getTime();
      if (!isNaN(bStart) && !isNaN(bEnd)) {
        if (dayTime >= bStart && dayTime <= bEnd) {
          isBooked = true;
          break;
        }
      }
    }

    if (isBooked) {
      dayEl.style.background = '#FECACA';
      dayEl.style.color = '#991B1B';
      dayEl.style.border = '1.5px dashed #EF4444';
      dayEl.title = 'This date is already booked.';
    } else {
      // Check if selected in input range
      let isSelected = false;
      if (startTime && endTime && startTime <= endTime) {
        if (dayTime >= startTime && dayTime <= endTime) {
          isSelected = true;
        }
      } else if (startTime && dayTime === startTime) {
        isSelected = true;
      }

      if (isSelected) {
        dayEl.style.background = 'var(--primary-red)';
        dayEl.style.color = '#FFFFFF';
        dayEl.style.fontWeight = '900';
        dayEl.style.border = '1.5px solid #111';
      } else {
        dayEl.addEventListener('mouseenter', () => dayEl.style.borderColor = '#111');
        dayEl.addEventListener('mouseleave', () => dayEl.style.borderColor = '#E5E7EB');
      }

      // Click to pick dates
      dayEl.addEventListener('click', () => {
        const startIn = document.getElementById('bookingStartDate');
        const endIn = document.getElementById('bookingEndDate');
        if (!startIn.value || (startIn.value && endIn.value)) {
          startIn.value = dayStr;
          endIn.value = '';
        } else if (startIn.value && !endIn.value) {
          if (new Date(dayStr) < new Date(startIn.value)) {
            startIn.value = dayStr;
          } else {
            endIn.value = dayStr;
          }
        }
        onDateInputChange();
      });
    }

    gridEl.appendChild(dayEl);
  }
}

// 1. Open Page 4 Billboard Detail View
export function openBillboardDetail(billboard) {
  activeBillboard = billboard;
  bookingState.billboard_id = billboard.billboard_id;

  document.getElementById('detailBillboardId').textContent = billboard.billboard_id;
  document.getElementById('detailLocation').textContent = billboard.location;
  document.getElementById('detailType').textContent = (billboard.type || 'Unipole').toUpperCase();
  document.getElementById('detailSize').textContent = billboard.size || 'W:147 H:43';
  document.getElementById('detailPrice').textContent = billboard.price || '$ 1,000';
  document.getElementById('detailImage').src = billboard.image_url;

  const btnMaps360 = document.getElementById('btnMaps360');
  if (btnMaps360) {
    btnMaps360.href = billboard.maps_url || 'https://maps.google.com';
  }

  prepareCalendarForBillboard(billboard.billboard_id);

  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeDetailModal() {
  const modal = document.getElementById('detailModal');
  if (modal) modal.classList.remove('active');
}

function startBookingSteps() {
  closeDetailModal();
  prepareCalendarForBillboard(bookingState.billboard_id);
  goToWizardStep(1);
  const wizardModal = document.getElementById('wizardModal');
  if (wizardModal) wizardModal.classList.add('active');
}

function closeWizardModal() {
  const wizardModal = document.getElementById('wizardModal');
  if (wizardModal) wizardModal.classList.remove('active');
}

function goToWizardStep(stepNumber) {
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`wizardStep${i}`);
    if (stepEl) {
      stepEl.style.display = i === stepNumber ? 'block' : 'none';
    }
  }
}

// Step 1: Timeframe Handling & Overlap Validation
async function handleStep1Submit() {
  const startDate = document.getElementById('bookingStartDate')?.value;
  const endDate = document.getElementById('bookingEndDate')?.value;

  const warningBox = document.getElementById('dateWarningBox');

  if (!startDate || !endDate) {
    if (warningBox) {
      warningBox.textContent = 'Please select both start and end dates.';
      warningBox.classList.add('active');
    }
    return;
  }

  const validation = await validateBookingDates(bookingState.billboard_id, startDate, endDate, activeBillboard?.size);
  if (!validation.valid) {
    if (warningBox) {
      warningBox.textContent = validation.message || 'Unavailable or unsuitable time frame, please choose another';
      warningBox.classList.add('active');
    }
    return;
  }

  if (warningBox) warningBox.classList.remove('active');

  bookingState.start_time = new Date(startDate).toISOString();
  bookingState.end_time = new Date(endDate).toISOString();

  goToWizardStep(2);
}

// Step 2: PDF Brief Upload (Max 5MB)
function setupPdfDropzone() {
  const dropzone = document.getElementById('pdfDropzone');
  const fileInput = document.getElementById('pdfFileInput');

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedPdf(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedPdf(e.target.files[0]);
    }
  });
}

async function processSelectedPdf(file) {
  // Validate PDF format
  if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
    alert('Invalid file format. Please upload a PDF file.');
    return;
  }

  // Validate Max 5MB size (5 * 1024 * 1024 bytes)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    alert('File size exceeds 5MB limit. Please upload a smaller PDF file.');
    return;
  }

  const dropzoneStatus = document.getElementById('dropzoneStatusText');
  if (dropzoneStatus) dropzoneStatus.textContent = 'Uploading PDF brief...';

  const uploadResult = await uploadBriefFile(file);

  if (uploadResult.success) {
    bookingState.brief_url = uploadResult.url;
    bookingState.brief_filename = uploadResult.filename;

    const filePreview = document.getElementById('pdfFilePreview');
    const previewName = document.getElementById('pdfPreviewName');
    if (filePreview && previewName) {
      previewName.textContent = `${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`;
      filePreview.style.display = 'flex';
    }

    if (dropzoneStatus) dropzoneStatus.textContent = 'PDF Uploaded Successfully!';
  } else {
    alert('Failed to upload PDF file. Please try again.');
    if (dropzoneStatus) dropzoneStatus.textContent = 'Drag & Drop or Upload PDF';
  }
}

function handleStep2Next() {
  if (!bookingState.brief_url) {
    alert('Please upload a PDF brief before proceeding.');
    return;
  }
  goToWizardStep(3);
}

// Step 3: Extra Services Selection
function setupExtraServicesSelection() {
  const container = document.getElementById('extraServicesList');
  if (!container) return;

  container.querySelectorAll('.service-option-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('selected');
      const serviceName = card.getAttribute('data-service');
      
      if (card.classList.contains('selected')) {
        if (!bookingState.extra_services.includes(serviceName)) {
          bookingState.extra_services.push(serviceName);
        }
      } else {
        bookingState.extra_services = bookingState.extra_services.filter(s => s !== serviceName);
      }
    });
  });
}

function handleStep3Next() {
  renderStep4Summary();
  goToWizardStep(4);
}

// Step 4: Summary & Submission
function renderStep4Summary() {
  if (!activeBillboard) return;

  document.getElementById('summaryBillboardImg').src = activeBillboard.image_url;
  document.getElementById('summaryBillboardId').textContent = activeBillboard.billboard_id;
  document.getElementById('summaryLocation').textContent = activeBillboard.location;

  const startFormatted = new Date(bookingState.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const endFormatted = new Date(bookingState.end_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  document.getElementById('summaryDateRange').textContent = `${startFormatted} ➔ ${endFormatted}`;

  // Render selected services list
  const servicesContainer = document.getElementById('summaryServicesList');
  if (servicesContainer) {
    if (bookingState.extra_services.length === 0) {
      servicesContainer.innerHTML = '<div style="color: #666; font-style: italic;">No extra services selected.</div>';
    } else {
      servicesContainer.innerHTML = bookingState.extra_services.map(s => `
        <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #111; margin-top: 6px;">
          <span style="color: var(--primary-red); font-size: 1.2rem;">☑</span> ${s}
        </div>
      `).join('');
    }
  }
}

async function handleBookingSubmission() {
  const user = getCurrentUser();
  if (!user) {
    alert('Please sign in to submit your booking request.');
    showPage('authSection');
    return;
  }

  const btnConfirm = document.getElementById('btnConfirmBooking');
  if (btnConfirm) {
    btnConfirm.disabled = true;
    btnConfirm.textContent = 'Submitting Request...';
  }

  const payload = {
    user_email: user.email,
    billboard_id: bookingState.billboard_id,
    start_time: bookingState.start_time,
    end_time: bookingState.end_time,
    brief_url: bookingState.brief_url,
    extra_services: bookingState.extra_services
  };

  const result = await submitPendingBooking(payload);

  if (btnConfirm) {
    btnConfirm.disabled = false;
    btnConfirm.textContent = 'Confirm Request';
  }

  if (result.success) {
    closeWizardModal();

    // Show Confirmation Toast on Dashboard (Page 10)
    showToast('Your request has been received! It will be reviewed and you will be contacted shortly.');

    // Refresh Dashboard requests table
    refreshDashboardRequests();

    // Redirect user to Client Dashboard (Page 10)
    showPage('dashboardSection');
  } else {
    alert('Failed to submit booking request. Please try again.');
  }
}

export function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}
