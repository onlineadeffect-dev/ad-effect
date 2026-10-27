// Billboard Discovery & Filter Modal Logic (Pages 2 & 3)
import { fetchBillboards, fetchAllBookings } from './supabaseClient.js';
import { getCurrentUser, showPage } from './auth.js';
import { openBillboardDetail } from './bookingWizard.js';
import { isPackageMode, packageStartDate, packageEndDate, toggleBillboardInPackage, isBillboardInPackage } from './packageWizard.js';

let allBillboards = [];
let globalBookings = [];
let activeFilters = {
  searchQuery: '',
  locations: [],
  structures: [],
  availability: [],
  sizes: []
};

export async function initDiscovery() {

  const container = document.getElementById('billboardsGrid');
  if (!container) return;

  // Fetch billboards and all bookings in parallel
  const [billboards, allBookings] = await Promise.all([
    fetchBillboards(),
    fetchAllBookings()
  ]);
  globalBookings = allBookings;

  console.log('Structure values:', [...new Set(billboards.map(b => b.structure))]);

  // Compute real-time availability: a billboard's availability is strictly
  // determined by whether or not that billboard is currently taken.
  const now = Date.now();
  allBillboards = billboards.map(b => {
    // 1. Direct record check: billboard marked taken or unavailable in catalog
    const isExplicitlyUnavailable = b.is_available === false ||
      (typeof b.is_available === 'string' &&
        (b.is_available.toLowerCase().includes('unavail') || b.is_available.toLowerCase().includes('taken')));

    // 2. Booking overlap check: active or approved booking currently taking this billboard
    let coveringBooking = null;
    for (const booking of allBookings) {
      const bIds = Array.isArray(booking.billboard_id)
        ? booking.billboard_id.map(id => String(id).toUpperCase())
        : (booking.billboard_id ? [String(booking.billboard_id).toUpperCase()] : []);

      // Also check requested_booking_items / items if present
      const childItems = booking.requested_booking_items || booking.pending_booking_items || booking.items || [];
      childItems.forEach(item => {
        if (item && item.billboard_id) bIds.push(String(item.billboard_id).toUpperCase());
      });

      if (!bIds.includes(String(b.billboard_id).toUpperCase())) continue;

      const bStart = new Date(booking.start_time || booking.start_date).getTime();
      const bEnd = new Date(booking.end_time || booking.end_date).getTime();

      const timeMatches = !isNaN(bStart) && !isNaN(bEnd) && now >= bStart && now <= bEnd;
      const isActiveFlag = booking.is_active === true && (isNaN(bEnd) || now <= bEnd);

      if (timeMatches || isActiveFlag) {
        coveringBooking = booking;
        break;
      }
    }

    const isCurrentlyTaken = isExplicitlyUnavailable || !!coveringBooking;

    let availStatus = 'Available';
    if (isCurrentlyTaken) {
      if (coveringBooking && (coveringBooking.end_time || coveringBooking.end_date)) {
        const untilDate = new Date(coveringBooking.end_time || coveringBooking.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        availStatus = `Unavailable until ${untilDate}`;
      } else if (b.available_until) {
        const untilDate = new Date(b.available_until).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        availStatus = `Unavailable until ${untilDate}`;
      } else {
        availStatus = 'Unavailable until...';
      }
    }

    return {
      ...b,
      is_available: availStatus,
      is_taken: isCurrentlyTaken
    };
  });

  allBillboards.sort(compareBillboards);
  renderBillboards(allBillboards);

  // Search input handler
  const searchInput = document.getElementById('discoverySearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Filter Modal Toggles
  const btnToggleFilter = document.getElementById('btnToggleFilter');
  const filterModal = document.getElementById('filterModal');
  const btnCloseFilter = document.getElementById('btnCloseFilter');
  const btnApplyFilter = document.getElementById('btnApplyFilter');
  const btnResetFilter = document.getElementById('btnResetFilter');

  if (btnToggleFilter && filterModal) {
    btnToggleFilter.addEventListener('click', () => filterModal.classList.add('active'));
  }

  if (btnCloseFilter && filterModal) {
    btnCloseFilter.addEventListener('click', () => filterModal.classList.remove('active'));
  }

  if (btnApplyFilter && filterModal) {
    btnApplyFilter.addEventListener('click', () => {
      collectFilterModalInputs();
      applyFilters();
      filterModal.classList.remove('active');
    });
  }

  if (btnResetFilter && filterModal) {
    btnResetFilter.addEventListener('click', () => {
      resetFilterInputs();
      applyFilters();
      filterModal.classList.remove('active');
    });
  }

  // Auth banner updates
  window.addEventListener('authChange', updateAccessBanner);
  window.addEventListener('packageModeChanged', () => {
    applyFilters();
  });
  updateAccessBanner();
}

export function updateAccessBanner() {
  const banner = document.getElementById('accessBanner');
  const user = getCurrentUser();

  if (!banner) return;

  if (user && user.status === 'verified') {
    banner.style.display = 'none';
  } else {
    banner.style.display = 'flex';
  }
}

function collectFilterModalInputs() {
  activeFilters.locations = Array.from(
    document.querySelectorAll('input[name="filter_location"]:checked')
  ).map(cb => cb.value);

  activeFilters.structures = Array.from(
    document.querySelectorAll('input[name="filter_structure"]:checked')
  ).map(cb => cb.value);

  activeFilters.availability = Array.from(
    document.querySelectorAll('input[name="filter_availability"]:checked')
  ).map(cb => cb.value);

  activeFilters.sizes = Array.from(
    document.querySelectorAll('input[name="filter_size"]:checked')
  ).map(cb => cb.value);
}

function resetFilterInputs() {
  document.querySelectorAll('.filter-modal-content input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
  });

  activeFilters = {
    searchQuery: activeFilters.searchQuery,
    locations: [],
    structures: [],
    availability: [],
    sizes: []
  };
}

function applyFilters() {
  let listToFilter = allBillboards;

  if (isPackageMode && packageStartDate && packageEndDate) {
    const pkgStart = new Date(packageStartDate).getTime();
    const pkgEnd = new Date(packageEndDate).getTime();
    
    listToFilter = allBillboards.filter(b => {
      // Check if it's available ANY time within the package window.
      // Actually the prompt says: "if a billboard is available somewhere within the selected time frame, DISPLAY IT. It does not have to be available during the ENTIRE time frame to appear in the list."
      // Let's implement: a billboard is unavailable during the ENTIRE timeframe ONLY IF there is a booking that completely covers or overlaps the entire timeframe such that no free time exists.
      // Alternatively, if it has no bookings overlapping, it's fully available. If it overlaps partially, it's still available somewhere.
      // So we ONLY hide it if it's fully booked from pkgStart to pkgEnd.
      // A simpler approach for "available somewhere": just check if there is at least one day free.
      // For now, let's just show all billboards except those that are booked for the *entire* duration.
      // Actually, if we just want it to be available *at all*, we can check if the total booked days within the timeframe < total days in timeframe.
      
      const overlappingBookings = globalBookings.filter(booking => {
        if (booking.billboard_id !== b.billboard_id) return false;
        const bStart = new Date(booking.start_time).getTime();
        const bEnd   = new Date(booking.end_time).getTime();
        return bStart <= pkgEnd && bEnd >= pkgStart; // overlaps
      });
      
      if (overlappingBookings.length === 0) return true;
      
      // If there's a single booking that completely covers the timeframe, it's not available.
      const isFullyCovered = overlappingBookings.some(booking => {
        const bStart = new Date(booking.start_time).getTime();
        const bEnd   = new Date(booking.end_time).getTime();
        return bStart <= pkgStart && bEnd >= pkgEnd;
      });
      
      return !isFullyCovered;
    });
  }

  const filtered = listToFilter.filter(b => {
    const locStr = (b.location || '').toLowerCase();
    const typeStr = (b.structure || '').toLowerCase();
    const idStr = (b.billboard_id || '').toLowerCase();
    const availStr = (typeof b.is_available === 'boolean' ? (b.is_available ? 'available' : 'unavailable until...') : (b.is_available || '')).toLowerCase();
    const sizeStr = (b.size || '').replace(/\s+/g, '').toLowerCase();

    // 1. Search Query Filter (billboard_id, location, type)
    if (activeFilters.searchQuery) {
      const q = activeFilters.searchQuery;
      const matchId = idStr.includes(q);
      const matchLoc = locStr.includes(q);
      const matchType = typeStr.includes(q);
      if (!matchId && !matchLoc && !matchType) return false;
    }

    // 2. Location filter
    if (activeFilters.locations.length > 0) {
      const matchLoc = activeFilters.locations.some(loc => 
        locStr.includes(loc.toLowerCase())
      );
      if (!matchLoc) return false;
    }

    // 3. Type filter
    if (activeFilters.structures.length > 0) {
      const matchType = activeFilters.structures.some(t => 
        typeStr.includes(t.toLowerCase())
      );
      if (!matchType) return false;
    }

    // 4. Availability filter
    if (activeFilters.availability.length > 0) {
      const isCardAvail = !b.is_taken && (availStr.startsWith('available') || availStr === 'true');
      const matchAvail = activeFilters.availability.some(a => {
        const filterVal = a.toLowerCase();
        if (filterVal === 'available') return isCardAvail;
        if (filterVal === 'unavailable') return !isCardAvail;
        return availStr.includes(filterVal);
      });
      if (!matchAvail) return false;
    }

    // 5. Sizes filter
    if (activeFilters.sizes.length > 0) {
      const matchSize = activeFilters.sizes.some(s => 
        sizeStr.includes(s.replace(/\s+/g, '').toLowerCase())
      );
      if (!matchSize) return false;
    }

    return true;
  });

  renderBillboards(filtered);
}

const STRUCTURE_ORDER = [
  { key: 'megapole', title: 'Megapole' },
  { key: 'unipole', title: 'Unipole' },
  { key: 'wallbanner', title: 'Wallbanner' },
  { key: 'minipole', title: 'Minipole' },
  { key: 'backlit', title: 'Backlit' },
  { key: 'rooftop', title: 'Rooftop' },
  { key: 'bridge', title: 'Bridge' },
  { key: 'lightpole banners', title: 'Lightpole Banners' }
];

function getStructureKey(structureStr) {
  if (!structureStr) return 'other';
  const s = structureStr.toLowerCase().replace(/[\s\-_]+/g, '');
  if (s.includes('megapole')) return 'megapole';
  if (s.includes('unipole')) return 'unipole';
  if (s.includes('wallbanner') || s.includes('wall')) return 'wallbanner';
  if (s.includes('minipole')) return 'minipole';
  if (s.includes('backlit')) return 'backlit';
  if (s.includes('rooftop') || s.includes('roof')) return 'rooftop';
  if (s.includes('bridge')) return 'bridge';
  if (s.includes('lightpole') || s.includes('polebanner')) return 'lightpole banners';
  return 'other';
}

export function parseBillboardCode(rawId) {
  if (!rawId) return { prefix: '', num: 0, baseCode: '', side: '', raw: '' };
  const str = String(rawId).trim().toUpperCase();

  // Match pattern like "U0015-A", "MG0019-B", "MP005_A", "U002 A", "U0015A"
  const structuredMatch = str.match(/^([A-Z]+)[-_\s]*(\d+)(?:[-_\s]*([A-Z0-9]+))?$/i);
  if (structuredMatch) {
    const prefix = structuredMatch[1];
    const num = parseInt(structuredMatch[2], 10);
    const baseCode = `${prefix}${structuredMatch[2]}`;
    const side = structuredMatch[3] || '';
    return { prefix, num, baseCode, side, raw: str };
  }

  // Fallback for codes with hyphen/space/underscore before side (e.g. "WALL-1-A")
  const dashMatch = str.match(/^(.*?)[-_\s]+([A-Z0-9])$/i);
  if (dashMatch) {
    return { prefix: dashMatch[1], num: 0, baseCode: dashMatch[1], side: dashMatch[2], raw: str };
  }

  return { prefix: str, num: 0, baseCode: str, side: '', raw: str };
}

export function compareBillboards(a, b) {
  const pA = parseBillboardCode(a.billboard_id || a.id);
  const pB = parseBillboardCode(b.billboard_id || b.id);

  // 1. Compare prefix alphabetically (e.g. MG vs MP vs U)
  if (pA.prefix !== pB.prefix) {
    const compPrefix = pA.prefix.localeCompare(pB.prefix);
    if (compPrefix !== 0) return compPrefix;
  }

  // 2. Compare numeric part numerically (so U2 comes before U15)
  if (pA.num !== pB.num) {
    return pA.num - pB.num;
  }

  // 3. Compare baseCode if numbers are equal (handles leading zeroes)
  if (pA.baseCode !== pB.baseCode) {
    const compBase = pA.baseCode.localeCompare(pB.baseCode, undefined, { numeric: true });
    if (compBase !== 0) return compBase;
  }

  // 4. Compare subside alphabetically (A before B, B before C)
  if (pA.side !== pB.side) {
    return pA.side.localeCompare(pB.side, undefined, { numeric: true });
  }

  // 5. Fallback to raw string
  return (pA.raw || '').localeCompare(pB.raw || '');
}

// Helper to calculate number of months between start and end date
export function calculateMonths(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return 1;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  if (isNaN(start) || isNaN(end) || end <= start) return 1;
  const diffDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.round(diffDays / 30));
}

