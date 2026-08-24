// Supabase Client initialization & Data Layer with Local Fallback Store
import { getCurrentUser, showPage } from './auth.js';

const rawUrl = (typeof import.meta !== 'undefined' && import.meta && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || 'https://iyznlhahblpjczjzmscy.supabase.co';
const SUPABASE_URL = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5em5saGFoYmxwamN6anptc2N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg5MzQsImV4cCI6MjEwMjcyNDkzNH0.gnVzB1be9lfv2ylqqz6bSLiakv01YwXuXxNVF47VhHA';

let supabaseClient = null;

// Initialize Supabase JS Client if window.supabase or module is loaded
export function getSupabase() {
  if (typeof window !== 'undefined' && !supabaseClient && window.supabase && SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('your-supabase-project-id')) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
      console.warn('Supabase initialization warning:', e);
    }
  }
  return supabaseClient;
}

// Normalizer to format Supabase records into standard application model
export function normalizeBillboards(list) {
  if (!Array.isArray(list)) return [];
  return list.map(b => {
    // Format price to display string e.g. "$ 1,400" if it's a number
    let displayPrice = b.price;
    if (typeof b.price === 'number') {
      displayPrice = `$ ${b.price.toLocaleString()}`;
    } else if (b.price && !b.price.toString().startsWith('$')) {
      displayPrice = `$ ${b.price}`;
    }

    // Format is_available to display status e.g. "Available" or "Unavailable"
    let statusText = b.is_available;
    if (typeof b.is_available === 'boolean') {
      statusText = b.is_available ? 'Available' : 'Unavailable';
    } else if (!b.is_available) {
      statusText = 'Available';
    }

    return {
      ...b,
      id: b.id || b.billboard_id,
      billboard_id: b.billboard_id || `BB-${b.id}`,
      location: b.location || 'Tripoli Entrance & Avenue',
      maps_url: b.maps_url || 'https://maps.google.com/?q=Tripoli,Lebanon',
      size: b.size || 'Standard Size',
      price: displayPrice || '$ 1,000',
      numericPrice: typeof b.price === 'number' ? b.price : parseFloat((b.price || '').toString().replace(/[^0-9.]/g, '')) || 0,
      image_url: b.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      type: b.type || 'Unipole',
      is_available: statusText,
      available_until: b.available_until || null
    };
  });
}

// Initial seed billboards matching PDF screens (Page 2, Page 4, etc.)
const INITIAL_BILLBOARDS = [
  {
    billboard_id: 'U002-A',
    location: 'Bahsas, Tripoli Entrance',
    maps_url: 'https://www.google.com/maps/place/Ad+effect/data=!4m2!3m1!1s0x0:0x1c8a54b37c14fbfc?sa=X&ved=1t:2428&ictx=111',
    size: 'W:147 - H:43',
    price: '$ 1,000',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    type: 'Unipole',
    is_available: 'Available',
    available_until: null
  },
  {
    billboard_id: 'U002-B',
    location: 'Bahsas, Tripoli Entrance',
    maps_url: 'https://maps.google.com/maps?q=34.396779039964066,35.79991279815192',
    size: 'W: 40 - H: 30',
    price: '$ 1,200',
    image_url: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
    type: 'Unipole',
    is_available: 'Available Soon',
    available_until: '2026-09-01'
  }
];

// Helper to access LocalStorage state
function getLocalState(key, defaultData) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  } catch (e) {
    return defaultData;
  }
}

function setLocalState(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving local state:', e);
  }
}

// 1. Fetch Billboards from `billboards` table
export async function fetchBillboards() {
  // Strategy 1: Supabase JS SDK client
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('billboards').select('*');
      if (!error && data && data.length > 0) {
        return normalizeBillboards(data);
      }
      if (error) console.warn('Supabase JS Client error:', error.message);
    } catch (e) {
      console.warn('Supabase JS Client fetch failed, trying direct REST fetch:', e);
    }
  }

  // Strategy 2: Direct REST fetch to Supabase API
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/billboards?select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return normalizeBillboards(data);
      }
    } else {
      console.warn('Direct REST fetch returned status:', res.status);
    }
  } catch (e) {
    console.warn('Direct REST fetch exception:', e);
  }

  // Strategy 3: Local fallback dataset ONLY if Supabase server is completely unreachable
  let local = getLocalState('adeffect_billboards', null);
  if (!local) {
    setLocalState('adeffect_billboards', INITIAL_BILLBOARDS);
    local = INITIAL_BILLBOARDS;
  }
  return normalizeBillboards(local);
}

