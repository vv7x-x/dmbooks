// Translations for Checkout Page
const translations = {
    ar: {
        pageTitle: "dm | إتمام الشراء",
        navHome: "الرئيسية",
        navCatalog: "كتالوج الكتب",
        navAdmin: "لوحة التحكم",
        btnBack: "العودة للتسوق",
        shippingTitle: "تفاصيل الشحن والتوصيل",
        lblFullName: "الاسم الكامل للعميل *",
        phFullName: "أدخل اسمك ثلاثي أو رباعي",
        lblPhone: "رقم الهاتف (أساسي للتأكيد) *",
        phPhone: "مثال: 01000000000",
        lblGovernorate: "المحافظة *",
        optSelectGov: "اختر المحافظة",
        lblAddress: "العنوان بالتفصيل *",
        phAddress: "الشارع، رقم المبنى، الدور، الشقة",
        lblNotes: "ملاحظات إضافية (اختياري)",
        phNotes: "مواعيد التوصيل المفضلة، علامة مميزة...",
        lblPaymentTitle: "الدفع عند الاستلام (COD)",
        lblPaymentDesc: "ستقوم بالدفع نقداً لمندوب الشحن فور استلام طلبك.",
        btnPlaceOrder: "<i class='fa-solid fa-circle-check'></i> تأكيد الطلب وإرسال",
        summaryTitle: "ملخص طلبك",
        lblSubtotal: "الإجمالي الفرعي:",
        lblShipping: "تكلفة التوصيل:",
        lblTotal: "الإجمالي الكلي:",
        currency: "ج.م",
        successTitle: "تم إرسال طلبك بنجاح!",
        successDesc: "شكراً لتسوقك من dm. لقد تم تسجيل طلبك وسيتواصل معك فريق خدمة العملاء قريباً جداً لتأكيد الشحن وتوصيله إلى عنوانك.",
        successOrderIDLabel: "رقم الطلب (ORDER ID):",
        successHomeBtn: "<i class='fa-solid fa-house'></i> العودة للرئيسية",
        cartEmptyAlert: "سلة المشتريات فارغة! لا يمكن إتمام الشراء.",
        orderSubmitError: "حدث خطأ أثناء إرسال طلبك. يرجى المحاولة لاحقاً.",
        submitting: "<i class='fa-solid fa-spinner fa-spin'></i> جاري إرسال الطلب...",
        
        govCairo: "القاهرة",
        govGiza: "الجيزة",
        govAlex: "الإسكندرية",
        govDelta: "الدلتا والقناة (طنطا، المنصورة، السويس...)",
        govUpper: "الصعيد (المنيا، أسيوط، سوهاج...)",
        govRemote: "المناطق النائية (البحر الأحمر، مطروح...)",
        
        footerAbout: "بوابتك لعالم المعرفة والقصص الملهمة. نوفر تشكيلة مميزة من الكتب العربية والإنجليزية التي تُثري عقول القراء في جميع أنحاء الوطن العربي.",
        footerQuickLinks: "روابط سريعة",
        footerLinkHome: "الرئيسية",
        footerLinkCatalog: "كتالوج الكتب",
        footerLinkAdmin: "لوحة الأدمن",
        footerCategoriesTitle: "التصنيفات",
        footerContactTitle: "تواصل معنا",
        footerLocation: "القاهرة، جمهورية مصر العربية",
        footerCopyright: "© 2026 مكتبة dm. جميع الحقوق محفوظة.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> الدفع عند الاستلام في جميع المحافظات"
    },
    en: {
        pageTitle: "dm | Checkout",
        navHome: "Home",
        navCatalog: "Catalog",
        navAdmin: "Admin",
        btnBack: "Back to Shopping",
        shippingTitle: "Shipping & Delivery Details",
        lblFullName: "Full Name *",
        phFullName: "Enter your full name",
        lblPhone: "Phone Number (for confirmation) *",
        phPhone: "e.g., 01000000000",
        lblGovernorate: "Governorate *",
        optSelectGov: "Select your governorate",
        lblAddress: "Detailed Address *",
        phAddress: "Street name, building, floor, apartment",
        lblNotes: "Additional Notes (optional)",
        phNotes: "Preferred delivery timing, landmarks...",
        lblPaymentTitle: "Cash on Delivery (COD)",
        lblPaymentDesc: "You will pay cash to the shipping representative upon receiving your order.",
        btnPlaceOrder: "<i class='fa-solid fa-circle-check'></i> Confirm & Place Order",
        summaryTitle: "Order Summary",
        lblSubtotal: "Subtotal:",
        lblShipping: "Shipping Cost:",
        lblTotal: "Order Total:",
        currency: "EGP",
        successTitle: "Order Placed Successfully!",
        successDesc: "Thank you for shopping at dm. Your order has been placed. Our customer service team will contact you shortly to confirm and deliver your order.",
        successOrderIDLabel: "ORDER ID:",
        successHomeBtn: "<i class='fa-solid fa-house'></i> Back to Home",
        cartEmptyAlert: "Your shopping cart is empty! Cannot proceed to checkout.",
        orderSubmitError: "An error occurred while placing your order. Please try again.",
        submitting: "<i class='fa-solid fa-spinner fa-spin'></i> Placing order...",
        
        govCairo: "Cairo",
        govGiza: "Giza",
        govAlex: "Alexandria",
        govDelta: "Delta & Canal (Tanta, Mansoura, Suez...)",
        govUpper: "Upper Egypt (Minya, Asyut, Sohag...)",
        govRemote: "Remote Areas (Red Sea, Matrouh...)",
        
        footerAbout: "Your gateway to knowledge and inspiring stories. We offer a curated selection of Arabic and English books that enrich readers across the Arab world.",
        footerQuickLinks: "Quick Links",
        footerLinkHome: "Home",
        footerLinkCatalog: "Catalog",
        footerLinkAdmin: "Admin Board",
        footerCategoriesTitle: "Categories",
        footerContactTitle: "Contact Us",
        footerLocation: "Cairo, Egypt",
        footerCopyright: "© 2026 dm Bookstore. All rights reserved.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> Cash on Delivery available nationwide"
    }
};

