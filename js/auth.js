// Basic Supabase auth helpers used by the auth and account pages.
const supabase = window.supabase || createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function authSignUp(e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // If signup returned a user (and session), try to create a profiles row for the user
    const userId = data?.user?.id || (data && data.id) || null;
    if (userId) {
      try {
        await supabase.from('profiles').insert([{ id: userId, full_name: null }]);
      } catch (e) {
        // ignore profile insert errors (may be created server-side)
        console.warn('profile insert after signup failed:', e.message || e);
      }
    }

    alert('تم إرسال رابط تأكيد البريد (أو تم إنشاء الحساب). تحقق من صندوق الرسائل إذا لزم الأمر.');
    window.location.href = '/auth/login.html';
  } catch (err) { console.error(err); alert(err.message || err); }
}

async function authSignIn(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // Redirect to account page
    window.location.href = '/account/profile.html';
  } catch (err) { console.error(err); alert(err.message || err); }
}

async function authSignOut(){
  try { await supabase.auth.signOut(); window.location.href = '/'; } catch(e){console.error(e);} 
}

async function authSendReset(e){
  e.preventDefault();
  const email = document.getElementById('resetEmail').value.trim();
  try{
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin+'/auth/login.html' });
    if (error) throw error;
    alert('تم إرسال رابط استعادة كلمة المرور');
  } catch(err){ console.error(err); alert(err.message || err); }
}

// Profile helpers
async function loadProfile(){
  try{
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { window.location.href = '/auth/login.html'; return; }
    const user = session.user;
    document.getElementById('profileEmail').innerText = user.email;
    // try fetch extra profile from 'profiles' if exists
    const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    if (!error && data) { document.getElementById('profileName').value = data.full_name || ''; }
  } catch(err){ console.error(err); }
}

async function updateProfile(){
  try{
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { alert('غير مسجل'); return; }
    const user = session.user;
    const full_name = document.getElementById('profileName').value.trim();
    // upsert into profiles
    const { error } = await supabase.from('profiles').upsert({ id: user.id, full_name });
    if (error) throw error;
    alert('تم التحديث');
  } catch(err){ console.error(err); alert(err.message || err); }
}

// Auto-run on profile/orders pages
document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.startsWith('/account/profile.html')) loadProfile();
  if (location.pathname.startsWith('/account/orders.html')) loadUserOrders();
});

async function loadUserOrders() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            window.location.href = "/auth/login.html";
            return;
        }
        const user = session.user;
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        const container = document.getElementById("userOrders");
        if (error) throw error;

        if (!data || data.length === 0) {
            container.innerHTML = `
                <div style="text-align:center; padding: 40px 20px; color: var(--ink-muted);">
                    <i class="fa-solid fa-box-open fa-3x" style="margin-bottom:16px; opacity:0.3;"></i>
                    <p>لا توجد طلبات سابقة حتى الآن.</p>
                </div>`;
            return;
        }

        const statusMap = {
            "pending": { text: "قيد المراجعة", class: "status-pending" },
            "processing": { text: "جاري التجهيز", class: "status-processing" },
            "shipped": { text: "تم الشحن", class: "status-shipped" },
            "delivered": { text: "تم التوصيل", class: "status-delivered" },
            "cancelled": { text: "ملغي", class: "status-cancelled" }
        };

        container.innerHTML = `
            <div class="orders-list">
                ${data.map(o => {
                    const status = statusMap[o.status] || { text: o.status, class: "" };
                    const date = new Date(o.created_at).toLocaleDateString("ar-EG", {
                        year: "numeric", month: "long", day: "numeric"
                    });
                    return `
                    <div class="order-card-fancy">
                        <div class="order-card-header">
                            <span class="order-id">طلب رقم: #${o.id.substring(0, 8)}</span>
                            <span class="order-status-badge ${status.class}">${status.text}</span>
                        </div>
                        <div class="order-card-body">
                            <div class="order-info-item">
                                <i class="fa-solid fa-calendar-day"></i>
                                <span>${date}</span>
                            </div>
                            <div class="order-info-item">
                                <i class="fa-solid fa-wallet"></i>
                                <span>الإجمالي: <strong>${(parseFloat(o.total_price) + parseFloat(o.shipping_cost)).toFixed(2)} ج.م</strong></span>
                            </div>
                        </div>
                    </div>`;
                }).join("")}
            </div>`;
    } catch (err) {
        console.error("Error loading user orders:", err);
    }
}