// 2. Submit Sign Up into `pending_users` table
export async function submitPendingUser(userData) {

  console.log(userData.user_name)
  
  const payload = {
    user_name: userData.user_name,
    business_name: userData.business_name,
    website: userData.website || '',
    phone_number: userData.phone_number,
    email: userData.email,
    location: userData.location || '',
    hear_about_us: userData.hear_about_us || [],
    created_at: new Date().toISOString()
  };

  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('pending_users').insert([payload]).select();
      if (!error) {
        saveLocalPendingUser(payload);
        return { success: true, data };
      }
      console.warn('Supabase insert pending_users warning:', error);
    } catch (e) {
      console.warn('Supabase insert pending_users exception:', e);
    }
  }

  // Fallback to local storage
  saveLocalPendingUser(payload);
  return { success: true, data: [payload] };
}

function saveLocalPendingUser(payload) {
  const list = getLocalState('adeffect_pending_users', []);
  list.push(payload);
  setLocalState('adeffect_pending_users', list);
}

// 3. Upload PDF Brief to Supabase Storage bucket `Briefs of Pending Requests`
export async function uploadBriefFile(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `${fileName}`;

  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.storage
        .from('Briefs of Pending Requests')
        .upload(filePath, file);

      if (!error && data) {
        const { data: publicUrlData } = sb.storage
          .from('Briefs of Pending Requests')
          .getPublicUrl(filePath);
          
        return { success: true, url: publicUrlData.publicUrl, filename: file.name };
      }
      console.warn('Supabase Storage upload warning:', error);
    } catch (e) {
      console.warn('Supabase Storage upload exception:', e);
    }
  }

  // Fallback: Create Object URL for preview + simulated public URL
  const blobUrl = URL.createObjectURL(file);
  return {
    success: true,
    url: blobUrl,
    filename: file.name,
    isLocalFallback: true
  };
}

// 4. Submit Booking Request into `pending_bookings` table
export async function submitPendingBooking(bookingData) {
  
  const user = getCurrentUser();

  const container = document.getElementById('performancesGrid');
  if (!container) return;

  const userId = user ? user.id : null;

  const payload = {
    user_id: user.id,
    user_email: bookingData.user_email,
    billboard_id: bookingData.billboard_id,
    start_time: bookingData.start_time,
    end_time: bookingData.end_time,
    brief_url: bookingData.brief_url,
    extra_services: bookingData.extra_services || [],
    status: 'In Review',
    created_at: new Date().toISOString()
  };

  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('pending_bookings').insert([payload]).select();
      if (!error) {
        saveLocalBooking(payload);
        return { success: true, data };
      }
      console.warn('Supabase insert pending_bookings warning:', error);
    } catch (e) {
      console.warn('Supabase insert pending_bookings exception:', e);
    }
  }

  // Save to local storage fallback
  saveLocalBooking(payload);
  return { success: true, data: [payload] };
}

function saveLocalBooking(payload) {
  const list = getLocalState('adeffect_pending_bookings', []);
  list.unshift(payload); // Newest first
  setLocalState('adeffect_pending_bookings', list);
}

// 5. Fetch Bookings for validation & dashboard display
export async function fetchPendingBookings(userEmail = null) {
  const sb = getSupabase();
  if (sb) {
    try {
      let query = sb.from('pending_bookings').select('*');
      if (userEmail) {
        query = query.eq('user_email', userEmail);
      }
      const { data, error } = await query;
      if (!error && data) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch pending_bookings error:', e);
    }
  }

  const list = getLocalState('adeffect_pending_bookings', []);
  if (userEmail) {
    return list.filter(b => b.user_email === userEmail);
  }
  return list;
}

// 6. Check Date Overlaps for a specific billboard against `bookings` and `pending_bookings` tables
export async function fetchConfirmedBookings(billboardId) {
  const sb = getSupabase();
  let confirmed = [];
  if (sb) {
    try {
      let query = sb.from('bookings').select('*');
      if (billboardId) {
        query = query.eq('billboard_id', billboardId);
      }
      const { data, error } = await query;
      if (!error && data) {
        confirmed = data;
      }
    } catch (e) {
      console.warn('Supabase fetch bookings error:', e);
    }
  }

  // Local fallback mock bookings if none found in Supabase
  if (confirmed.length === 0) {
    const localBookings = getLocalState('adeffect_confirmed_bookings', [
      {
        id: 101,
        client_id: 'user-sample-id',
        billboard_id: 'U002-A',
        start_time: '2026-09-01T00:00:00.000Z',
        end_time: '2026-09-15T00:00:00.000Z',
        is_active: true,
        created_at: '2026-08-01T00:00:00.000Z'
      }
    ]);
    confirmed = billboardId ? localBookings.filter(b => b.billboard_id === billboardId) : localBookings;
  }
  return confirmed;
}

