/**
 * Books data layer — cache, lean queries, optimized cover URLs
 */
(function () {
  const LIST_COLUMNS =
    "id,title,author,price,category,language,image_url,in_stock,created_at";
  const CACHE_KEY = "dm_books_list_v1";
  const CACHE_TS_KEY = "dm_books_list_ts_v1";
  const CACHE_TTL_MS = 5 * 60 * 1000;

  function readCache() {
    try {
      const ts = Number(sessionStorage.getItem(CACHE_TS_KEY) || 0);
      if (!ts || Date.now() - ts > CACHE_TTL_MS) return null;
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : null;
    } catch {
      return null;
    }
  }

  function writeCache(books) {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(books));
      sessionStorage.setItem(CACHE_TS_KEY, String(Date.now()));
    } catch {
      /* quota — ignore */
    }
  }

  function clearCache() {
    sessionStorage.removeItem(CACHE_KEY);
    sessionStorage.removeItem(CACHE_TS_KEY);
  }

  /** Smaller images for grid cards (Supabase Storage render API) */
  function bookCoverUrl(url, width = 420) {
    if (!url || typeof url !== "string") return "";
    const trimmed = url.trim();
    if (!trimmed.includes("supabase.co/storage")) return trimmed;
    if (trimmed.includes("/render/image/")) return trimmed;
    const rendered = trimmed.replace(
      "/storage/v1/object/public/",
      "/storage/v1/render/image/public/"
    );
    const sep = rendered.includes("?") ? "&" : "?";
    return `${rendered}${sep}width=${width}&quality=75&resize=contain`;
  }

  async function fetchBooksList(options = {}) {
    const { force = false } = options;

    if (!force) {
      const cached = readCache();
      if (cached) return { data: cached, fromCache: true };
    }

    const sb = window.getSupabaseClient && window.getSupabaseClient();
    if (!sb) throw new Error("Supabase not ready");

    const { data, error } = await sb
      .from("books")
      .select(LIST_COLUMNS)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const list = data || [];
    writeCache(list);
    return { data: list, fromCache: false };
  }

  async function fetchBookById(id) {
    if (!id) throw new Error("Missing book id");

    const cached = readCache();
    if (cached) {
      const hit = cached.find((b) => b.id === id);
      if (hit) {
        const sb = window.getSupabaseClient && window.getSupabaseClient();
        if (!sb) return hit;
        const { data, error } = await sb
          .from("books")
          .select("description")
          .eq("id", id)
          .maybeSingle();
        if (!error && data) return { ...hit, description: data.description };
        return hit;
      }
    }

    const sb = window.getSupabaseClient && window.getSupabaseClient();
    if (!sb) throw new Error("Supabase not ready");

    const { data, error } = await sb
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }

  window.dmBooks = {
    LIST_COLUMNS,
    readCache,
    writeCache,
    clearCache,
    bookCoverUrl,
    fetchBooksList,
    fetchBookById,
  };
})();
