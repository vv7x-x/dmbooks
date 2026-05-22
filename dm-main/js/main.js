// UI Translations
const translations = {
    ar: {
        pageTitle: "dm | متجر الكتب الأول",
        navHome: "الرئيسية",
        navCatalog: "كتالوج الكتب",
        navAdmin: "لوحة التحكم",
        heroTitle: "اكتشف عالمك التالي بين <span>صفحات الكتب</span>",
        heroDesc: "مرحباً بك في متجر dm للكتب. نوفر لك تشكيلة مميزة من أروع الكتب العربية والإنجليزية المختارة بعناية لتناسب كل الأذواق، مع خدمة الدفع عند الاستلام والتوصيل السريع.",
        btnShopNow: "<i class='fa-solid fa-compass'></i> تصفح الكتب",
        btnWhatsApp: "<i class='fa-brands fa-whatsapp'></i> قناة الواتساب",
        btnInstagram: "<i class='fa-brands fa-instagram'></i> تابعنا على إنستغرام",
        sectionTitleText: "أحدث الإصدارات",
        searchInput: "ابحث باسم الكتاب أو الكاتب...",
        allCats: "جميع التصنيفات",
        catNovels: "روايات",
        catReligious: "كتب دينية",
        catSelf: "تنمية بشرية",
        catChildren: "كتب أطفال",
        catScience: "علوم وتكنولوجيا",
        catHistory: "تاريخ وسير",
        allLangs: "كل اللغات",
        langAr: "العربية",
        langEn: "English",
        sortLatest: "الأحدث",
        sortPriceLow: "السعر: من الأقل للأعلى",
        sortPriceHigh: "السعر: من الأعلى للأقل",
        loadingText: "جاري تحميل الكتب...",
        noBooksText: "لم يتم العثور على كتب تطابق البحث.",
        cartDrawerTitle: "سلة المشتريات",
        wishlistDrawerTitle: "قائمة الأمنيات",
        labelSubtotal: "الإجمالي الفرعي:",
        btnCheckout: "<i class='fa-solid fa-credit-card'></i> إتمام الشراء",
        footerAbout: "بوابتك لعالم المعرفة والقصص الملهمة. نوفر تشكيلة مميزة من الكتب العربية والإنجليزية التي تُثري عقول القراء في جميع أنحاء الوطن العربي.",
        footerQuickLinks: "روابط سريعة",
        footerLinkHome: "الرئيسية",
        footerLinkCatalog: "كتالوج الكتب",
        footerLinkAdmin: "لوحة الأدمن",
        footerCategoriesTitle: "التصنيفات",
        footerCatNovels: "روايات",
        footerCatRel: "كتب دينية",
        footerCatSelf: "تنمية بشرية",
        footerCatChild: "كتب أطفال",
        footerContactTitle: "تواصل معنا",
        footerLocation: "القاهرة، جمهورية مصر العربية",
        footerCopyright: "© 2026 مكتبة dm. جميع الحقوق محفوظة.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> الدفع عند الاستلام في جميع المحافظات",
        currency: "ج.م",
        addToCart: "إضافة للسلة",
        inStock: "متوفر",
        outOfStock: "غير متوفر",
        langLabel: "اللغة: ",
        authorLabel: "الكاتب: ",
        arLangName: "العربية",
        enLangName: "الإنجليزية"
    },
    en: {
        pageTitle: "dm | The Premier Bookstore",
        navHome: "Home",
        navCatalog: "Books Catalog",
        navAdmin: "Admin Dashboard",
        heroTitle: "Discover your next world between <span>book pages</span>",
        heroDesc: "Welcome to dm Bookstore. We offer a curated collection of Arabic and English books, handpicked to suit all interests, with fast delivery and Cash on Delivery.",
        btnShopNow: "<i class='fa-solid fa-compass'></i> Browse Books",
        btnWhatsApp: "<i class='fa-brands fa-whatsapp'></i> WhatsApp Channel",
        btnInstagram: "<i class='fa-brands fa-instagram'></i> Instagram Page",
        sectionTitleText: "Latest Releases",
        searchInput: "Search by title or author...",
        allCats: "All Categories",
        catNovels: "Novels",
        catReligious: "Religious Books",
        catSelf: "Self-Development",
        catChildren: "Children's Books",
        catScience: "Science & Tech",
        catHistory: "History & Biography",
        allLangs: "All Languages",
        langAr: "Arabic",
        langEn: "English",
        sortLatest: "Latest Releases",
        sortPriceLow: "Price: Low to High",
        sortPriceHigh: "Price: High to Low",
        loadingText: "Loading books...",
        noBooksText: "No books match your criteria.",
        cartDrawerTitle: "Shopping Cart",
        wishlistDrawerTitle: "My Wishlist",
        labelSubtotal: "Subtotal:",
        btnCheckout: "<i class='fa-solid fa-credit-card'></i> Checkout Now",
        footerAbout: "Your gateway to knowledge and inspiring stories. We offer a curated selection of Arabic and English books that enrich readers across the Arab world.",
        footerQuickLinks: "Quick Links",
        footerLinkHome: "Home",
        footerLinkCatalog: "Catalog",
        footerLinkAdmin: "Admin Board",
        footerCategoriesTitle: "Categories",
        footerCatNovels: "Novels",
        footerCatRel: "Religious",
        footerCatSelf: "Self-Development",
        footerCatChild: "Children's Books",
        footerContactTitle: "Contact Us",
        footerLocation: "Cairo, Egypt",
        footerCopyright: "© 2026 dm Bookstore. All rights reserved.",
        footerCOD: "<i class='fa-solid fa-truck-fast'></i> Cash on Delivery available nationwide",
        currency: "EGP",
        addToCart: "Add to Cart",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        langLabel: "Language: ",
        authorLabel: "Author: ",
        arLangName: "Arabic",
        enLangName: "English"
    }
};

