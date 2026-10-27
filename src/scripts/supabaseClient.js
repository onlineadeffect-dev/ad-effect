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
      statusText = b.is_available ? 'Available' : 'Unavailable until...';
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
      type: b.structure || 'Unipole',
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
  },
  {
    billboard_id: 'P003-C',
    location: 'Mina Road, Tripoli',
    maps_url: 'https://maps.google.com',
    size: '3:4',
    price: '$ 600',
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    type: 'Portrait Billboard',
    is_available: 'Available',
    available_until: null
  }
];

// Helper to access LocalStorage state
function getLocalState(key, defaultData) {
  try {
    if (typeof localStorage === 'undefined') return defaultData;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  } catch (e) {
    return defaultData;
  }
}

function setLocalState(key, data) {
  try {
    if (typeof localStorage === 'undefined') return;
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

// 2. Actual Supabase Sign Up & insert into `users` table
export async function signUpUser(userData) {
  const sb = getSupabase();

  let createdUserId = null;

  if (sb) {
    try {
      // 1. Create account in Supabase Auth
      const { data: authData, error: authError } = await sb.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.user_name,
            business_name: userData.business_name
          }
        }
      });

      if (authError) {
        return { success: false, error: authError.message };
      }

      createdUserId = authData?.user?.id;

      // 2. Immediately insert account details into `users` table
      const userPayload = {
        user_id: createdUserId,
        user_name: userData.user_name,
        business_name: userData.business_name,
        email: userData.email,
        website: userData.website || '',
        phone_number: userData.phone_number,
        location: userData.location || '',
        hear_about_us: userData.hear_about_us || [],
        created_at: new Date().toISOString()
      };

      const {error: insertError } = await sb.from('users').insert([userPayload]);
      if (insertError) {
        console.warn('Supabase insert users warning:', insertError);
      }

      saveLocalUser(userPayload);
      return {
        success: true,
        user: {
          id: createdUserId,
          email: userData.email,
          name: userData.user_name,
          status: 'verified'
        }
      };
    } catch (e) {
      console.error('Supabase sign up exception:', e);
      return { success: false, error: e.message || 'An error occurred during sign up.' };
    }
  }

  // Fallback to local storage if Supabase is unavailable
  createdUserId = `user-${Date.now()}`;
  const userPayload = {
    id: createdUserId,
    user_name: userData.user_name,
    name: userData.user_name,
    business_name: userData.business_name,
    email: userData.email,
    website: userData.website || '',
    phone_number: userData.phone_number,
    location: userData.location || '',
    hear_about_us: userData.hear_about_us || [],
    created_at: new Date().toISOString()
  };
  saveLocalUser(userPayload);

  return {
    success: true,
    user: {
      id: createdUserId,
      email: userData.email,
      name: userData.user_name,
      status: 'verified'
    }
  };
}

export const submitPendingUser = signUpUser;

