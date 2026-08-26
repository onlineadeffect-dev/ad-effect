// Client Dashboard Manager (Page 10)
import { getCurrentUser, setCurrentUser, showPage } from './auth.js';
import { fetchPendingBookings, fetchActiveBookings, fetchQuotations } from './supabaseClient.js';

let currentQuotations = [];
let activeBookingsData = [];

export function initDashboard() {
  window.addEventListener('authChange', renderDashboardUser);
  renderDashboardUser();

  // Sidebar navigation handlers
  const links = document.querySelectorAll('.sidebar-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const targetTab = link.getAttribute('data-tab');
      switchDashboardTab(targetTab);
    });
  });

  // Sidebar logout
  const logoutBtn = document.getElementById('sidebarLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setCurrentUser(null);
      showPage('home');
    });
  }

  // Quick Action "New Billboard Request" button
  const btnNewRequest = document.getElementById('btnNewBillboardRequest');
  if (btnNewRequest) {
    btnNewRequest.addEventListener('click', (e) => {
      e.preventDefault();
      showPage('discoverySection');
    });
  }

  // Modal close handlers
  const btnCloseQuotation = document.getElementById('btnCloseQuotationModal');
  if (btnCloseQuotation) {
    btnCloseQuotation.addEventListener('click', () => {
      const modal = document.getElementById('quotationModal');
      if (modal) modal.classList.remove('active');
    });
  }

  const btnCloseActive = document.getElementById('btnCloseActiveModal');
  if (btnCloseActive) {
    btnCloseActive.addEventListener('click', () => {
      const modal = document.getElementById('activeBillboardModal');
      if (modal) modal.classList.remove('active');
    });
  }

  // Convert to PDF action button
  const btnPdf = document.getElementById('btnConvertToPDF');
  if (btnPdf) {
    btnPdf.addEventListener('click', handleConvertToPDF);
  }
}

export function renderDashboardUser() {
  const user = getCurrentUser();
  const nameEl = document.getElementById('dashboardGreetingName');
  const sidebarNameEl = document.getElementById('sidebarProfileName');

  if (user) {
    if (nameEl) nameEl.textContent = `Hello, ${user.name || 'Client'}`;
    if (sidebarNameEl) sidebarNameEl.textContent = user.name || 'Client Account';
  } else {
    if (nameEl) nameEl.textContent = 'Hello, Client';
    if (sidebarNameEl) sidebarNameEl.textContent = 'Client Profile';
  }

  refreshDashboardPerformances();
  refreshDashboardRequests();
  refreshQuotations();
}

function switchDashboardTab(tabName) {
  const mainTab = document.getElementById('dashTabMain');
  const requestsTab = document.getElementById('dashTabRequests');
  const activeBillboardsTab = document.getElementById('dashTabActiveBillboards');
  const quotationsTab = document.getElementById('dashTabQuotations');

  if (mainTab) mainTab.style.display = 'none';
  if (requestsTab) requestsTab.style.display = 'none';
  if (activeBillboardsTab) activeBillboardsTab.style.display = 'none';
  if (quotationsTab) quotationsTab.style.display = 'none';

  if (tabName === 'requests' && requestsTab) {
    requestsTab.style.display = 'block';
    refreshDashboardRequests();
  } else if (tabName === 'active' && activeBillboardsTab) {
    activeBillboardsTab.style.display = 'block';
    refreshActiveBillboardsTab();
  } else if (tabName === 'quotations' && quotationsTab) {
    quotationsTab.style.display = 'block';
    refreshQuotations();
  } else if (mainTab) {
    mainTab.style.display = 'block';
    refreshDashboardPerformances();
  }
}

