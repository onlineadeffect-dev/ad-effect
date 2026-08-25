import { getSupabase } from './supabaseClient.js';
// ─── If you don't have a dedicated supabaseClient export, replace the import
// above with however your other modules access the client, e.g.:
// import { sb } from './main.js';  or  const sb = window._supabaseClient;
 
/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let selectedFile  = null;
let activeRoleId  = null;
let activeJobTitle = null;
 
/* ─────────────────────────────────────────────
   MAIN ENTRY — called by showPage('careers')
───────────────────────────────────────────── */
export async function loadCareers() {

    const sb = getSupabase();
    if (!sb) { empty.style.display = 'block'; return; }

  const loading = document.getElementById('careersLoading');
  const empty   = document.getElementById('careersEmpty');
  const list    = document.getElementById('careersJobsList');
 
  if (!loading || !empty || !list) return;
 
  loading.style.display = 'block';
  empty.style.display   = 'none';
  list.style.display    = 'none';
  list.innerHTML        = '';
 
  const { data, error } = await sb.from('careers').select('*');
 
  loading.style.display = 'none';
 
  if (error || !data || data.length === 0) {
    empty.style.display = 'block';
    return;
  }
 
  list.style.display = 'flex';
 
  data.forEach(job => {
    const card = document.createElement('div');
    card.style.cssText = `
      border: 2.5px solid #111;
      border-radius: 20px;
      padding: 32px 36px;
      box-shadow: 5px 5px 0px #111;
      background: #fff;
      transition: transform 0.15s, box-shadow 0.15s;
    `;
    card.addEventListener('mouseover', () => {
      card.style.transform  = 'translate(-2px,-2px)';
      card.style.boxShadow  = '7px 7px 0px #111';
    });
    card.addEventListener('mouseout', () => {
      card.style.transform  = '';
      card.style.boxShadow  = '5px 5px 0px #111';
    });
 
    const fullReq = job.requirements || '';
    const isLong  = fullReq.length > 200;
    const preview = isLong ? fullReq.slice(0, 200) + '...' : fullReq;
    const reqId   = `req-${job.role_id}`;
 
    card.innerHTML = `
      <h3 style="font-size:1.35rem;font-weight:900;color:var(--primary-red,#D72638);margin:0 0 14px;">${job.job_title}</h3>
      <p id="${reqId}" style="font-size:0.97rem;font-weight:600;color:#333;line-height:1.7;margin:0 0 6px;">
        <strong>Requirements:</strong> ${preview}
      </p>
      ${isLong
        ? `<a href="#" data-toggle-req="${reqId}" data-full="${encodeURIComponent(fullReq)}" data-preview="${encodeURIComponent(preview)}"
              style="font-size:0.85rem;font-weight:800;color:var(--primary-red,#D72638);text-decoration:underline;display:inline-block;margin-bottom:18px;">
              Read more
           </a>`
        : '<div style="margin-bottom:18px;"></div>'
      }
      <button data-open-cv="${job.role_id}" data-job-title="${encodeURIComponent(job.job_title)}"
        style="width:100%;background:var(--primary-red,#D72638);color:#fff;border:2.5px solid #111;border-radius:12px;padding:15px;
               font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:800;cursor:pointer;
               box-shadow:4px 4px 0px #111;letter-spacing:0.5px;transition:transform 0.1s,box-shadow 0.1s;">
        Send us your CV
      </button>
    `;
 
    list.appendChild(card);
  });
 
  // Delegate events on the list container (avoids inline onclick issues with modules)
  list.addEventListener('click', _handleListClick);
}
 
/* ─────────────────────────────────────────────
   EVENT DELEGATION — job list clicks
───────────────────────────────────────────── */
function _handleListClick(e) {
  // "Read more / Read less" toggle
  const toggleLink = e.target.closest('[data-toggle-req]');
  if (toggleLink) {
    e.preventDefault();
    const reqId    = toggleLink.dataset.toggleReq;
    const full     = decodeURIComponent(toggleLink.dataset.full);
    const preview  = decodeURIComponent(toggleLink.dataset.preview);
    const el       = document.getElementById(reqId);
    const isCollapsed = toggleLink.textContent.trim() === 'Read more';
    el.innerHTML         = `<strong>Requirements:</strong> ${isCollapsed ? full : preview}`;
    toggleLink.textContent = isCollapsed ? 'Read less' : 'Read more';
    return;
  }
 
  // "Send us your CV" button
  const cvBtn = e.target.closest('[data-open-cv]');
  if (cvBtn) {
    const roleId   = cvBtn.dataset.openCv;
    const jobTitle = decodeURIComponent(cvBtn.dataset.jobTitle);
    _openCvModal(roleId, jobTitle);
    return;
  }
}
 
/* ─────────────────────────────────────────────
   CV MODAL — open / close
───────────────────────────────────────────── */
function _openCvModal(roleId, jobTitle) {
  activeRoleId   = roleId;
  activeJobTitle = jobTitle;
 
  document.getElementById('cvModalJobTitle').textContent = jobTitle;
  document.getElementById('cvApplicantName').value       = '';
  _hideCvError();
  _clearCvFile();
 
  document.getElementById('cvModal').style.display = 'flex';
}
 
function _closeCvModal() {
  document.getElementById('cvModal').style.display = 'none';
}
 