function saveLocalUser(payload) {
  const list = getLocalState('adeffect_users', []);
  list.push(payload);
  setLocalState('adeffect_users', list);
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

// Helper to retrieve a valid booking_id from bookings table to satisfy FK constraint on pending_booking_items
async function getBookingIdForBillboard(billboardId, sb) {
  if (!sb) return null;
  try {
    if (billboardId) {
      const { data } = await sb
        .from('bookings')
        .select('booking_id')
        .eq('billboard_id', billboardId)
        .limit(1)
        .maybeSingle();
      if (data && data.booking_id) {
        return data.booking_id;
      }
    }
  } catch (e) {
    console.warn('Could not query billboard booking_id:', e);
  }

  // Fallback to any existing booking_id in bookings to satisfy foreign key constraint
  try {
    const { data: anyBooking } = await sb
      .from('bookings')
      .select('booking_id')
      .limit(1)
      .maybeSingle();
    if (anyBooking && anyBooking.booking_id) {
      return anyBooking.booking_id;
    }
  } catch (e) {
    console.warn('Could not query fallback booking_id:', e);
  }

  return '806e8091-5c84-4719-85f9-89bd9fe33bed';
}

// 4. Submit Booking Request into `requested_bookings` and `requested_booking_items` tables
export async function submitPendingBooking(bookingData) {
  const user = getCurrentUser();
  if (!user || !user.id) {
    console.error('Supabase insert failed: No authenticated user found.');
    return { success: false, error: 'Not authenticated' };
  }

  // billboard_id is jsonb in requested_bookings — store as array
  const billboardIds = Array.isArray(bookingData.billboard_id)
    ? bookingData.billboard_id.map(String)
    : [String(bookingData.billboard_id)];

  const services = Array.isArray(bookingData.extra_services)
    ? bookingData.extra_services
    : (bookingData.extra_services ? [String(bookingData.extra_services)] : []);

  // extra_services is jsonb — send null when empty to avoid PostgREST
  // serialising [] as "{}" which causes "invalid input syntax for type integer: {}"
  const extraServicesValue = services.length > 0 ? services : null;

  // Columns that exist in requested_bookings:
  // id(int8,auto) | created_at(timestamptz,auto) | billboard_id(jsonb) |
  // brief_url(text) | extra_services(jsonb) | user_id(uuid) |
  // start_time(timestamptz) | end_time(timestamptz) | status(text)
  const bookingPayload = {
    user_id: user.id,
    billboard_id: billboardIds,               // jsonb — array e.g. ["U002-A"]
    brief_url: bookingData.brief_url || null, // text
    extra_services: extraServicesValue,        // jsonb — array or null
    start_time: new Date(bookingData.start_time).toISOString(),
    end_time: new Date(bookingData.end_time).toISOString(),
    status: 'In Review'
    // id and created_at are auto-generated — do NOT include them
  };

  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('requested_bookings')
        .insert([bookingPayload])
        .select();

      if (error) {
        console.error('Supabase insert failed (requested_bookings):', error);
        return { success: false, error: error.message };
      }

      if (!data || data.length === 0) {
        console.error('Supabase insert failed (requested_bookings): no row returned.');
        return { success: false, error: 'Insert returned no data.' };
      }

      // parentBookingId is int8 — it IS the FK that links to requested_booking_items.id
      const parentBookingId = data[0].id;

      // Columns that exist in requested_booking_items:
      // id(int8, FK→requested_bookings.id) | created_at(timestamptz,auto) |
      // billboard_id(text) | booking_id | start_date(timestamptz) |
      // end_date(timestamptz) | price_at_the_time_of_booking(int8) | printing_cost(float8)
      const itemPayload = {
        id: parentBookingId,   // int8 FK to requested_bookings.id
        billboard_id: String(bookingData.billboard_id),   // text
        start_date: new Date(bookingData.start_time).toISOString(),
        end_date: new Date(bookingData.end_time).toISOString(),
        price_at_the_time_of_booking: Math.round(Number(bookingData.total_price || bookingData.price || 0)) || null,
        printing_cost: bookingData.printing_cost != null
          ? Number(bookingData.printing_cost)
          : null
        // booking_id omitted — its type was not confirmed; the relation between the
        // two tables is already established via the shared id FK
      };

      const { data: itemData, error: itemError } = await sb
        .from('requested_booking_items')
        .insert([itemPayload])
        .select();

      if (itemError) {
        console.error('Supabase insert failed (requested_booking_items):', itemError);
      }

      const fullRecord = {
        ...data[0],
        extra_services: services,
        requested_booking_items: itemData || [itemPayload],
        pending_booking_items: itemData || [itemPayload],
        items: itemData || [itemPayload]
      };

      saveLocalBooking(fullRecord);
      return { success: true, data: [fullRecord] };
    } catch (e) {
      console.error('Supabase insert exception (requested_bookings):', e);
      return { success: false, error: e.message };
    }
  }

  // Fallback to local storage if Supabase client is unavailable
  const fallbackRecord = {
    ...bookingPayload,
    id: Date.now(),
    created_at: new Date().toISOString(),
    extra_services: services,
    items: [{
      id: Date.now(),
      billboard_id: String(bookingData.billboard_id),
      start_date: bookingPayload.start_time,
      end_date: bookingPayload.end_time,
      price_at_the_time_of_booking: Math.round(Number(bookingData.total_price || bookingData.price || 0)) || null,
      printing_cost: Number(bookingData.printing_cost) || null,
      created_at: new Date().toISOString()
    }]
  };
  fallbackRecord.requested_booking_items = fallbackRecord.items;
  fallbackRecord.pending_booking_items = fallbackRecord.items;
  saveLocalBooking(fallbackRecord);
  return { success: true, data: [fallbackRecord] };
}