let currentLang = localStorage.getItem("lang") || "ar";
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let shippingCost = 0;
let cartSubtotal = 0;

// Shipping fees mapping based on select value
const shippingRates = {
    cairo: 50,
    giza: 50,
    alexandria: 60,
    delta: 70,
    upper: 80,
    remote: 100
};

document.addEventListener("DOMContentLoaded", () => {
    if (cart.length === 0) {
        alert(translations[currentLang].cartEmptyAlert);
        window.location.href = "index.html";
        return;
    }
    
    applyLanguage(currentLang);
    calculateSubtotal();
    renderSummary();
    calculateShipping();
});

// Switch Language
function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
    renderSummary();
    calculateShipping();
}

function applyLanguage(lang) {
    const t = translations[lang];
    
    // Page Title
    document.title = t.pageTitle;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    if (lang === "en") {
        document.body.classList.add("en-mode");
        document.getElementById("langSwitch").innerText = "AR";
        const arrow = document.getElementById("backArrowIcon");
        if (arrow) arrow.className = "fa-solid fa-arrow-left";
    } else {
        document.body.classList.remove("en-mode");
        document.getElementById("langSwitch").innerText = "EN";
        const arrow = document.getElementById("backArrowIcon");
        if (arrow) arrow.className = "fa-solid fa-arrow-right";
    }
    
    // Set text elements
    const safeSetText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = text;
    };
    
    const safeSetPlaceholder = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.placeholder = text;
    };

    safeSetText("navHome", t.navHome);
    safeSetText("navCatalog", t.navCatalog);
    safeSetText("navAdmin", t.navAdmin);
    safeSetText("backBtnText", t.btnBack);
    
    safeSetText("shippingTitle", t.shippingTitle);
    safeSetText("lblFullName", t.lblFullName);
    safeSetPlaceholder("fullName", t.phFullName);
    
    safeSetText("lblPhone", t.lblPhone);
    safeSetPlaceholder("phone", t.phPhone);
    
    safeSetText("lblGovernorate", t.lblGovernorate);
    safeSetText("lblAddress", t.lblAddress);
    safeSetPlaceholder("address", t.phAddress);
    
    safeSetText("lblNotes", t.lblNotes);
    safeSetPlaceholder("notes", t.phNotes);
    
    safeSetText("lblPaymentTitle", t.lblPaymentTitle);
    safeSetText("lblPaymentDesc", t.lblPaymentDesc);
    safeSetText("btnPlaceOrder", t.btnPlaceOrder);
    
    safeSetText("summaryTitle", t.summaryTitle);
    safeSetText("lblSubtotal", t.lblSubtotal);
    safeSetText("lblShipping", t.lblShipping);
    safeSetText("lblTotal", t.lblTotal);
    
    // Translate governorate options
    const govSelect = document.getElementById("governorate");
    if (govSelect) {
        govSelect.options[0].text = t.optSelectGov;
        govSelect.options[1].text = t.govCairo;
        govSelect.options[2].text = t.govGiza;
        govSelect.options[3].text = t.govAlex;
        govSelect.options[4].text = t.govDelta;
        govSelect.options[5].text = t.govUpper;
        govSelect.options[6].text = t.govRemote;
    }
    
    // Success panel
    safeSetText("successTitle", t.successTitle);
    safeSetText("successDesc", t.successDesc);
    safeSetText("successOrderIDLabel", t.successOrderIDLabel);
    safeSetText("successHomeBtn", t.successHomeBtn);
    
    // Footer
    safeSetText("footerAbout", t.footerAbout);
    safeSetText("footerQuickLinks", t.footerQuickLinks);
    safeSetText("footerLinkHome", t.footerLinkHome);
    safeSetText("footerLinkCatalog", t.footerLinkCatalog);
    safeSetText("footerLinkAdmin", t.footerLinkAdmin);
    safeSetText("footerCategoriesTitle", t.footerCategoriesTitle);
    safeSetText("footerContactTitle", t.footerContactTitle);
    safeSetText("footerLocation", t.footerLocation);
    safeSetText("footerCopyright", t.footerCopyright);
    safeSetText("footerCOD", t.footerCOD);
}