export async function validateBookingDates(billboardId, startTimeStr, endTimeStr) {
  const pendingBookings = await fetchPendingBookings();
  const confirmedBookings = await fetchConfirmedBookings(billboardId);

  const start = new Date(startTimeStr).getTime();
  const end = new Date(endTimeStr).getTime();

  if (isNaN(start) || isNaN(end) || start >= end) {
    return { valid: false, message: 'Start date must be before end date.' };
  }

  // Combine pending and confirmed bookings for this billboard
  const allBookings = [
    ...pendingBookings.filter(b => b.billboard_id === billboardId && b.status !== 'Rejected'),
    ...confirmedBookings.filter(b => b.billboard_id === billboardId)
  ];

  for (const b of allBookings) {
    const bStart = new Date(b.start_time || b.start_date).getTime();
    const bEnd = new Date(b.end_time || b.end_date).getTime();

    if (!isNaN(bStart) && !isNaN(bEnd)) {
      // Overlap check: (StartA <= EndB) and (EndA >= StartB)
      if (start <= bEnd && end >= bStart) {
        return {
          valid: false,
          message: 'Selected timeframe overlaps with an existing booking for this billboard. Please choose another date range.'
        };
      }
    }
  }

  return { valid: true };
}

// 7. Fetch Active Bookings for Client Dashboard ("Track billboard performances")
/*export async function fetchActiveBookings(userId, userEmail = null) {
  const sb = getSupabase();
  let activeBookings = [];

  if (sb) {
    try {
      let query = sb.from('bookings').select('*, billboards(*)').eq('is_active', true);
      if (userId) {
        query = query.eq('client_id', userId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch active bookings error:', e);
    }
  }

    

  // Fallback local dataset for active bookings with joined billboard details
  const allBillboards = await fetchBillboards();
  const sampleBillboard = allBillboards.find(b => b.billboard_id === 'U002-A') || allBillboards[0];

  activeBookings = getLocalState('adeffect_active_bookings', [
    {
      id: 1,
      client_id: userId || 'current_user',
      billboard_id: sampleBillboard ? sampleBillboard.billboard_id : 'U002-A',
      is_active: true,
      start_time: '2026-08-01T00:00:00.000Z',
      end_time: '2026-08-31T00:00:00.000Z',
      impressions_per_week: 142500,
      billboards: sampleBillboard
    }
  ]);

  return activeBookings;
}*/

export async function fetchActiveBookings(userId = null) {
  const sb = getSupabase();

  // Return empty immediately if no valid user_id is passed
  if (!sb || !userId) {
    return [];
  }

  try {
    const { data, error } = await sb
      .from('bookings')
      .select('*, billboards(*)')
      .eq('is_active', true)
      .eq('user_id', userId);

    if (error) {
      console.error('Supabase fetch active bookings error:', error.message);
      return [];
    }

    return data || [];
  } catch (e) {
    console.warn('Supabase fetch active bookings exception:', e);
    return [];
  }
}

// 8. Fetch Quotations for Client Dashboard ("Quotations")
export async function fetchQuotations(userId, userEmail = null) {
  const sb = getSupabase();
  if (sb) {
    try {
      let query = sb.from('quotations').select('*');
      if (userId) {
        query = query.eq('client_id', userId);
      }
      const { data, error } = await query;
      if (!error && data) {
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch quotations error:', e);
    }
  }

  // Fallback local sample quotations matching table schema
  const localQuotations = getLocalState('adeffect_quotations', [
    {
      id: 501,
      created_at: new Date().toISOString(),
      client_id: userId || 'client-uuid-001',
      client_name: 'AdEffect Client',
      media_type: 'Outdoor Unipole',
      media_used: 'Backlit Vinyl Print',
      reference: 'U002-A',
      media_location: 'Bahsas, Tripoli Entrance',
      frequency: 1,
      period: '1 Month (Aug 2026)',
      printing_cost: 250.00,
      total_cost_wo_printing: 1000.00,
      total_cost_with_printing: 1250.00
    },
    {
      id: 502,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      client_id: userId || 'client-uuid-001',
      client_name: 'AdEffect Client',
      media_type: 'Megapole Network',
      media_used: 'Frontlit Flex Banner',
      reference: 'U002-B',
      media_location: 'Dam & Farz Highway',
      frequency: 2,
      period: '2 Months (Sep-Oct 2026)',
      printing_cost: 400.00,
      total_cost_wo_printing: 2400.00,
      total_cost_with_printing: 2800.00
    }
  ]);

  return localQuotations;
}