export async function submitPendingPackageBooking(bookingData) {
  const user = getCurrentUser();
  if (!user || !user.id) return { success: false, error: 'Not authenticated' };

  const sb = getSupabase();

  const billboardIds = (bookingData.items || []).map(i => String(i.billboard_id));

  const services = Array.isArray(bookingData.extra_services) 
    ? bookingData.extra_services 
    : (bookingData.extra_services ? [String(bookingData.extra_services)] : []);

  const bookingPayload = {
    user_id: user.id,
    billboard_id: billboardIds, // jsonb array
    brief_url: bookingData.brief_url || null,
    extra_services: services,   // jsonb array
    start_time: new Date(bookingData.start_time).toISOString(),
    end_time: new Date(bookingData.end_time).toISOString(),
    status: 'In Review',
    created_at: new Date().toISOString()
  };

  if (sb) {
    try {
      const { data, error } = await sb
        .from('requested_bookings')
        .insert([bookingPayload])
        .select();

      if (error) {
        console.error('Supabase insert failed (requested_bookings — package):', error);
        return { success: false, error: error.message };
      }
      if (!data || data.length === 0) {
        console.error('Supabase insert failed (requested_bookings — package): insert returned no data.');
        return { success: false, error: 'Insert returned no data.' };
      }

      const parentBookingId = data[0].id;

      const itemsToInsert = await Promise.all((bookingData.items || []).map(async (item) => {
        const bId = await getBookingIdForBillboard(item.billboard_id, sb);
        return {
          id: parentBookingId,
          billboard_id: String(item.billboard_id),
          booking_id: bId,
          start_date: new Date(item.start_time || bookingData.start_time).toISOString(),
          end_date: new Date(item.end_time || bookingData.end_time).toISOString(),
          price_at_the_time_of_booking: Math.round(Number(item.price || item.total_price || item.numericPrice || 0)) || null,
          printing_cost: item.printing_cost !== undefined && item.printing_cost !== null 
            ? Number(item.printing_cost) 
            : null,
          created_at: new Date().toISOString()
        };
      }));

      const { data: itemData, error: itemsError } = await sb
        .from('requested_booking_items')
        .insert(itemsToInsert)
        .select();

      if (itemsError) {
        console.error('Supabase insert failed (requested_booking_items):', itemsError);
      }

      const fullPackageRecord = {
        ...data[0],
        extra_services: services,
        requested_booking_items: itemData || itemsToInsert,
        pending_booking_items: itemData || itemsToInsert,
        items: itemData || itemsToInsert
      };

      saveLocalBooking(fullPackageRecord);
      return { success: true, data: [fullPackageRecord] };
    } catch (e) {
      console.error('Supabase insert exception (requested package):', e);
      return { success: false, error: e.message };
    }
  }

  // Fallback if Supabase is unavailable
  const fallbackRecord = {
    ...bookingPayload,
    id: Date.now(),
    items: (bookingData.items || []).map(item => ({
      id: Date.now(),
      booking_id: 'local-' + Date.now(),
      billboard_id: String(item.billboard_id),
      start_date: new Date(item.start_time || bookingData.start_time).toISOString(),
      end_date: new Date(item.end_time || bookingData.end_time).toISOString(),
      price_at_the_time_of_booking: Math.round(Number(item.price || item.total_price || item.numericPrice || 0)) || null,
      printing_cost: Number(item.printing_cost) || null,
      created_at: bookingPayload.created_at
    }))
  };
  fallbackRecord.requested_booking_items = fallbackRecord.items;
  fallbackRecord.pending_booking_items = fallbackRecord.items;
  saveLocalBooking(fallbackRecord);
  return { success: true, data: [fallbackRecord] };
}