function calculateSubtotal() {
    cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function renderSummary() {
    const container = document.getElementById("checkoutSummaryItems");
    if (!container) return;
    
    const t = translations[currentLang];
    
    container.innerHTML = cart.map(item => {
        let coverImgHtml = "";
        if (item.image_url) {
            coverImgHtml = `<img src="${item.image_url}" alt="${item.title}">`;
        } else {
            coverImgHtml = `<div style="width:100%; height:100%; background:var(--primary-dark); display:flex; align-items:center; justify-content:center; color:#fff; font-size:9px; font-weight:700;">dm</div>`;
        }
        
        return `
        <div class="drawer-item" style="border-bottom: 1px solid rgba(18, 53, 36, 0.05); padding-bottom: 12px; margin-bottom: 12px;">
            <div class="drawer-item-img" style="width: 44px; height: 60px;">
                ${coverImgHtml}
            </div>
            <div class="drawer-item-info">
                <h4 class="drawer-item-title" style="font-size: 14px;">${item.title}</h4>
                <p class="drawer-item-author" style="font-size: 12px; margin-bottom:2px;">${item.author}</p>
                <div style="font-size: 13px; font-weight: 700; color: var(--primary-medium);">
                    ${item.quantity} × ${item.price} ${t.currency}
                </div>
            </div>
        </div>`;
    }).join("");
    
    document.getElementById("summarySubtotal").innerText = `${cartSubtotal.toFixed(2)} ${t.currency}`;
}

function calculateShipping() {
    const govSelect = document.getElementById("governorate");
    const selectedGov = govSelect.value;
    const t = translations[currentLang];
    
    shippingCost = shippingRates[selectedGov] || 0;
    
    document.getElementById("summaryShipping").innerText = `${shippingCost} ${t.currency}`;
    
    const total = cartSubtotal + shippingCost;
    document.getElementById("summaryTotal").innerText = `${total.toFixed(2)} ${t.currency}`;
}

// Submit Order to Supabase
async function submitOrder(e) {
    e.preventDefault();
    
    const t = translations[currentLang];
    const submitBtn = document.getElementById("btnPlaceOrder");
    const originalBtnHtml = submitBtn.innerHTML;
    
    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = t.submitting;
    
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const governorate = document.getElementById("governorate").value;
    const address = document.getElementById("address").value.trim();
    const notes = document.getElementById("notes").value.trim();
    
    const governorateText = translations[currentLang]["gov" + governorate.charAt(0).toUpperCase() + governorate.slice(1)] || governorate;
    
    try {
        // 1. Insert order record
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session ? session.user.id : null;

        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert([{
                customer_name: fullName,
                customer_phone: phone,
                governorate: governorateText,
                address: address,
                notes: notes,
                total_price: cartSubtotal,
                shipping_cost: shippingCost,
                status: "pending",
                user_id: userId
            }])
            .select();
            
        if (orderError) throw orderError;
        if (!orderData || orderData.length === 0) {
            throw new Error("No data returned from order insertion.");
        }
        
        const createdOrder = orderData[0];
        const orderId = createdOrder.id;
        
        // 2. Prepare and insert order items
        const orderItemsToInsert = cart.map(item => ({
            order_id: orderId,
            book_id: item.id,
            quantity: item.quantity,
            price: item.price
        }));
        
        const { error: itemsError } = await supabase
            .from("order_items")
            .insert(orderItemsToInsert);
            
        if (itemsError) throw itemsError;
        
        // Success: Clear cart & show success UI
        localStorage.removeItem("cart");
        cart = [];
        
        document.getElementById("successOrderID").innerText = orderId;
        
        document.getElementById("checkoutFormState").style.display = "none";
        document.getElementById("checkoutSuccessState").style.display = "block";
        
        // Scroll to top of content
        document.getElementById("checkoutMain").scrollIntoView({ behavior: "smooth" });
        
    } catch (err) {
        console.error("Order submission failure:", err);
        alert(t.orderSubmitError);
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
    }
}