// Helper to calculate final billboard price when duration is > 1 month
export function calculateBillboardPrice(monthlyPrice, startDateStr, endDateStr) {
  const numericMonthly = typeof monthlyPrice === 'number'
    ? monthlyPrice
    : parseFloat((monthlyPrice || '').toString().replace(/[^0-9.]/g, '')) || 0;
  const months = calculateMonths(startDateStr, endDateStr);
  const totalPrice = numericMonthly * months;
  return {
    months,
    monthlyPrice: numericMonthly,
    totalPrice,
    formattedTotal: `$ ${totalPrice.toLocaleString()}`
  };
}

function renderBillboardCard(b) {
  const isAvail = b.is_available === 'Available' || b.is_available === true;
  const statusText = isAvail ? 'Available' : (b.is_available === false ? 'Unavailable until...' : (b.is_available || 'Available'));
  const statusClass = isAvail ? 'status-available' : 'status-soon';
  let btnLabel = isAvail ? 'Book Now' : 'Check Schedule';
  let extraBtnClass = !isAvail ? 'soon' : '';

  if (isPackageMode) {
    const inBasket = isBillboardInPackage(b.billboard_id);
    if (inBasket) {
      btnLabel = 'Remove from Package';
      extraBtnClass = 'remove-pkg';
    } else {
      btnLabel = 'Add to Package';
      extraBtnClass = 'add-pkg';
    }
  }

  const locationTag = (b.location || 'North Lebanon').split(',')[0];

  return `
    <div class="billboard-card" data-id="${b.billboard_id}">
      <div class="card-image-wrapper">
        <img src="${b.image_url}" alt="Billboard ${b.billboard_id}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';" />
        <div class="billboard-tag">
          ${b.billboard_id}
          <span>${locationTag}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="card-header-row">
          <h3 class="card-title">${b.billboard_id}</h3>
          <span class="card-status ${statusClass}">${statusText}</span>
        </div>
        <div class="card-location">${b.location || 'North Lebanon / Network'}</div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 8px;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #666; text-transform: uppercase;">${b.structure || 'Billboard'}</span>
          <span style="font-weight: 900; color: var(--primary-red); font-size: 1.15rem;">${b.price} <span style="font-size: 0.75rem; font-weight: 700; color: #777;">/ mo</span></span>
        </div>
        <div style="font-size: 0.72rem; color: #777; margin-top: 4px; font-style: italic; line-height: 1.3;">
          * Price is for 1 month only and is subject to increase according to extra services.
        </div>
        <button class="btn-card-action ${extraBtnClass}" data-id="${b.billboard_id}" style="margin-top: 14px; ${isPackageMode && isBillboardInPackage(b.billboard_id) ? 'background:#991B1B; border-color:#991B1B;' : ''}">
          ${btnLabel}
        </button>
      </div>
    </div>
  `;
}