let currentLang = localStorage.getItem("lang") || "ar";
let allBooks = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage(currentLang);
    loadBooksFromDB();
    updateCartCount();
    updateWishlistCount();
    renderCart();
    renderWishlist();
    initHeroParallax();
});

// Switch Language
function toggleLanguage() {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
    renderBooksGrid();
    renderCart();
    renderWishlist();
}

function applyLanguage(lang) {
    const t = translations[lang];
    
    // Page metadata
    document.title = t.pageTitle;
    
    // HTML elements
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    
    if (lang === "en") {
        document.body.classList.add("en-mode");
        document.getElementById("langSwitch").innerText = "AR";
    } else {
        document.body.classList.remove("en-mode");
        document.getElementById("langSwitch").innerText = "EN";
    }
    
    // Translate text contents
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
    safeSetText("heroTitle", t.heroTitle);
    safeSetText("heroDesc", t.heroDesc);
    safeSetText("btnShopNow", t.btnShopNow);
    safeSetText("btnWhatsApp", t.btnWhatsApp);
    safeSetText("btnInstagram", t.btnInstagram);
    safeSetText("sectionTitleText", t.sectionTitleText);
    safeSetPlaceholder("searchInput", t.searchInput);
    safeSetText("heroSubtitle", lang === "ar" ? "<i class='fa-solid fa-star'></i> الوجهة الأولى لمحبي القراءة" : "<i class='fa-solid fa-star'></i> The Ultimate Destination for Book Lovers");
    
    // Dropdown translations
    const catSelect = document.getElementById("categoryFilter");
    if (catSelect) {
        catSelect.options[0].text = t.allCats;
        catSelect.options[1].text = t.catNovels;
        catSelect.options[2].text = t.catReligious;
        catSelect.options[3].text = t.catSelf;
        catSelect.options[4].text = t.catChildren;
        catSelect.options[5].text = t.catScience;
        catSelect.options[6].text = t.catHistory;
    }
    
    const langSelect = document.getElementById("languageFilter");
    if (langSelect) {
        langSelect.options[0].text = t.allLangs;
        langSelect.options[1].text = t.langAr;
        langSelect.options[2].text = t.langEn;
    }
    
    const sortSelect = document.getElementById("sortBy");
    if (sortSelect) {
        sortSelect.options[0].text = t.sortLatest;
        sortSelect.options[1].text = t.sortPriceLow;
        sortSelect.options[2].text = t.sortPriceHigh;
    }
    
    safeSetText("cartDrawerTitle", t.cartDrawerTitle);
    safeSetText("wishlistDrawerTitle", t.wishlistDrawerTitle);
    safeSetText("labelSubtotal", t.labelSubtotal);
    safeSetText("btnCheckout", t.btnCheckout);
    
    safeSetText("footerAbout", t.footerAbout);
    safeSetText("footerQuickLinks", t.footerQuickLinks);
    safeSetText("footerLinkHome", t.footerLinkHome);
    safeSetText("footerLinkCatalog", t.footerLinkCatalog);
    safeSetText("footerLinkAdmin", t.footerLinkAdmin);
    safeSetText("footerCategoriesTitle", t.footerCategoriesTitle);
    
    safeSetText("footerCatNovels", t.footerCatNovels);
    safeSetText("footerCatRel", t.footerCatRel);
    safeSetText("footerCatSelf", t.footerCatSelf);
    safeSetText("footerCatChild", t.footerCatChild);
    
    safeSetText("footerContactTitle", t.footerContactTitle);
    safeSetText("footerLocation", t.footerLocation);
    safeSetText("footerCopyright", t.footerCopyright);
    safeSetText("footerCOD", t.footerCOD);
}