// 1. TRACK BILLBOARD PERFORMANCES (Active Bookings matching user_id where is_active = TRUE)
export async function refreshDashboardPerformances() {
  const user = getCurrentUser();
  const container = document.getElementById('performancesGrid');
  if (!container) return;

  const userId = user ? user.id : null;
  activeBookingsData = await fetchActiveBookings(userId);

  if (!activeBookingsData || activeBookingsData.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboard campaigns found</h3>
        <p style="color: #888; margin-top: 4px;">Once your billboard request is approved, active campaign metrics will be displayed here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = activeBookingsData.map(b => {
    const bb = b.billboards || b;
    const imgUrl = bb.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';
    const billboardId = bb.billboard_id || b.billboard_id || `Booking #${b.id}`;
    const location = bb.location || 'Location Not Specified';
    
    const rawImpressions = b.impressions_per_week ?? bb.impressions_per_week ?? (bb.daily_impressions ? bb.daily_impressions * 7 : null);
    const impressions = rawImpressions ? `${Number(rawImpressions).toLocaleString()} / week` : 'Data Pending';

    return `
      <div class="billboard-card active-perf-card" data-booking-id="${b.id}" style="cursor: pointer;">
        <div class="card-image-wrapper">
          <img src="${imgUrl}" alt="Billboard ${billboardId}" />
          <div class="billboard-tag">${billboardId}<span>Active Campaign</span></div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${billboardId}</h3>
          <div class="card-location">${location}</div>
          <div style="margin-top: 8px; font-weight: 500; color: #16a34a; font-size: 0.9rem;">
            ● Live Traffic Data: Coming Soon...
          </div>
          <button class="btn-card-action" style="margin-top: 12px; font-size: 0.85rem; padding: 8px;">View Campaign Details</button>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.active-perf-card').forEach(card => {
    card.addEventListener('click', () => {
      const bookingId = card.getAttribute('data-booking-id');
      const booking = activeBookingsData.find(item => String(item.id) === String(bookingId));
      if (booking) openActiveBillboardModal(booking);
    });
  });
}

function refreshActiveBillboardsTab() {
  const container = document.getElementById('activeBillboardsGrid');
  if (!container) return;

  if (!activeBookingsData || activeBookingsData.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No active billboards</h3>
      </div>
    `;
    return;
  }

  container.innerHTML = activeBookingsData.map(b => {
    const bb = b.billboards || b;
    const imgUrl = bb.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';
    const billboardId = bb.billboard_id || b.billboard_id || `Booking #${b.id}`;
    const location = bb.location || 'Location Not Specified';

    return `
      <div class="billboard-card">
        <div class="card-image-wrapper">
          <img src="${imgUrl}" alt="Billboard ${billboardId}" />
          <div class="billboard-tag">${billboardId}<span>Active</span></div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${billboardId}</h3>
          <div class="card-location">${location}</div>
          <div style="font-weight: 800; color: #16a34a; margin-top: 8px;">Status: Active Campaign</div>
        </div>
      </div>
    `;
  }).join('');
}

function openActiveBillboardModal(booking) {
  const modal = document.getElementById('activeBillboardModal');
  const content = document.getElementById('activeBillboardModalContent');
  if (!modal || !content) return;

  const bb = booking.billboards || booking;
  const billboardId = bb.billboard_id || booking.billboard_id || `Booking #${booking.id}`;
  const location = bb.location || 'Location Not Specified';
  
  const rawImpressions = booking.impressions_per_week ?? bb.impressions_per_week ?? bb.daily_impressions ? (bb.daily_impressions * 7) : null;
  const impressions = rawImpressions ? Number(rawImpressions).toLocaleString() : 'N/A';

  const startDate = booking.start_time ? new Date(booking.start_time).toLocaleDateString() : 'N/A';
  const endDate = booking.end_time ? new Date(booking.end_time).toLocaleDateString() : 'N/A';

  content.innerHTML = `
    <div style="text-align: left;">
      <h2 style="font-size: 2rem; font-weight: 900; color: var(--primary-red);">${billboardId} - Active Billboard</h2>
      <div style="font-size: 1.1rem; font-weight: 700; color: #333; margin-top: 4px;">${location}</div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px;">
        <div style="border-radius: 16px; overflow: hidden; border: 3px solid #111; height: 240px;">
          <img src="${bb.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80'}" alt="Billboard" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; font-weight: 600;">
          <div style="background: #DCFCE7; color: #15803D; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 1rem;">
            ✓ Campaign Status: ACTIVE
          </div>
          <div><strong>Media Type:</strong> ${bb.type || bb.media_type || 'Standard Billboard'}</div>
          <div><strong>Dimensions:</strong> ${bb.size || bb.dimensions || 'N/A'}</div>
          <div><strong>Weekly Impressions:</strong> ${impressions}</div>
          <div><strong>Campaign Start:</strong> ${startDate}</div>
          <div><strong>Campaign End:</strong> ${endDate}</div>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

// 2. PENDING REQUESTS PAGE (`pending_bookings` table)
export async function refreshDashboardRequests() {
  const user = getCurrentUser();
  const tbody = document.getElementById('dashboardRequestsTableBody');
  if (!tbody) return;

  const email = user ? user.email : null;
  const requests = await fetchPendingBookings(email);

  if (!requests || requests.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: #666;">
          No pending billboard requests found. Click "New Billboard Request" to book a billboard.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = requests.map(req => {
    const startDate = req.start_time ? new Date(req.start_time).toLocaleDateString() : 'N/A';
    const endDate = req.end_time ? new Date(req.end_time).toLocaleDateString() : 'N/A';

    const statusText = (req.status || 'pending').toLowerCase();
    const statusLabel = statusText.charAt(0).toUpperCase() + statusText.slice(1);
    const statusBadge = `<span class="status-badge status-${statusText}">${statusLabel}</span>`;

    const services = Array.isArray(req.extra_services) 
      ? req.extra_services.join(', ') 
      : (req.extra_services || 'None');

    const briefLink = req.brief_url 
      ? `<a href="${req.brief_url}" target="_blank" style="color: var(--primary-red); font-weight: 700; text-decoration: underline;">View PDF Brief</a>` 
      : 'No File';

    return `
      <tr>
        <td style="font-weight: 800; color: #111;">${req.billboard_id}</td>
        <td>${startDate} ➔ ${endDate}</td>
        <td>${briefLink}</td>
        <td>${services}</td>
        <td>${statusBadge}</td>
        <td>${new Date(req.created_at || Date.now()).toLocaleDateString()}</td>
      </tr>
    `;
  }).join('');
}

// 3. QUOTATIONS SECTION & PDF CONVERSION (`quotations` table in Supabase)
export async function refreshQuotations() {
  const user = getCurrentUser();
  const container = document.getElementById('quotationsGrid');
  if (!container) return;

  const userId = user ? (user.id || user.email) : null;
  currentQuotations = await fetchQuotations(userId, user ? user.email : null);

  if (!currentQuotations || currentQuotations.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 32px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.2rem; font-weight: 800; color: #666;">No quotations available</h3>
        <p style="color: #888; margin-top: 4px;">Official campaign quotations issued by AdEffect will appear here for your review.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = currentQuotations.map(q => {
    const formattedDate = new Date(q.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const printCostStr = typeof q.printing_cost === 'number' ? `$ ${q.printing_cost.toLocaleString()}` : `$ ${q.printing_cost || 0}`;
    const totalWithPrintStr = typeof q.total_cost_with_printing === 'number' ? `$ ${q.total_cost_with_printing.toLocaleString()}` : `$ ${q.total_cost_with_printing || 0}`;

    return `
      <div class="quotation-card" data-quotation-id="${q.id}">
        <div>
          <div class="quotation-header">
            <span class="quotation-ref">REF: ${q.reference}</span>
            <span class="quotation-date">${formattedDate}</span>
          </div>

          <div class="quotation-details">
            <div><strong>Client:</strong> ${q.client_name || user?.name || 'Client'}</div>
            <div><strong>Media Type:</strong> ${q.media_type}</div>
            <div><strong>Location:</strong> ${q.media_location}</div>
            <div><strong>Period:</strong> ${q.period}</div>
            <div><strong>Printing Cost:</strong> ${printCostStr}</div>
          </div>
        </div>

        <div>
          <div class="quotation-total-box">
            <span style="font-size: 0.9rem; font-weight: 700; color: #555;">Total Amount:</span>
            <span style="font-size: 1.3rem; font-weight: 900; color: var(--primary-red);">${totalWithPrintStr}</span>
          </div>
          <button class="btn-view-quotation">View Full Quotation &rarr;</button>
        </div>
      </div>
    `;
  }).join('');

  // Bind click listeners to view full quotation document
  container.querySelectorAll('.quotation-card').forEach(card => {
    card.addEventListener('click', () => {
      const qId = card.getAttribute('data-quotation-id');
      const quotation = currentQuotations.find(item => String(item.id) === String(qId)) || currentQuotations[0];
      if (quotation) openQuotationModal(quotation);
    });
  });
}

function openQuotationModal(q) {
  const modal = document.getElementById('quotationModal');
  const docContainer = document.getElementById('quotationDocContent');
  if (!modal || !docContainer) return;

  const dateStr = new Date(q.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const printCost = typeof q.printing_cost === 'number' ? q.printing_cost : parseFloat(q.printing_cost || 0);
  const totalWoPrint = typeof q.total_cost_wo_printing === 'number' ? q.total_cost_wo_printing : parseFloat(q.total_cost_wo_printing || 0);
  const totalWithPrint = typeof q.total_cost_with_printing === 'number' ? q.total_cost_with_printing : parseFloat(q.total_cost_with_printing || 0);

  docContainer.innerHTML = `
    <div class="quotation-doc-header">
      <div>
        <div style="font-size: 2.2rem; font-weight: 500; color: #111;"><span>ad</span><span style="color: var(--primary-red);">effect</span></div>
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary-red); letter-spacing: 2px;">CONNECTING MEDIA</div>
        <div style="font-size: 0.85rem; color: #666; margin-top: 4px;">North Lebanon | Outdoor Advertising</div>
      </div>
      <div style="text-align: right;">
        <h2 style="font-size: 1.8rem; font-weight: 900; color: #111;">OFFICIAL QUOTATION</h2>
        <div style="font-size: 0.95rem; font-weight: 700; color: var(--primary-red);">QUO-${q.id}</div>
        <div style="font-size: 0.85rem; color: #666;">Date: ${dateStr}</div>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; background: #F9FAFB; padding: 16px 20px; border-radius: 12px; border: 1.5px solid #E5E7EB;">
      <div>
        <div style="font-size: 0.8rem; font-weight: 800; color: #888; text-transform: uppercase;">PREPARED FOR CLIENT</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: #111; margin-top: 2px;">${q.client_name || 'Valued Client'}</div>
        <div style="font-size: 0.9rem; color: #555;">Client ID: ${q.client_id}</div>
      </div>
      <div>
        <div style="font-size: 0.8rem; font-weight: 800; color: #888; text-transform: uppercase;">CAMPAIGN REFERENCE</div>
        <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-red); margin-top: 2px;">Billboard ${q.reference}</div>
        <div style="font-size: 0.9rem; color: #555;">Location: ${q.media_location}</div>
      </div>
    </div>

    <table class="quotation-table">
      <thead>
        <tr>
          <th>Item & Media Description</th>
          <th>Frequency</th>
          <th>Period</th>
          <th style="text-align: right;">Amount (USD)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${q.media_type} (${q.reference})</strong><br/>
            <span style="font-size: 0.85rem; color: #666;">Media Material: ${q.media_used}</span>
          </td>
          <td>${q.frequency || 1}</td>
          <td>${q.period}</td>
          <td style="text-align: right; font-weight: 800;">$ ${totalWoPrint.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        </tr>
        <tr>
          <td>
            <strong>Printing & Production Cost</strong><br/>
            <span style="font-size: 0.85rem; color: #666;">High resolution outdoor print & installation</span>
          </td>
          <td>${q.frequency || 1}</td>
          <td>One-time</td>
          <td style="text-align: right; font-weight: 800;">$ ${printCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        </tr>
      </tbody>
    </table>

    <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
      <div style="width: 320px; background: #F4F4F6; padding: 16px 20px; border-radius: 14px; border: 2px solid #111;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">
          <span>Subtotal w/o Printing:</span>
          <span>$ ${totalWoPrint.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 700; font-size: 0.95rem;">
          <span>Printing & Mounting:</span>
          <span>$ ${printCost.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 2px solid #111; padding-top: 10px; font-weight: 900; font-size: 1.2rem; color: var(--primary-red);">
          <span>Total Payable:</span>
          <span>$ ${totalWithPrint.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function handleConvertToPDF() {
  window.print();
}

