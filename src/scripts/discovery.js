// Billboard Discovery & Filter Modal Logic (Pages 2 & 3)
import { fetchBillboards } from './supabaseClient.js';
import { getCurrentUser, showPage } from './auth.js';
import { openBillboardDetail } from './bookingWizard.js';

let allBillboards = [];
let activeFilters = {
  searchQuery: '',
  locations: [],
  structures: [],
  availability: [],
  sizes: []
};

export async function initDiscovery() {

  allBillboards = await fetchBillboards();
  console.log('Structure values:', [...new Set(allBillboards.map(b => b.structure))]);

  const container = document.getElementById('billboardsGrid');
  if (!container) return;

  // Fetch billboards dataset
  allBillboards = await fetchBillboards();
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
  const filtered = allBillboards.filter(b => {
    const locStr = (b.location || '').toLowerCase();
    const typeStr = (b.structure || '').toLowerCase();
    const idStr = (b.billboard_id || '').toLowerCase();
    const availStr = (typeof b.is_available === 'boolean' ? (b.is_available ? 'available' : 'unavailable') : (b.is_available || '')).toLowerCase();
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
      const matchAvail = activeFilters.availability.some(a => 
        availStr.includes(a.toLowerCase())
      );
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

function renderBillboardCard(b) {
  const isAvail = b.is_available === 'Available' || b.is_available === true;
  const statusText = isAvail ? 'Available' : (b.is_available === false ? 'Unavailable' : (b.is_available || 'Available'));
  const statusClass = isAvail ? 'status-available' : 'status-soon';
  const btnLabel = isAvail ? 'Book Now' : 'Check Schedule';
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
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <span style="font-size: 0.85rem; font-weight: 700; color: #666; text-transform: uppercase;">${b.structure || 'Billboard'}</span>
          <span style="font-weight: 900; color: var(--primary-red); font-size: 1.15rem;">${b.price}</span>
        </div>
        <button class="btn-card-action ${!isAvail ? 'soon' : ''}" data-id="${b.billboard_id}" style="margin-top: 14px;">
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
    // Redirect visitors/guests to Auth Choice Page (Page 12)
    showPage('authSection');
  } else {
    // Authenticated client proceeds to Billboard Detail View (Page 4) & Booking Flow
    const billboard = allBillboards.find(b => b.billboard_id === billboardId);
    if (billboard) {
      openBillboardDetail(billboard);
    }
  }
}