function renderBillboards(list) {
  const container = document.getElementById('billboardsGrid');
  if (!container) return;

  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '40px';

  if (list.length === 0) {
    container.innerHTML = `
      <div style="width: 100%; text-align: center; padding: 40px; background: #FFFFFF; border-radius: 16px; border: 2px dashed #ccc;">
        <h3 style="font-size: 1.4rem; font-weight: 800; color: #666;">No billboards match your search filter</h3>
        <p style="color: #999; margin-top: 8px;">Try selecting different options or resetting your search.</p>
      </div>
    `;
    return;
  }

  // Group billboards by structure key
  const grouped = {};
  STRUCTURE_ORDER.forEach(item => { grouped[item.key] = []; });
  grouped['other'] = {};

  list.forEach(b => {
    const key = getStructureKey(b.structure);
    if (key === 'other') {
      const structName = b.structure || 'Other Billboard';
      if (!grouped['other'][structName]) {
        grouped['other'][structName] = [];
      }
      grouped['other'][structName].push(b);
    } else {
      grouped[key].push(b);
    }
  });

  let sectionsHtml = '';

  // 1. Render predefined ordered structure groups
  STRUCTURE_ORDER.forEach(item => {
    const items = grouped[item.key];
    if (items && items.length > 0) {
      items.sort(compareBillboards);
      sectionsHtml += `
        <div class="structure-section" style="width: 100%;">
          <div class="structure-title-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E2E8F0;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #111111; margin: 0; text-transform: capitalize;">${item.title}</h2>
            <span style="background: var(--primary-red); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 2px 10px; border-radius: 12px;">${items.length}</span>
          </div>
          <div class="billboards-grid">
            ${items.map(renderBillboardCard).join('')}
          </div>
        </div>
      `;
    }
  });

  // 2. Render any remaining unexpected structures
  Object.keys(grouped['other']).forEach(structName => {
    const items = grouped['other'][structName];
    if (items && items.length > 0) {
      items.sort(compareBillboards);
      sectionsHtml += `
        <div class="structure-section" style="width: 100%;">
          <div class="structure-title-row" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #E2E8F0;">
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #111111; margin: 0; text-transform: capitalize;">${structName}</h2>
            <span style="background: var(--primary-red); color: #fff; font-size: 0.85rem; font-weight: 700; padding: 2px 10px; border-radius: 12px;">${items.length}</span>
          </div>
          <div class="billboards-grid">
            ${items.map(renderBillboardCard).join('')}
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = sectionsHtml;

  // Bind click listeners for Access Control & Booking trigger
  container.querySelectorAll('.billboard-card, .btn-card-action').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const billboardId = el.getAttribute('data-id');
      handleBillboardClick(billboardId);
    });
  });
}

// Access Control check on click
function handleBillboardClick(billboardId) {
  const user = getCurrentUser();
  if (!user || user.status !== 'verified') {
    showPage('authSection');
  } else {
    const billboard = allBillboards.find(b => b.billboard_id === billboardId);
    if (billboard) {
      if (isPackageMode) {
        toggleBillboardInPackage(billboard);
      } else {
        openBillboardDetail(billboard);
      }
    }
  }
}
