// Manage header links visibility based on Supabase auth session
document.addEventListener('DOMContentLoaded', async () => {
  if (!window.supabase) return;

  async function updateHeader() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const isLoggedIn = !!session;

      const navLogin = document.getElementById("navLogin");
      const navRegister = document.getElementById("navRegister");
      const navAccount = document.getElementById("navAccount");
      const headerActions = document.querySelector(".header-actions");

      // Handle nav items display (assuming they are inside LI elements)
      if (navLogin && navLogin.parentElement) navLogin.parentElement.style.display = isLoggedIn ? "none" : "";
      if (navRegister && navRegister.parentElement) navRegister.parentElement.style.display = isLoggedIn ? "none" : "";
      if (navAccount && navAccount.parentElement) {
          navAccount.parentElement.style.display = isLoggedIn ? "" : "none";
          if (isLoggedIn) navAccount.href = "/account/profile.html";
      }

      if (isLoggedIn && headerActions) {
        let logoutBtn = document.getElementById("navLogout");
        if (!logoutBtn) {
          logoutBtn = document.createElement("a");
          logoutBtn.id = "navLogout";
          logoutBtn.href = "#";
          logoutBtn.className = "btn btn-secondary";
          logoutBtn.style.padding = "6px 16px";
          logoutBtn.style.fontSize = "13px";
          logoutBtn.style.marginInlineStart = "12px";
          logoutBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> <span class="logout-text">خروج</span>';
          logoutBtn.addEventListener("click", async (e) => {
              e.preventDefault();
              await supabase.auth.signOut();
              window.location.href = "/";
          });
          headerActions.appendChild(logoutBtn);
        }
      } else {
        const logoutBtn = document.getElementById("navLogout");
        if (logoutBtn) logoutBtn.remove();
      }
    } catch (err) {
      console.error("updateHeader error", err);
    }
  }

  // initial
  updateHeader();

  // listen to auth changes
  if (supabase.auth && supabase.auth.onAuthStateChange) {
    supabase.auth.onAuthStateChange(() => updateHeader());
  }
});
