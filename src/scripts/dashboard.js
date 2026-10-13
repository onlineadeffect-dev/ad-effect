// Client Dashboard Manager (Page 10)
import { getCurrentUser, setCurrentUser, showPage } from './auth.js';
import { fetchPendingBookings, fetchActiveBookings, fetchQuotations, deletePendingBooking, updateUserProfile, fetchUserProfile, sendPasswordResetEmail, deleteUserAccount } from './supabaseClient.js';

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
  refreshQuotations().then(() => refreshSpendingChart());
}

function switchDashboardTab(tabName) {
  const mainTab = document.getElementById('dashTabMain');
  const requestsTab = document.getElementById('dashTabRequests');
  const activeBillboardsTab = document.getElementById('dashTabActiveBillboards');
  const quotationsTab = document.getElementById('dashTabQuotations');
  const accountTab = document.getElementById('dashTabAccount');

  if (mainTab) mainTab.style.display = 'none';
  if (requestsTab) requestsTab.style.display = 'none';
  if (activeBillboardsTab) activeBillboardsTab.style.display = 'none';
  if (quotationsTab) quotationsTab.style.display = 'none';
  if (accountTab) accountTab.style.display = 'none';

  if (tabName === 'requests' && requestsTab) {
    requestsTab.style.display = 'block';
    refreshDashboardRequests();
  } else if (tabName === 'active' && activeBillboardsTab) {
    activeBillboardsTab.style.display = 'block';
    refreshActiveBillboardsTab();
  } else if (tabName === 'quotations' && quotationsTab) {
    quotationsTab.style.display = 'block';
    refreshQuotations();
  } else if (tabName === 'account' && accountTab) {
    accountTab.style.display = 'block';
    renderAccountTab();
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
        <td colspan="7" style="text-align: center; padding: 24px; color: #666;">
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

    let displayId = req.billboard_id || 'N/A';
    
    // Check if it's a package
    if (req.pending_booking_items && req.pending_booking_items.length > 0) {
      displayId = `Package (${req.pending_booking_items.length} Billboards)`;
    } else if (req.items && req.items.length > 0) {
      displayId = `Package (${req.items.length} Billboards)`;
    }

    const detailsBtn = (req.pending_booking_items && req.pending_booking_items.length > 0) || (req.items && req.items.length > 0)
      ? `<button class="btn-view-pkg" data-id="${req.id}" style="font-size: 0.75rem; padding: 4px 8px; border-radius: 6px; border: 1px solid #ccc; background: #fff; cursor: pointer;">View Billboards</button>`
      : '';

    // Only allow cancellation for pending/in review statuses
    const isCancellable = ['pending', 'in review', 'in_review'].includes(statusText.replace(' ', '_'));
    const cancelBtn = isCancellable
      ? `<button class="btn-cancel-request" data-id="${req.id}" style="font-size: 0.75rem; padding: 5px 10px; border-radius: 6px; border: 1.5px solid #EF4444; background: #FEF2F2; color: #DC2626; font-weight: 700; cursor: pointer;">Cancel</button>`
      : `<span style="font-size:0.75rem;color:#aaa;font-style:italic;">N/A</span>`;

    return `
      <tr>
        <td style="font-weight: 800; color: #111;">
          ${displayId}
          <div style="margin-top: 4px;">${detailsBtn}</div>
        </td>
        <td>${startDate} ➔ ${endDate}</td>
        <td>${briefLink}</td>
        <td>${services}</td>
        <td>${statusBadge}</td>
        <td>${new Date(req.created_at || Date.now()).toLocaleDateString()}</td>
        <td>${cancelBtn}</td>
      </tr>
    `;
  }).join('');

  // Bind view package buttons
  tbody.querySelectorAll('.btn-view-pkg').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const req = requests.find(r => String(r.id) === String(id));
      if (req) openPendingPackageModal(req);
    });
  });

  // Bind cancel buttons
  tbody.querySelectorAll('.btn-cancel-request').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const req = requests.find(r => String(r.id) === String(id));
      const label = req ? (req.billboard_id || `Request #${id}`) : `Request #${id}`;

      // Show confirmation dialog
      const confirmed = await showConfirmDialog(
        'Cancel Billboard Request',
        `Are you sure you want to cancel your request for <strong>${label}</strong>? This action cannot be undone.`,
        'Yes, Cancel Request',
        'Keep Request'
      );

      if (!confirmed) return;

      btn.disabled = true;
      btn.textContent = 'Cancelling...';

      try {
        const result = await deletePendingBooking(id);
        if (result.success) {
          showDashboardToast('Request cancelled successfully.', 'success');
          refreshDashboardRequests();
        } else {
          showDashboardToast('Failed to cancel request. Please try again.', 'error');
          btn.disabled = false;
          btn.textContent = 'Cancel';
        }
      } catch (err) {
        console.error('Cancel request error:', err);
        showDashboardToast('An error occurred. Please try again.', 'error');
        btn.disabled = false;
        btn.textContent = 'Cancel';
      }
    });
  });
}