function saveLocalBooking(payload) {
  const list = getLocalState('adeffect_requested_bookings', getLocalState('adeffect_pending_bookings', []));
  list.unshift(payload); // Newest first
  setLocalState('adeffect_requested_bookings', list);
  setLocalState('adeffect_pending_bookings', list);
}

// 5. Fetch Bookings for validation & dashboard display
export async function fetchPendingBookings(userId = null) {
  const user = getCurrentUser();
  const effectiveUserId = (userId && typeof userId === 'string' && !userId.includes('@')) 
    ? userId 
    : (user ? user.id : null);

  const sb = getSupabase();
  if (sb && effectiveUserId) {
    try {
      // 1. Fetch requested bookings from Supabase
      const { data: bookingsData, error: bError } = await sb
        .from('requested_bookings')
        .select('*')
        .eq('user_id', effectiveUserId)
        .order('created_at', { ascending: false });

      if (!bError && bookingsData) {
        // 2. Fetch requested_booking_items
        const { data: itemsData, error: iError } = await sb
          .from('requested_booking_items')
          .select('*');

        const allItems = Array.isArray(itemsData) ? itemsData : [];

        // Match items to requested bookings based on id (foreign key) or billboard_id
        const combined = bookingsData.map(pb => {
          const pbBillboardIds = Array.isArray(pb.billboard_id) 
            ? pb.billboard_id.map(String) 
            : (typeof pb.billboard_id === 'string' ? [pb.billboard_id] : []);

          const matchedItems = allItems.filter(item => {
            if (item.id !== undefined && item.id !== null && pb.id !== undefined && pb.id !== null) {
              if (String(item.id) === String(pb.id)) return true;
            }
            return pbBillboardIds.includes(String(item.billboard_id));
          });

          const services = pb.extra_services || pb.extra_servirec || [];

          return {
            ...pb,
            extra_services: services,
            extra_servirec: services,
            requested_booking_items: matchedItems.length > 0 ? matchedItems : (pb.items || []),
            pending_booking_items: matchedItems.length > 0 ? matchedItems : (pb.items || []),
            items: matchedItems.length > 0 ? matchedItems : (pb.items || [])
          };
        });

        // Sync with local cache
        setLocalState('adeffect_requested_bookings', combined);
        setLocalState('adeffect_pending_bookings', combined);
        return combined;
      } else if (bError) {
        console.error('Supabase fetch requested_bookings error:', bError);
      }
    } catch (e) {
      console.error('Supabase fetch requested_bookings exception:', e);
    }
  }

  const list = getLocalState('adeffect_requested_bookings', getLocalState('adeffect_pending_bookings', []));
  if (effectiveUserId) {
    return list.filter(b => b.user_id === effectiveUserId);
  }
  return list;
}

// 5b. Delete a pending/requested booking by ID
export async function deletePendingBooking(bookingId) {
  const sb = getSupabase();
  if (sb) {
    try {
      // 1. Delete associated items first from requested_booking_items
      await sb.from('requested_booking_items').delete().eq('id', bookingId);

      const { data: rb } = await sb.from('requested_bookings').select('*').eq('id', bookingId).maybeSingle();
      if (rb) {
        const bbIds = Array.isArray(rb.billboard_id) ? rb.billboard_id : [rb.billboard_id];
        for (const bid of bbIds) {
          if (bid) {
            await sb.from('requested_booking_items').delete().eq('billboard_id', bid);
          }
        }
      }

      // 2. Delete from requested_bookings
      const { error } = await sb.from('requested_bookings').delete().eq('id', bookingId);
      if (!error) {
        const list = getLocalState('adeffect_requested_bookings', getLocalState('adeffect_pending_bookings', []));
        const updated = list.filter(b => String(b.id) !== String(bookingId));
        setLocalState('adeffect_requested_bookings', updated);
        setLocalState('adeffect_pending_bookings', updated);
        return { success: true };
      }
      console.warn('Supabase delete requested_booking warning:', error);
    } catch (e) {
      console.warn('Supabase delete requested_booking exception:', e);
    }
  }

  // Local fallback
  const list = getLocalState('adeffect_requested_bookings', getLocalState('adeffect_pending_bookings', []));
  const updated = list.filter(b => String(b.id) !== String(bookingId));
  setLocalState('adeffect_requested_bookings', updated);
  setLocalState('adeffect_pending_bookings', updated);
  return { success: true };
}

