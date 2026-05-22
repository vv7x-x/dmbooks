// Supabase Configuration for dm bookstore
const SUPABASE_URL = "https://vjibucksajumamngxcku.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ydyFxFJepey5ShxRX6FcMg_BGAYpWD1";

// Initialize the Supabase client and expose it as `window.supabase` (the runtime client)
// The CDN for @supabase/supabase-js exposes a global `supabase` helper with `createClient`.
const _create = (window.supabase && typeof window.supabase.createClient === 'function') ? window.supabase.createClient : (typeof createClient === 'function' ? createClient : null);
if (!_create) {
	console.error('Supabase SDK not found. Make sure the <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> is included before this file.');
} else {
	const client = _create(SUPABASE_URL, SUPABASE_ANON_KEY);
	// Expose the initialized client as window.supabase so other scripts can use it directly.
	window.supabase = client;
	// Also expose with a stable name for older modules that expect `supabase` const
	console.log('Supabase client initialized successfully.');
}