// Fetch Books from Database
async function loadBooksFromDB() {
    try {
        const supabase = window.getSupabaseClient();
        const { data, error } = await supabase
            .from("books")
            .select("*")
            .order("created_at", { ascending: false });
            
        if (error) throw error;
        
        allBooks = data || [];
        renderBooksGrid();
    } catch (err) {
        console.error("Error loading books:", err);
        const grid = document.getElementById("booksGrid");
        if (grid) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--danger); padding: 30px;">
                <i class="fa-solid fa-triangle-exclamation fa-2x"></i>
                <p style="margin-top: 10px;">حدث خطأ أثناء تحميل الكتب. الرجاء المحاولة لاحقاً.</p>
            </div>`;
        }
    }
}

// Filter and Sort Books
function filterBooks() {
    renderBooksGrid();
}

function selectCategory(cat) {
    const filter = document.getElementById("categoryFilter");
    if (filter) {
        filter.value = cat;
        filterBooks();
    }
}

function renderBooksGrid() {
    const grid = document.getElementById("booksGrid");
    if (!grid) return;
    
    const searchVal = document.getElementById("searchInput").value.toLowerCase();
    const catVal = document.getElementById("categoryFilter").value;
    const langVal = document.getElementById("languageFilter").value;
    const sortVal = document.getElementById("sortBy").value;
    const t = translations[currentLang];
    
    // Filter
    let filtered = allBooks.filter(book => {
        const title = (book.title || "").toLowerCase();
        const author = (book.author || "").toLowerCase();
        const matchesSearch = title.includes(searchVal) || author.includes(searchVal);
        const matchesCategory = catVal === "all" || book.category === catVal;
        const matchesLanguage = langVal === "all" || book.language === langVal;
        return matchesSearch && matchesCategory && matchesLanguage;
    });
    
    // Sort
    if (sortVal === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else {
        // default latest
        filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    
    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light);">
            <i class="fa-regular fa-folder-open fa-3x" style="margin-bottom:12px;"></i>
            <p>${t.noBooksText}</p>
        </div>`;
        return;
    }
    
    grid.innerHTML = filtered.map(book => {
        const inWishlist = wishlist.some(item => item.id === book.id);
        const isAr = book.language === "ar";
        const isOutOfStock = book.in_stock === false;
        
        // Handle images
        let coverImgHtml = "";
        if (book.image_url) {
            coverImgHtml = `<img src="${book.image_url}" alt="${book.title}" loading="lazy">`;
        } else {
            // Premium CSS Cover Graphic
            coverImgHtml = `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--forest-light) 0%, var(--forest) 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; color: #fff; text-align: center; border-left: 6px solid rgba(255,255,255,0.1);">
                <div style="width: 30px; height: 2px; background: var(--gold); margin-bottom: 12px;"></div>
                <div style="font-size: 15px; font-weight: 700; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.4; margin-bottom: 8px;">${book.title}</div>
                <div style="font-size: 12px; color: rgba(255,255,255,0.7);">${book.author}</div>
            </div>`;
        }
        
        const categoryLabel = t["cat" + book.category.charAt(0).toUpperCase() + book.category.slice(1).replace("-", "")] || book.category;
        
        return `
        <div class="book-card">
            <!-- Wishlist Icon -->
            <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlistItem('${book.id}')" title="${t.wishlistDrawerTitle}">
                <i class="${inWishlist ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </button>
            
            <!-- Language Badge -->
            <span class="book-badge ${isOutOfStock ? 'badge-out-of-stock' : (isAr ? 'badge-ar' : 'badge-en')}">
                ${isOutOfStock ? t.outOfStock : (isAr ? t.arLangName : t.enLangName)}
            </span>
            
            <a href="book-details.html?id=${book.id}" class="book-card-img">
                ${coverImgHtml}
            </a>
            
            <div class="book-card-info">
                <span class="book-card-category">${categoryLabel}</span>
                <a href="book-details.html?id=${book.id}">
                    <h3 class="book-card-title">${book.title}</h3>
                </a>
                <p class="book-card-author">${t.authorLabel}${book.author}</p>
                
                <div class="book-card-footer">
                    <div class="book-card-price">${book.price} <span>${t.currency}</span></div>
                    ${isOutOfStock ? '' : `
                    <button class="add-cart-btn" onclick="addToCart('${book.id}')" title="${t.addToCart}">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    `}
                </div>
            </div>
        </div>`;
    }).join("");
}

// Drawer controls
function toggleCartDrawer(open) {
    document.getElementById("cartDrawer").classList.toggle("open", open);
    document.getElementById("cartOverlay").classList.toggle("open", open);
}

function toggleWishlistDrawer(open) {
    document.getElementById("wishlistDrawer").classList.toggle("open", open);
    document.getElementById("wishlistOverlay").classList.toggle("open", open);
}