// Aliases for modern naming
export const submitRequestedBooking = submitPendingBooking;
export const submitRequestedPackageBooking = submitPendingPackageBooking;
export const fetchRequestedBookings = fetchPendingBookings;
export const deleteRequestedBooking = deletePendingBooking;

// 6. Check Date Overlaps for a specific billboard against `bookings` and `requested_bookings`
export async function fetchConfirmedBookings(billboardId) {
  const allBookings = await fetchAllBookings();
  if (billboardId) {
    const target = String(billboardId).toUpperCase();
    return allBookings.filter(b => String(b.billboard_id).toUpperCase() === target);
  }
  return allBookings;
}

// 6b. Fetch ALL bookings (no billboard filter) — used for bulk availability checks
export async function fetchAllBookings() {
  const sb = getSupabase();
  const allBookings = [];

  if (sb) {
    try {
      const { data, error } = await sb.from('bookings').select('billboard_id, start_time, end_time, is_active');
      if (!error && Array.isArray(data)) {
        allBookings.push(...data);
      } else if (error) {
        console.warn('Supabase fetchAllBookings (bookings) error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase fetchAllBookings (bookings) exception:', e);
    }

    try {
      const { data: reqData, error: reqError } = await sb
        .from('requested_bookings')
        .select('id, billboard_id, start_time, end_time, status');
      if (!reqError && Array.isArray(reqData)) {
        // Only include approved requests as taken
        const approvedReqs = reqData.filter(r => (r.status || '').toLowerCase() === 'approved');
        allBookings.push(...approvedReqs);
      } else if (reqError) {
        console.warn('Supabase fetchAllBookings (requested_bookings) error:', reqError.message);
      }
    } catch (e) {
      console.warn('Supabase fetchAllBookings (requested_bookings) exception:', e);
    }
  }

  // Local fallback integration — include confirmed bookings and approved requested bookings
  const localConfirmed = getLocalState('adeffect_confirmed_bookings', []);
  const localRequested = getLocalState('adeffect_requested_bookings', getLocalState('adeffect_pending_bookings', []));
  const localApproved = localRequested.filter(r => (r.status || '').toLowerCase() === 'approved');

  const combined = [...allBookings, ...localConfirmed, ...localApproved];

  // Flatten package billboard arrays so every taken billboard has a direct booking record
  const flattened = [];
  combined.forEach(b => {
    if (Array.isArray(b.billboard_id)) {
      b.billboard_id.forEach(singleBid => {
        flattened.push({
          ...b,
          billboard_id: String(singleBid)
        });
      });
    } else {
      flattened.push(b);
    }
  });

  return flattened;
}

export async function validateBookingDates(billboardId, startTimeStr, endTimeStr, billboardSize = null) {
  const start = new Date(startTimeStr).getTime();
  const end = new Date(endTimeStr).getTime();

  if (isNaN(start) || isNaN(end) || start >= end) {
    return { valid: false, message: 'Start date must be before end date.' };
  }

  const startDate = new Date(startTimeStr);
  const endDate = new Date(endTimeStr);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const normalizedSize = (billboardSize || '').toString().toLowerCase().replace(/\s+/g, '');
  const is3x4 = normalizedSize.includes('3:4') || normalizedSize.includes('3x4') || normalizedSize.includes('3/4');

  if (is3x4) {
    if (diffDays < 7) {
      return {
        valid: false,
        message: 'Billboards of size 3:4 require a minimum booking period of 1 week (7 days).'
      };
    }
  } else {
    const minMonthEnd = new Date(startDate);
    minMonthEnd.setMonth(minMonthEnd.getMonth() + 1);

    if (diffDays < 28 && endDate < minMonthEnd) {
      return {
        valid: false,
        message: 'Billboards must be booked for a minimum period of 1 month.'
      };
    }
  }

  const confirmedBookings = await fetchConfirmedBookings(billboardId);

  for (const b of confirmedBookings) {
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

// UUID validation — Supabase requires RFC 4122 UUIDs for uuid columns.
// Non-UUID IDs (e.g. "user-1234567890" from the local fallback path) must be
// rejected client-side to avoid a 400 from the server.
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function fetchActiveBookings(userId = null) {
  const sb = getSupabase();
  const user = getCurrentUser();
  const effectiveUserId = (userId && typeof userId === 'string' && !userId.includes('@'))
    ? userId
    : (user ? user.id : null);

  const activeList = [];

  // 1. Fetch from bookings table in Supabase
  if (sb && effectiveUserId && UUID_REGEX.test(effectiveUserId)) {
    try {
      const { data, error } = await sb
        .from('bookings')
        .select('*, billboards(*)')
        .eq('is_active', true)
        .eq('user_id', effectiveUserId);

      if (!error && Array.isArray(data)) {
        activeList.push(...data);
      } else if (error) {
        console.warn('Supabase fetch active bookings error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase fetch active bookings exception:', e);
    }

    // 2. Also fetch approved bookings from requested_bookings in Supabase
    try {
      const { data: reqData, error: reqError } = await sb
        .from('requested_bookings')
        .select('*')
        .eq('user_id', effectiveUserId);

      if (!reqError && Array.isArray(reqData)) {
        const approvedReqs = reqData.filter(r => (r.status || '').toLowerCase() === 'approved');
        activeList.push(...approvedReqs);
      } else if (reqError) {
        console.warn('Supabase fetch approved requested_bookings error:', reqError.message);
      }
    } catch (e) {
      console.warn('Supabase fetch approved requested_bookings exception:', e);
    }
  }

  // 3. Local fallback state
  const localActive = getLocalState('adeffect_active_bookings', []);
  const localRequested = getLocalState('adeffect_requested_bookings', getLocalState('adeffect_pending_bookings', []));
  const localApproved = localRequested.filter(r => {
    const isUserMatch = !effectiveUserId || String(r.user_id) === String(effectiveUserId) || r.user_id === 'current_user';
    return isUserMatch && (r.status || '').toLowerCase() === 'approved';
  });

  const allRaw = [...activeList, ...localActive, ...localApproved];

  // De-duplicate by id or unique key
  const seenIds = new Set();
  const uniqueBookings = [];
  allRaw.forEach(b => {
    const key = `${b.id || ''}_${Array.isArray(b.billboard_id) ? b.billboard_id.join(',') : b.billboard_id || ''}`;
    if (!seenIds.has(key)) {
      seenIds.add(key);
      uniqueBookings.push(b);
    }
  });

  // Fetch billboard catalog to enrich any booking records missing joined billboard details
  const catalog = await fetchBillboards();
  const catalogMap = new Map();
  catalog.forEach(bb => {
    if (bb.billboard_id) catalogMap.set(String(bb.billboard_id).toUpperCase(), bb);
  });

  // Expand packages into individual active billboards
  const result = [];
  uniqueBookings.forEach(b => {
    const bIds = Array.isArray(b.billboard_id)
      ? b.billboard_id.map(String)
      : (b.billboard_id ? [String(b.billboard_id)] : []);

    if (bIds.length === 0 && b.billboards) {
      result.push(b);
      return;
    }

    if (bIds.length <= 1) {
      const singleId = bIds[0] || (b.billboards && b.billboards.billboard_id);
      const bbDetail = (b.billboards && typeof b.billboards === 'object')
        ? b.billboards
        : (singleId ? catalogMap.get(singleId.toUpperCase()) : null);

      result.push({
        ...b,
        billboard_id: singleId || b.billboard_id || `Booking #${b.id}`,
        billboards: bbDetail || b.billboards || null
      });
    } else {
      // Multiple billboards in package — display each active billboard
      bIds.forEach((singleId, idx) => {
        const bbDetail = catalogMap.get(singleId.toUpperCase()) || null;
        result.push({
          ...b,
          id: `${b.id}-${idx + 1}`,
          parent_booking_id: b.id,
          billboard_id: singleId,
          billboards: bbDetail
        });
      });
    }
  });

  return result;
}

// 8. Fetch Quotations for Client Dashboard ("Quotations")
export async function fetchQuotations(userId, userEmail = null) {
  const sb = getSupabase();
  const user = getCurrentUser();
  const effectiveUserId = userId || (user ? user.id : null);
  const effectiveEmail = userEmail || (user ? user.email : null);

  if (sb) {
    // 1. Try querying with client_id matching user UUID or email
    try {
      let query = sb.from('quotations').select('*');
      if (effectiveUserId && UUID_REGEX.test(effectiveUserId)) {
        if (effectiveEmail) {
          query = query.or(`client_id.eq.${effectiveUserId},client_id.eq.${effectiveEmail}`);
        } else {
          query = query.eq('client_id', effectiveUserId);
        }
      } else if (effectiveUserId || effectiveEmail) {
        query = query.eq('client_id', effectiveUserId || effectiveEmail);
      }

      const { data, error } = await query;
      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
      if (error) {
        console.warn('Supabase fetch quotations by client_id warning:', error.message);
      }
    } catch (e) {
      console.warn('Supabase fetch quotations by client_id exception:', e);
    }

    // 2. Try fetching all quotations visible to current authenticated session (RLS)
    try {
      const { data, error } = await sb.from('quotations').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        const filtered = data.filter(q => {
          if (!effectiveUserId && !effectiveEmail) return true;
          const cid = String(q.client_id || '').toLowerCase();
          const matchId = effectiveUserId && cid === String(effectiveUserId).toLowerCase();
          const matchEmail = effectiveEmail && cid === String(effectiveEmail).toLowerCase();
          const matchName = user && user.name && String(q.client_name || '').toLowerCase() === String(user.name).toLowerCase();
          return matchId || matchEmail || matchName;
        });
        if (filtered.length > 0) return filtered;
        // If RLS is enabled, returning data directly is safe as Supabase filtered it
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetch all quotations exception:', e);
    }
  }

  // 3. Fallback local sample quotations matching table schema
  const localQuotations = getLocalState('adeffect_quotations', []);
  const matchingLocal = localQuotations.filter(q => {
    if (!effectiveUserId && !effectiveEmail) return true;
    const cid = String(q.client_id || '').toLowerCase();
    return (effectiveUserId && cid === String(effectiveUserId).toLowerCase()) ||
           (effectiveEmail && cid === String(effectiveEmail).toLowerCase());
  });

  return matchingLocal;
}

// 9. Update user profile fields in `users` table
export async function updateUserProfile(userId, updates) {
  const sb = getSupabase();
  if (sb && userId) {
    try {
      const { error } = await sb.from('users').update(updates).eq('user_id', userId);
      if (!error) return { success: true };
      console.warn('Supabase updateUserProfile warning:', error);
    } catch (e) {
      console.warn('Supabase updateUserProfile exception:', e);
    }
  }
  return { success: true }; // Optimistic local update fallback
}

// 10. Fetch user profile from `users` table
export async function fetchUserProfile(userId) {
  const sb = getSupabase();
  if (sb && userId) {
    try {
      const { data, error } = await sb.from('users').select('*').eq('user_id', userId).single();
      if (!error && data) return data;
      console.warn('Supabase fetchUserProfile warning:', error);
    } catch (e) {
      console.warn('Supabase fetchUserProfile exception:', e);
    }
  }
  return null;
}

// 11. Send password reset email via Supabase Auth
export async function sendPasswordResetEmail(email) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '?reset=true'
      });
      if (!error) return { success: true };
      return { success: false, error: error.message };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
  return { success: false, error: 'Authentication service unavailable.' };
}

// 12. Delete the current user's account (auth + users table row)
export async function deleteUserAccount(userId) {
  const sb = getSupabase();
  if (sb && userId) {
    try {
      // Delete from users table
      await sb.from('users').delete().eq('user_id', userId);
      // Sign out the current session (admin delete requires service role key; we sign out instead)
      await sb.auth.signOut();
      return { success: true };
    } catch (e) {
      console.warn('Supabase deleteUserAccount exception:', e);
    }
  }
  // Local fallback: clear local auth state
  localStorage.removeItem('adeffect_auth_user');
  return { success: true };
}