/* ─────────────────────────────────────────────
   FILE HANDLING
───────────────────────────────────────────── */
function _handleFileSelect(file) {
  if (!file) return;
 
  if (file.type !== 'application/pdf') {
    _showCvError('Only PDF files are accepted.');
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    _showCvError('File is too large. Maximum size is 5MB.');
    return;
  }
 
  selectedFile = file;
  document.getElementById('cvFileName').textContent        = file.name;
  document.getElementById('cvFilePreview').style.display   = 'flex';
  document.getElementById('cvDropzoneText').innerHTML      =
    'File selected ✓ <span style="color:var(--primary-red,#D72638);text-decoration:underline;">change</span>';
  _hideCvError();
}
 
function _clearCvFile() {
  selectedFile = null;
  const input  = document.getElementById('cvFileInput');
  if (input) input.value = '';
  const preview = document.getElementById('cvFilePreview');
  if (preview) preview.style.display = 'none';
  const text = document.getElementById('cvDropzoneText');
  if (text) text.innerHTML =
    'Drag & drop your CV here, or <span style="color:var(--primary-red,#D72638);text-decoration:underline;">browse</span>';
}
 
/* ─────────────────────────────────────────────
   ERROR HELPERS
───────────────────────────────────────────── */
function _showCvError(msg) {
  const el = document.getElementById('cvModalError');
  if (!el) return;
  el.textContent    = msg;
  el.style.display  = 'block';
}
 
function _hideCvError() {
  const el = document.getElementById('cvModalError');
  if (el) el.style.display = 'none';
}
 
/* ─────────────────────────────────────────────
   SUBMIT APPLICATION
───────────────────────────────────────────── */
async function _submitApplication() {

    const sb = getSupabase();
    if (!sb) { _showCvError('Connection unavailable. Please try again.'); return; }
    const { error: uploadError } = await sb.storage


  const name = document.getElementById('cvApplicantName').value.trim();
  if (!name)         { _showCvError('Please enter your full name.');           return; }
  if (!selectedFile) { _showCvError('Please upload your CV in PDF format.');   return; }
 
  const btn = document.getElementById('btnSendCv');
  btn.textContent = 'Uploading...';
  btn.disabled    = true;
 
  try {
    // 1. Upload CV to storage bucket
    const fileName = `${activeRoleId}_${Date.now()}_${selectedFile.name.replace(/\s+/g, '_')}`;
    const { error: uploadError } = await sb.storage
      .from('cv_careers')
      .upload(fileName, selectedFile, { contentType: 'application/pdf', upsert: false });
 
    if (uploadError) throw new Error('CV upload failed: ' + uploadError.message);
 
    // 2. Get public URL
    const { data: urlData } = sb.storage.from('cv_careers').getPublicUrl(fileName);
    const cvUrl = urlData?.publicUrl || fileName;
 
    // 3. Insert into career_applications
    const { error: insertError } = await sb.from('career_applications').insert({
      role_id:        activeRoleId,
      applicant_name: name,
      cv_url:         cvUrl,
    });
 
    if (insertError) throw new Error('Submission failed: ' + insertError.message);
 
    // 4. Show success
    _closeCvModal();
    document.getElementById('cvSuccessModal').style.display = 'flex';
 
  } catch (err) {
    _showCvError(err.message || 'Something went wrong. Please try again.');
  } finally {
    btn.textContent = 'Send Application';
    btn.disabled    = false;
  }
}
 
/* ─────────────────────────────────────────────
   INIT — wire up all static DOM listeners
   Call once from main.js on DOMContentLoaded
───────────────────────────────────────────── */
export function initCareers() {
  // Close CV modal
  document.getElementById('btnCloseCvModal')
    ?.addEventListener('click', _closeCvModal);
 
  // Overlay click closes modal
  document.getElementById('cvModal')
    ?.addEventListener('click', (e) => { if (e.target === e.currentTarget) _closeCvModal(); });
 
  // Submit button
  document.getElementById('btnSendCv')
    ?.addEventListener('click', _submitApplication);
 
  // File input change
  document.getElementById('cvFileInput')
    ?.addEventListener('change', (e) => _handleFileSelect(e.target.files[0]));
 
  // Dropzone drag events
  const dz = document.getElementById('cvDropzone');
  if (dz) {
    dz.addEventListener('dragover',  (e) => {
      e.preventDefault();
      dz.style.background   = '#FFF0F0';
      dz.style.borderColor  = 'var(--primary-red,#D72638)';
    });
    dz.addEventListener('dragleave', () => {
      dz.style.background   = '#FAFAFA';
      dz.style.borderColor  = '#111';
    });
    dz.addEventListener('drop', (e) => {
      e.preventDefault();
      dz.style.background   = '#FAFAFA';
      dz.style.borderColor  = '#111';
      _handleFileSelect(e.dataTransfer.files[0]);
    });
    dz.addEventListener('click', () => document.getElementById('cvFileInput')?.click());
  }
 
  // Clear file button (delegated — button is always in DOM)
  document.getElementById('cvFilePreview')
    ?.addEventListener('click', (e) => {
      if (e.target.closest('button')) _clearCvFile();
    });
 
  // Success modal close + overlay
  document.getElementById('cvSuccessModal')
    ?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget || e.target.closest('button')) {
        document.getElementById('cvSuccessModal').style.display = 'none';
      }
    });
}
 