// Cart Logic
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cartBadge").innerText = count;
}

function addToCart(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const existing = cart.find(item => item.id === bookId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: bookId,
            quantity: 1,
            title: book.title,
            author: book.author,
            price: book.price,
            image_url: book.image_url
        });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
    toggleCartDrawer(true);
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function updateCartQty(bookId, delta) {
    const item = cart.find(i => i.id === bookId);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(bookId);
    } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

function renderCart() {
    const container = document.getElementById("cartItemsContainer");
    if (!container) return;
    
    const t = translations[currentLang];
    
    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px 10px; color: var(--text-light);">
            <i class="fa-solid fa-basket-shopping fa-3x" style="margin-bottom:12px;"></i>
            <p>السلة فارغة حالياً.</p>
        </div>`;
        document.getElementById("cartSubtotal").innerHTML = `0 <span>${t.currency}</span>`;
        return;
    }
    
    let subtotal = 0;
    
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        let coverImgHtml = "";
        if (item.image_url) {
            coverImgHtml = `<img src="${item.image_url}" alt="${item.title}">`;
        } else {
            coverImgHtml = `<div style="width:100%; height:100%; background:var(--forest); display:flex; align-items:center; justify-content:center; color:var(--gold); font-size:16px; font-weight:700;"><i class="fa-solid fa-book-open"></i></div>`;
        }
        
        return `
        <div class="drawer-item">
            <div class="drawer-item-img">
                ${coverImgHtml}
            </div>
            <div class="drawer-item-info">
                <h4 class="drawer-item-title">${item.title}</h4>
                <p class="drawer-item-author">${item.author}</p>
                <div class="drawer-item-price">${item.price} ${t.currency}</div>
                
                <div class="quantity-picker" style="height:32px; margin-top:8px; width:fit-content;">
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)" style="width:28px;">-</button>
                    <span class="qty-input" style="width:30px; font-size:13px; line-height:30px; border:none;">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)" style="width:28px;">+</button>
                </div>
            </div>
            <button class="drawer-item-remove" onclick="removeFromCart('${item.id}')" title="حذف">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>`;
    }).join("");
    
    document.getElementById("cartSubtotal").innerHTML = `${subtotal.toFixed(2)} <span>${t.currency}</span>`;
}

// Wishlist Logic
function updateWishlistCount() {
    document.getElementById("wishlistBadge").innerText = wishlist.length;
}

function toggleWishlistItem(bookId) {
    const existingIndex = wishlist.findIndex(item => item.id === bookId);
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
    } else {
        const book = allBooks.find(b => b.id === bookId);
        if (!book) return;
        wishlist.push({
            id: bookId,
            title: book.title,
            author: book.author,
            price: book.price,
            image_url: book.image_url
        });
    }
    
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
    renderWishlist();
    renderBooksGrid(); // Refresh cards to update heart icons
}

function renderWishlist() {
    const container = document.getElementById("wishlistItemsContainer");
    if (!container) return;
    
    const t = translations[currentLang];
    
    if (wishlist.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding: 40px 10px; color: var(--text-light);">
            <i class="fa-regular fa-heart fa-3x" style="margin-bottom:12px;"></i>
            <p>قائمة الأمنيات فارغة.</p>
        </div>`;
        return;
    }
    
    container.innerHTML = wishlist.map(item => {
        let coverImgHtml = "";
        if (item.image_url) {
            coverImgHtml = `<img src="${item.image_url}" alt="${item.title}">`;
        } else {
            coverImgHtml = `<div style="width:100%; height:100%; background:var(--forest); display:flex; align-items:center; justify-content:center; color:var(--gold); font-size:16px; font-weight:700;"><i class="fa-solid fa-book-open"></i></div>`;
        }
        
        return `
        <div class="drawer-item">
            <div class="drawer-item-img">
                ${coverImgHtml}
            </div>
            <div class="drawer-item-info">
                <h4 class="drawer-item-title">${item.title}</h4>
                <p class="drawer-item-author">${item.author}</p>
                <div class="drawer-item-price">${item.price} ${t.currency}</div>
                
                <button class="btn btn-primary" onclick="addToCart('${item.id}')" style="height:28px; padding:0 12px; font-size:12px; margin-top:8px; border-radius:var(--radius-sm);">
                    <i class="fa-solid fa-cart-plus"></i> ${t.addToCart}
                </button>
            </div>
            <button class="drawer-item-remove" onclick="toggleWishlistItem('${item.id}')" title="حذف">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>`;
    }).join("");
}

function initHeroParallax() {
    const heroVisual = document.querySelector('.hero-visual');
    const bookStack = document.querySelector('.book-stack');
    if (!heroVisual || !bookStack) return;

    heroVisual.addEventListener('mousemove', (event) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
        bookStack.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        bookStack.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
}