function openPendingPackageModal(req) {
  let modal = document.getElementById('pendingPackageModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'pendingPackageModal';
    modal.className = 'modal-overlay';
    document.body.appendChild(modal);
  }
  
  const items = req.pending_booking_items || req.items || [];
  
  modal.innerHTML = `
    <div class="filter-modal-content" style="max-width: 600px; padding: 32px;">
      <button class="close-modal-btn" onclick="document.getElementById('pendingPackageModal').classList.remove('active')" style="position: absolute; right: 24px; top: 20px;">&times;</button>
      <h2 style="font-size: 1.5rem; font-weight: 900; margin-bottom: 20px;">Package Details</h2>
      <div style="display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto;">
        ${items.map(item => `
          <div style="padding: 12px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary-red);">${item.billboard_id}</div>
            <div style="font-size: 0.9rem; color: #555; margin-top: 4px;">Start: ${new Date(item.start_time).toLocaleDateString()}</div>
            <div style="font-size: 0.9rem; color: #555;">End: ${new Date(item.end_time).toLocaleDateString()}</div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 20px; font-weight: 800; font-size: 1.1rem; border-top: 2px solid #eee; padding-top: 12px;">
        Total Estimated Price: $ ${req.total_price ? req.total_price.toLocaleString() : 'N/A'}
      </div>
    </div>
  `;
  modal.classList.add('active');
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
            <span class="quotation-ref">REF: ${q.id}</span>
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

let activeQuotationModalData = null;

// ── PDF Generator Helpers & Constants ───────────────────────────────────────
const BLACK = [17, 17, 17];
const RED = [215, 38, 56];
const GREY_LIGHT = [249, 250, 251];
const GREY_BORDER = [229, 231, 235];
const INNER_LEFT = 18;
const INNER_RIGHT = 192;
const CONTENT_W = 174;

function setColor(doc, color) {
  if (Array.isArray(color)) {
    doc.setTextColor(color[0], color[1], color[2]);
  } else {
    doc.setTextColor(color);
  }
}

function setFill(doc, color) {
  if (Array.isArray(color)) {
    doc.setFillColor(color[0], color[1], color[2]);
  } else {
    doc.setFillColor(color);
  }
}

function setDraw(doc, color) {
  if (Array.isArray(color)) {
    doc.setDrawColor(color[0], color[1], color[2]);
  } else {
    doc.setDrawColor(color);
  }
}

function hRule(doc, y, weight = 0.5) {
  setDraw(doc, GREY_BORDER);
  doc.setLineWidth(weight);
  doc.line(INNER_LEFT, y, INNER_RIGHT, y);
}

function sectionHeading(doc, text, y) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  setColor(doc, BLACK);
  doc.text(text, INNER_LEFT, y);
  return y + 6;
}

function formatDate(dateVal) {
  if (!dateVal) return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return new Date(dateVal).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatMoney(val) {
  const num = parseFloat(val) || 0;
  return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function totalPrintingCost(printingCostList) {
  if (!Array.isArray(printingCostList)) return 0;
  return printingCostList.reduce((sum, item) => sum + (parseFloat(item.cost || item) || 0), 0);
}

function printingCostForMonth(printingCostList, month, period) {
  if (!Array.isArray(printingCostList) || printingCostList.length === 0) return 0;
  let costForThisMonth = 0;
  printingCostList.forEach((item) => {
    const costVal = parseFloat(item.cost || item) || 0;
    if (item.from_month || item.to_month) {
      if (item.from_month && item.to_month) {
        const startIdx = period.indexOf(item.from_month);
        const endIdx = period.indexOf(item.to_month);
        const currIdx = period.indexOf(month);
        if (currIdx >= startIdx && (endIdx === -1 || currIdx <= endIdx)) {
          costForThisMonth += costVal;
        }
      } else if (item.from_month === month || item.to_month === month) {
        costForThisMonth += costVal;
      }
    } else {
      if (period.indexOf(month) === 0) {
        costForThisMonth += costVal;
      }
    }
  });
  return costForThisMonth;
}

function drawTable(doc, startX, startY, colWidths, headers, rows, headerAligns = [], rowAligns = [], lastRowBold = false) {
  let curY = startY;
  const rowHeight = 8;
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);

  // Header Background
  setFill(doc, GREY_LIGHT);
  doc.rect(startX, curY, totalWidth, rowHeight, "F");

  // Header Text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  setColor(doc, BLACK);
  setDraw(doc, GREY_BORDER);
  doc.setLineWidth(0.3);
  doc.line(startX, curY, startX + totalWidth, curY);
  doc.line(startX, curY + rowHeight, startX + totalWidth, curY + rowHeight);

  let colX = startX;
  headers.forEach((h, i) => {
    const w = colWidths[i];
    const align = headerAligns[i] || "left";
    const textX = align === "right" ? colX + w - 3 : colX + 3;
    doc.text(h, textX, curY + 5.5, { align });
    colX += w;
  });

  curY += rowHeight;

  // Rows
  rows.forEach((row, rIdx) => {
    const isLast = rIdx === rows.length - 1;
    const isBold = isLast && lastRowBold;

    if (isBold) {
      doc.setFont("helvetica", "bold");
      setFill(doc, [245, 245, 245]);
      doc.rect(startX, curY, totalWidth, rowHeight, "F");
    } else {
      doc.setFont("helvetica", "normal");
    }

    doc.setFontSize(8.5);
    setColor(doc, BLACK);

    let cellX = startX;
    row.forEach((cell, cIdx) => {
      const w = colWidths[cIdx];
      const align = rowAligns[cIdx] || "left";
      const textX = align === "right" ? cellX + w - 3 : cellX + 3;
      doc.text(String(cell), textX, curY + 5.5, { align });
      cellX += w;
    });

    // Bottom border for each row
    setDraw(doc, GREY_BORDER);
    doc.setLineWidth(0.2);
    doc.line(startX, curY + rowHeight, startX + totalWidth, curY + rowHeight);

    curY += rowHeight;
  });

  return curY;
}

function openQuotationModal(q) {
  activeQuotationModalData = q;
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
        <div style="font-size: 1.1rem; font-weight: 800; color: var(--primary-red); margin-top: 2px;">Billboard ${q.id}</div>
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

async function handleConvertToPDF() {
  if (activeQuotationModalData) {
    try {
      await downloadQuotationPdf(activeQuotationModalData);
    } catch (err) {
      console.error("PDF generation error, falling back to print dialog:", err);
      window.print();
    }
  } else {
    window.print();
  }
}

export async function downloadQuotationPdf(quotationData) {
  try {
    const jsPDF = (typeof window !== "undefined" && window.jspdf && window.jspdf.jsPDF) || (typeof window !== "undefined" && window.jsPDF);
    if (!jsPDF) {
      throw new Error("jsPDF library is not loaded.");
    }

    // ── Normalise data ──────────────────────────────────────────────────────
    const isUnofficial = !!quotationData.is_unofficial;
    const period = Array.isArray(quotationData.period)
      ? quotationData.period
      : quotationData.period
        ? quotationData.period.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

    // Normalise printing_cost to array
    let printingCostList = [];
    if (Array.isArray(quotationData.printing_cost)) {
      printingCostList = quotationData.printing_cost;
    } else if (
      quotationData.printing_cost &&
      typeof quotationData.printing_cost === "object"
    ) {
      printingCostList = [quotationData.printing_cost];
    } else if (
      typeof quotationData.printing_cost === "number" &&
      quotationData.printing_cost > 0
    ) {
      // Legacy numeric value
      printingCostList = [{ cost: quotationData.printing_cost, from_month: "", to_month: "" }];
    }

    const totalWo = parseFloat(quotationData.total_cost_wo_printing) || 0;
    const numMonths = period.length || 1;
    const costPerMonth = totalWo / numMonths;
    const totalPrinting = totalPrintingCost(printingCostList);
    const grandTotal = totalWo + totalPrinting;

    // Per-month breakdown rows
    const monthRows = period.map((month) => {
      const printCost = printingCostForMonth(printingCostList, month, period);
      return {
        month,
        billboardCost: costPerMonth,
        printingCost: printCost,
        totalWithPrinting: costPerMonth + printCost,
      };
    });

    // ── Document setup ──────────────────────────────────────────────────────
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageH = doc.internal.pageSize.getHeight();
    let curY = 18;

    // Helper: check if we need a new page
    const ensureSpace = (needed) => {
      if (curY + needed > pageH - 14) {
        doc.addPage();
        curY = 14;
      }
    };

    // ── HEADER ──────────────────────────────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    setColor(doc, BLACK);
    doc.text("ad", INNER_LEFT, curY);
    const adW = doc.getTextWidth("ad");
    setColor(doc, RED);
    doc.text("effect", INNER_LEFT + adW, curY);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    setColor(doc, RED);
    doc.text("CONNECTING MEDIA", INNER_LEFT, curY + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setColor(doc, [120, 120, 120]);
    doc.text("North Lebanon | Outdoor", INNER_LEFT, curY + 11);
    doc.text("Advertising", INNER_LEFT, curY + 15);

    // Right: title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    setColor(doc, BLACK);
    if (isUnofficial) {
      doc.text("QUOTATION", INNER_RIGHT, curY + 3, { align: "right" });
    } else {
      doc.text("OFFICIAL", INNER_RIGHT, curY - 1, { align: "right" });
      doc.text("QUOTATION", INNER_RIGHT, curY + 6, { align: "right" });
    }

    const quoRef = quotationData.id
      ? `QUO-${quotationData.id}`
      : `QUO-${quotationData.booking_id || Date.now()}`;
    doc.setFontSize(10.5);
    setColor(doc, RED);
    doc.text(quoRef, INNER_RIGHT, curY + 12, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor(doc, [100, 100, 100]);
    doc.text(`Date: ${formatDate(quotationData.created_at)}`, INNER_RIGHT, curY + 17, { align: "right" });

    curY += 24;
    hRule(doc, curY, 0.8);
    curY += 8;

    // ── CLIENT & CAMPAIGN INFO BOX ──────────────────────────────────────────
    const infoBoxW = CONTENT_W; // 174mm
    const infoBoxH = 26;

    setFill(doc, GREY_LIGHT);
    setDraw(doc, GREY_BORDER);
    doc.setLineWidth(0.3);
    doc.roundedRect(INNER_LEFT, curY, infoBoxW, infoBoxH, 3, 3, "FD");

    const leftColX = INNER_LEFT + 6;
    const rightColX = INNER_LEFT + infoBoxW / 2 + 4;
    const colMaxW = infoBoxW / 2 - 10;
    let infoY = curY + 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    setColor(doc, [120, 120, 120]);
    doc.text("PREPARED FOR CLIENT", leftColX, infoY);

    doc.setFontSize(10.5);
    setColor(doc, BLACK);
    doc.text(quotationData.client_name || "Client Name", leftColX, infoY + 5, { maxWidth: colMaxW });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(doc, [120, 120, 120]);
    if (quotationData.client_id) {
      doc.text(`Client ID: ${quotationData.client_id}`, leftColX, infoY + 10, { maxWidth: colMaxW });
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    setColor(doc, [120, 120, 120]);
    doc.text("CAMPAIGN REFERENCE", rightColX, infoY);

    doc.setFontSize(10.5);
    setColor(doc, RED);
    doc.text(
      quotationData.reference ? `Billboard ${quotationData.id}` : "Billboard Ref",
      rightColX,
      infoY + 5,
      { maxWidth: colMaxW }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(doc, [120, 120, 120]);
    doc.text(
      quotationData.media_location ? `Location: ${quotationData.media_location}` : "Location: N/A",
      rightColX,
      infoY + 10,
      { maxWidth: colMaxW }
    );

    curY += infoBoxH + 8;

    // ── MEDIA DETAILS ROW ───────────────────────────────────────────────────
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    setColor(doc, [140, 140, 140]);
    doc.text("MEDIA DETAILS", INNER_LEFT, curY);
    curY += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    setColor(doc, BLACK);
    const mediaLine = [
      quotationData.media_type ? `Type: ${quotationData.media_type}` : null,
      quotationData.media_used ? `Used: ${quotationData.media_used}` : null,
      quotationData.frequency != null ? `Frequency: ${quotationData.frequency}` : null,
    ]
      .filter(Boolean)
      .join("    |    ");
    doc.text(mediaLine || "N/A", INNER_LEFT, curY, { maxWidth: CONTENT_W });
    curY += 10;

    // ── SECTION 1: PER-MONTH BILLBOARD COST BREAKDOWN ───────────────────────
    ensureSpace(14 + (period.length + 1) * 9 + 10);

    curY = sectionHeading(doc, "Billboard Cost Breakdown by Month", curY);

    // colWidths sum = 42 + 44 + 44 + 44 = 174mm (matches CONTENT_W exactly)
    const bbColWidths = [42, 44, 44, 44];
    const bbHeaders = ["Month", "Billboard Cost / Mo", "Printing Cost", "Total w/ Printing"];
    const bbAligns = ["left", "right", "right", "right"];

    const bbRows = monthRows.map((r) => [
      r.month,
      `$ ${formatMoney(r.billboardCost)}`,
      r.printingCost > 0 ? `$ ${formatMoney(r.printingCost)}` : "$ 0.00",
      `$ ${formatMoney(r.totalWithPrinting)}`,
    ]);

    // Totals row
    bbRows.push([
      "TOTAL",
      `$ ${formatMoney(totalWo)}`,
      totalPrinting > 0 ? `$ ${formatMoney(totalPrinting)}` : "$ 0.00",
      `$ ${formatMoney(grandTotal)}`,
    ]);

    curY = drawTable(
      doc,
      INNER_LEFT,
      curY,
      bbColWidths,
      bbHeaders,
      bbRows,
      bbAligns,
      bbAligns,
      true // last row bold
    );

    curY += 10;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    setColor(doc, BLACK);
    //doc.text(
      //"This quotation is valid for 30 days from the date of issue. All amounts are in USD.",
      //INNER_LEFT,
      //curY
    //);
    curY += 4;
    doc.text(
      "Note: Subject to VAT",
      INNER_LEFT,
      curY
    );

    curY += 10;

    // ── FOOTER NOTE ─────────────────────────────────────────────────────────
    ensureSpace(18);
    hRule(doc, curY, 0.5);
    curY += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    setColor(doc, [160, 160, 160]);
    //doc.text(
      //"This quotation is valid for 30 days from the date of issue. All amounts are in USD.",
      //INNER_LEFT,
      //curY
    //);
    curY += 4;
    doc.text(
      "adeffect | North Lebanon | Outdoor Advertising",
      INNER_LEFT,
      curY
    );


    // ── Save & export ───────────────────────────────────────────────────────
    const fileName = `quotation_${quotationData.booking_id || quotationData.id || Date.now()}.pdf`;
    doc.save(fileName);
    const pdfBlob = doc.output("blob");

    return { blob: pdfBlob, fileName, doc };
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SPENDING CHART — update donut chart with real quotation values from this month
// ─────────────────────────────────────────────────────────────────────────────
function refreshSpendingChart() {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // Sum quotation costs that were created this month
  let billboardTotal = 0;
  let printingTotal = 0;

  (currentQuotations || []).forEach(q => {
    const created = new Date(q.created_at || Date.now());
    if (created.getMonth() === thisMonth && created.getFullYear() === thisYear) {
      billboardTotal += parseFloat(q.total_cost_wo_printing) || 0;
      const pc = Array.isArray(q.printing_cost)
        ? q.printing_cost.reduce((s, i) => s + (parseFloat(i.cost || i) || 0), 0)
        : (parseFloat(q.printing_cost) || 0);
      printingTotal += pc;
    }
  });

  const grandTotal = billboardTotal + printingTotal;

  // Update center text
  const centerText = document.getElementById('donutCenterText');
  if (centerText) {
    if (grandTotal > 0) {
      centerText.textContent = `$${grandTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
      centerText.setAttribute('font-size', '4.5');
    } else {
      centerText.textContent = 'N/A';
      centerText.setAttribute('font-size', '6');
    }
  }

  // Update legend amounts
  const billEl = document.getElementById('spendBillboardsAmt');
  const printEl = document.getElementById('spendPrintingAmt');
  const totalLine = document.getElementById('spendTotalLine');

  if (billEl) billEl.textContent = grandTotal > 0 ? `$${billboardTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '';
  if (printEl) printEl.textContent = grandTotal > 0 ? `$${printingTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '';
  if (totalLine) {
    totalLine.textContent = grandTotal > 0
      ? `Total this month: $${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      : 'No spending recorded this month';
  }

  // Update donut arcs
  const circumference = 100; // stroke-dasharray sums to 100
  const billboardArc = document.getElementById('donutBillboardArc');
  const printingArc = document.getElementById('donutPrintingArc');

  if (grandTotal > 0 && billboardArc && printingArc) {
    const billboardPct = (billboardTotal / grandTotal) * circumference;
    const printingPct = (printingTotal / grandTotal) * circumference;

    billboardArc.setAttribute('stroke-dasharray', `${billboardPct.toFixed(2)} ${(circumference - billboardPct).toFixed(2)}`);
    billboardArc.setAttribute('stroke-dashoffset', '25');

    printingArc.setAttribute('stroke-dasharray', `${printingPct.toFixed(2)} ${(circumference - printingPct).toFixed(2)}`);
    // offset = 25 + billboard portion (so printing starts where billboard ends)
    printingArc.setAttribute('stroke-dashoffset', `${(circumference - billboardPct + 25).toFixed(2)}`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CONFIRMATION DIALOG — custom in-page confirm modal (no browser alert)
// ─────────────────────────────────────────────────────────────────────────────
function showConfirmDialog(title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel') {
  return new Promise(resolve => {
    let overlay = document.getElementById('dashConfirmOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'dashConfirmOverlay';
      overlay.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
      `;
      document.body.appendChild(overlay);
    }

    overlay.innerHTML = `
      <div style="background:#fff; border-radius:20px; padding:36px 32px; max-width:420px; width:90%;
                  border: 3px solid #111; box-shadow: 6px 6px 0 #111; text-align:center;">
        <h3 style="font-size:1.3rem; font-weight:900; color:#111; margin-bottom:12px;">${title}</h3>
        <p style="font-size:0.95rem; color:#555; line-height:1.5; margin-bottom:24px;">${message}</p>
        <div style="display:flex; gap:12px; justify-content:center;">
          <button id="dashConfirmCancel" style="padding:10px 24px; border-radius:10px; border:2px solid #ccc;
            background:#f5f5f5; font-weight:700; font-size:0.9rem; cursor:pointer;">${cancelLabel}</button>
          <button id="dashConfirmOk" style="padding:10px 24px; border-radius:10px; border:2px solid #DC2626;
            background:#DC2626; color:#fff; font-weight:700; font-size:0.9rem; cursor:pointer;">${confirmLabel}</button>
        </div>
      </div>
    `;

    overlay.style.display = 'flex';

    document.getElementById('dashConfirmOk').onclick = () => {
      overlay.style.display = 'none';
      resolve(true);
    };
    document.getElementById('dashConfirmCancel').onclick = () => {
      overlay.style.display = 'none';
      resolve(false);
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST NOTIFICATION helper
// ─────────────────────────────────────────────────────────────────────────────
function showDashboardToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:10000;display:flex;flex-direction:column;gap:10px;';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? '#16A34A' : '#DC2626';
  toast.style.cssText = `background:${bg};color:#fff;padding:12px 20px;border-radius:12px;
    font-weight:700;font-size:0.9rem;box-shadow:0 4px 16px rgba(0,0,0,0.2);
    animation:fadeIn 0.3s ease;max-width:320px;`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ─────────────────────────────────────────────────────────────────────────────
// MY ACCOUNT TAB
// ─────────────────────────────────────────────────────────────────────────────
async function renderAccountTab() {
  const container = document.getElementById('accountTabContent');
  if (!container) return;

  const user = getCurrentUser();
  if (!user) {
    container.innerHTML = `<p style="color:#666;padding:24px;">Please log in to view your account.</p>`;
    return;
  }

  // Show loading state
  container.innerHTML = `<p style="color:#888;padding:24px;">Loading account info...</p>`;

  // Fetch full profile from Supabase
  const profile = await fetchUserProfile(user.id) || {};

  const name = profile.user_name || user.name || '';
  const email = profile.email || user.email || '';
  const phone = profile.phone_number || '';
  const website = profile.website || '';
  const businessName = profile.business_name || '';
  const location = profile.location || '';

  container.innerHTML = `
    <div style="max-width:720px;">

      <!-- Account Info Card -->
      <div class="account-card" style="background:#fff;border-radius:20px;border:2px solid #E5E7EB;padding:32px;margin-bottom:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <h3 style="font-size:1.15rem;font-weight:900;color:#111;margin-bottom:6px;">Account Information</h3>
        <p style="font-size:0.85rem;color:#888;margin-bottom:24px;">Your registered account details. Update any field and click Save.</p>

        <form id="accountInfoForm" style="display:flex;flex-direction:column;gap:16px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Full Name</label>
              <input id="accName" type="text" value="${escHtml(name)}" placeholder="Full Name"
                style="width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #D1D5DB;font-size:0.95rem;font-family:inherit;box-sizing:border-box;" />
            </div>
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Business / Company Name</label>
              <input id="accBusiness" type="text" value="${escHtml(businessName)}" placeholder="Business Name"
                style="width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #D1D5DB;font-size:0.95rem;font-family:inherit;box-sizing:border-box;" />
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Email Address</label>
              <input id="accEmail" type="email" value="${escHtml(email)}" disabled
                style="width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #E5E7EB;font-size:0.95rem;font-family:inherit;background:#F9FAFB;color:#999;cursor:not-allowed;box-sizing:border-box;" />
              <div style="font-size:0.75rem;color:#aaa;margin-top:3px;">Email cannot be changed directly.</div>
            </div>
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Phone Number</label>
              <input id="accPhone" type="tel" value="${escHtml(phone)}" placeholder="+1 234 567 8900"
                style="width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #D1D5DB;font-size:0.95rem;font-family:inherit;box-sizing:border-box;" />
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Website</label>
              <input id="accWebsite" type="url" value="${escHtml(website)}" placeholder="https://yourwebsite.com"
                style="width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #D1D5DB;font-size:0.95rem;font-family:inherit;box-sizing:border-box;" />
            </div>
            <div>
              <label style="font-size:0.8rem;font-weight:700;color:#555;display:block;margin-bottom:4px;">Location / City</label>
              <input id="accLocation" type="text" value="${escHtml(location)}" placeholder="e.g. Tripoli, Lebanon"
                style="width:100%;padding:10px 14px;border-radius:10px;border:1.5px solid #D1D5DB;font-size:0.95rem;font-family:inherit;box-sizing:border-box;" />
            </div>
          </div>

          <div id="accountInfoMsg" style="display:none;"></div>

          <div>
            <button type="submit" id="btnSaveAccountInfo"
              style="padding:12px 28px;border-radius:12px;border:2px solid #111;background:var(--primary-red,#D72638);
                     color:#fff;font-weight:800;font-size:0.95rem;cursor:pointer;font-family:inherit;box-shadow:3px 3px 0 #111;">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <!-- Password Card -->
      <div class="account-card" style="background:#fff;border-radius:20px;border:2px solid #E5E7EB;padding:32px;margin-bottom:24px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
        <h3 style="font-size:1.15rem;font-weight:900;color:#111;margin-bottom:6px;">Password & Security</h3>
        <p style="font-size:0.85rem;color:#888;margin-bottom:20px;">Reset your password by sending a reset link to your registered email.</p>
        <div id="pwdResetMsg" style="display:none;margin-bottom:14px;"></div>
        <button id="btnSendPwdReset"
          style="padding:11px 24px;border-radius:12px;border:2px solid #111;background:#fff;
                 font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit;box-shadow:2px 2px 0 #111;">
          Send Password Reset Email
        </button>
      </div>

      <!-- Danger Zone -->
      <div class="account-card" style="background:#FFF5F5;border-radius:20px;border:2px solid #FECACA;padding:32px;box-shadow:0 2px 12px rgba(220,38,38,0.07);">
        <h3 style="font-size:1.15rem;font-weight:900;color:#DC2626;margin-bottom:6px;">Danger Zone</h3>
        <p style="font-size:0.85rem;color:#888;margin-bottom:20px;">Permanently delete your AdEffect account. All your data will be removed and this cannot be undone.</p>
        <div id="deleteAccMsg" style="display:none;margin-bottom:14px;"></div>
        <button id="btnDeleteAccount"
          style="padding:11px 24px;border-radius:12px;border:2px solid #DC2626;background:#DC2626;color:#fff;
                 font-weight:800;font-size:0.9rem;cursor:pointer;font-family:inherit;box-shadow:2px 2px 0 #7F1D1D;">
          Delete My Account
        </button>
      </div>

    </div>
  `;

  // ── Save account info ──────────────────────────────────────────────────────
  document.getElementById('accountInfoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('btnSaveAccountInfo');
    const msg = document.getElementById('accountInfoMsg');
    btn.disabled = true;
    btn.textContent = 'Saving...';

    const updates = {
      user_name: document.getElementById('accName').value.trim(),
      business_name: document.getElementById('accBusiness').value.trim(),
      phone_number: document.getElementById('accPhone').value.trim(),
      website: document.getElementById('accWebsite').value.trim(),
      location: document.getElementById('accLocation').value.trim(),
    };

    const result = await updateUserProfile(user.id, updates);

    if (result.success) {
      // Update local session name
      const updated = { ...user, name: updates.user_name };
      setCurrentUser(updated);
      const sidebarName = document.getElementById('sidebarProfileName');
      if (sidebarName) sidebarName.textContent = updates.user_name;

      showInlineMsg(msg, 'Account information updated successfully!', 'success');
    } else {
      showInlineMsg(msg, result.error || 'Failed to save changes. Please try again.', 'error');
    }

    btn.disabled = false;
    btn.textContent = 'Save Changes';
  });

  // ── Password reset email ───────────────────────────────────────────────────
  document.getElementById('btnSendPwdReset').addEventListener('click', async () => {
    const btn = document.getElementById('btnSendPwdReset');
    const msg = document.getElementById('pwdResetMsg');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const result = await sendPasswordResetEmail(email);
    if (result.success) {
      showInlineMsg(msg, `Password reset email sent to ${email}. Check your inbox.`, 'success');
    } else {
      showInlineMsg(msg, result.error || 'Failed to send reset email. Please try again.', 'error');
    }

    btn.disabled = false;
    btn.textContent = 'Send Password Reset Email';
  });

  // ── Delete account ─────────────────────────────────────────────────────────
  document.getElementById('btnDeleteAccount').addEventListener('click', async () => {
    const confirmed = await showConfirmDialog(
      'Delete Account',
      'This will <strong>permanently delete</strong> your AdEffect account and all associated data. This action cannot be undone.<br><br>Are you absolutely sure?',
      'Yes, Delete My Account',
      'Cancel'
    );

    if (!confirmed) return;

    const btn = document.getElementById('btnDeleteAccount');
    const msg = document.getElementById('deleteAccMsg');
    btn.disabled = true;
    btn.textContent = 'Deleting...';

    const result = await deleteUserAccount(user.id);
    if (result.success) {
      showDashboardToast('Account deleted. Redirecting...', 'error');
      setCurrentUser(null);
      setTimeout(() => showPage('home'), 2000);
    } else {
      showInlineMsg(msg, 'Failed to delete account. Please contact support.', 'error');
      btn.disabled = false;
      btn.textContent = 'Delete My Account';
    }
  });
}

// Tiny HTML escaper to prevent XSS in interpolated values
function escHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Show inline success/error message inside account cards
function showInlineMsg(el, text, type) {
  if (!el) return;
  const bg = type === 'success' ? '#DCFCE7' : '#FEF2F2';
  const border = type === 'success' ? '#16A34A' : '#EF4444';
  const color = type === 'success' ? '#15803D' : '#991B1B';
  el.style.cssText = `background:${bg};border:1.5px solid ${border};color:${color};
    padding:10px 14px;border-radius:10px;font-weight:700;font-size:0.88rem;display:block;`;
  el.textContent = text;
  setTimeout(() => { el.style.display = 'none'; }, 6000);
}
