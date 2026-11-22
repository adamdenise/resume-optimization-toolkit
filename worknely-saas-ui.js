
/*
 * WORKNELY V6.3
 * Premium SaaS Authentication Interface
 *
 * Keeps the existing Supabase authentication
 * and original form event handlers.
 */

(() => {
  "use strict";

  const init = () => {
    if (document.getElementById("wnAuthDialog")) return;

    const header = document.querySelector(".top");
    const section = document.getElementById("worknelyAccount");
    const logout = document.getElementById("authLogout");
    const status = document.getElementById("authStatus");

    if (!header || !section || !logout || !status) {
      console.warn("Worknely: Authentication UI elements missing.");
      return;
    }

    const style = document.createElement("style");
    style.textContent = `
      .wn-auth-nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 9px;
        flex-wrap: wrap;
        margin-left: auto;
      }

      .wn-auth-btn {
        font: inherit;
        font-size: 14px;
        font-weight: 750;
        border-radius: 13px;
        padding: 11px 16px;
        cursor: pointer;
        transition: transform .2s, box-shadow .2s;
        white-space: nowrap;
      }

      .wn-auth-btn:active {
        transform: scale(.97);
      }

      .wn-login {
        color: #5424ff;
        background: #fff;
        border: 1px solid #ded7ff;
      }

      .wn-signup {
        color: #fff;
        background: linear-gradient(
          110deg,
          #5424ff,
          #a326e8,
          #ff23a5
        );
        border: 0;
        box-shadow: 0 6px 18px #6829f52b;
      }

      .wn-account {
        color: #5424ff;
        background: #f1edff;
        border: 1px solid #ddd2ff;
      }

      .wn-account-menu {
        position: relative;
      }

      .wn-menu-panel {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        z-index: 100;
        min-width: 195px;
        background: white;
        border: 1px solid #e8e2fa;
        border-radius: 16px;
        padding: 9px;
        box-shadow: 0 16px 45px #21104c26;
      }

      .wn-menu-panel[hidden],
      .wn-auth-nav [hidden] {
        display: none !important;
      }

      .wn-menu-panel button {
        display: block;
        width: 100%;
        text-align: left;
        padding: 12px;
        border: 0;
        border-radius: 10px;
        background: transparent;
        color: #27144d;
        font: inherit;
        cursor: pointer;
      }

      .wn-menu-panel button:hover {
        background: #f3efff;
      }

      .wn-dialog {
        border: 0;
        border-radius: 24px;
        padding: 0;
        width: min(94vw, 470px);
        max-height: 88dvh;
        overflow-y: auto;
        background: #fff;
        color: #261449;
        box-shadow: 0 24px 80px #1d104d55;
      }

      .wn-dialog::backdrop {
        background: #160b35a8;
        backdrop-filter: blur(6px);
      }

      .wn-dialog-head {
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 22px;
        background: #fff;
        border-bottom: 1px solid #eee8fa;
      }

      .wn-dialog-brand {
        font-size: 21px;
        font-weight: 850;
        color: #5424ff;
        letter-spacing: -.6px;
      }

      .wn-close {
        border: 0;
        background: #f1edff;
        color: #5424ff;
        width: 38px;
        height: 38px;
        border-radius: 12px;
        font-size: 24px;
        cursor: pointer;
      }

      .wn-dialog .workspace {
        margin: 0 !important;
        width: 100% !important;
        max-width: none !important;
        border: 0 !important;
        box-shadow: none !important;
        padding: 22px !important;
        border-radius: 0 !important;
      }

      .wn-dialog .section-head {
        margin-bottom: 20px;
      }

      .wn-dialog .builder-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 14px;
      }

      .wn-dialog .builder-grid > label {
        min-width: 0;
      }

      .wn-dialog .actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
      }

      .wn-dialog .actions button {
        width: 100%;
      }

      .wn-dialog .message {
        overflow-wrap: anywhere;
      }

      @media (max-width: 600px) {
        .top {
          flex-wrap: wrap;
          gap: 10px;
        }

        .wn-auth-nav {
          gap: 6px;
        }

        .wn-auth-btn {
          padding: 9px 11px;
          font-size: 12px;
        }

        .wn-dialog .workspace {
          padding: 18px !important;
        }
      }
    `;
    document.head.appendChild(style);

    const nav = document.createElement("div");
    nav.className = "wn-auth-nav";
    nav.setAttribute("aria-label", "Account navigation");

    const loginBtn = document.createElement("button");
    loginBtn.type = "button";
    loginBtn.className = "wn-auth-btn wn-login";
    loginBtn.textContent = "Log In";

    const signupBtn = document.createElement("button");
    signupBtn.type = "button";
    signupBtn.className = "wn-auth-btn wn-signup";
    signupBtn.textContent = "Sign Up";

    const accountWrap = document.createElement("div");
    accountWrap.className = "wn-account-menu";
    accountWrap.hidden = true;

    const accountBtn = document.createElement("button");
    accountBtn.type = "button";
    accountBtn.className = "wn-auth-btn wn-account";
    accountBtn.textContent = "My Account ▾";
    accountBtn.setAttribute("aria-expanded", "false");

    const menu = document.createElement("div");
    menu.className = "wn-menu-panel";
    menu.hidden = true;

    const logoutBtn = document.createElement("button");
    logoutBtn.type = "button";
    logoutBtn.textContent = "Log Out";

    menu.appendChild(logoutBtn);
    accountWrap.append(accountBtn, menu);
    nav.append(loginBtn, signupBtn, accountWrap);
    header.appendChild(nav);

    const dialog = document.createElement("dialog");
    dialog.id = "wnAuthDialog";
    dialog.className = "wn-dialog";
    dialog.setAttribute("aria-label", "Worknely account");

    const dialogHead = document.createElement("div");
    dialogHead.className = "wn-dialog-head";

    const brand = document.createElement("strong");
    brand.className = "wn-dialog-brand";
    brand.textContent = "✦ Worknely";

    const closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "wn-close";
    closeBtn.textContent = "×";
    closeBtn.setAttribute("aria-label", "Close");

    dialogHead.append(brand, closeBtn);
    dialog.append(dialogHead, section);
    document.body.appendChild(dialog);

    const heading = section.querySelector("#accountTitle");
    const originalSignup = document.getElementById("authSignUp");
    const originalLogin = document.getElementById("authLogin");
    const form = document.getElementById("worknelyAuthForm");
    const password = document.getElementById("authPassword");

    function openAuth(mode) {
      menu.hidden = true;
      accountBtn.setAttribute("aria-expanded", "false");

      if (heading) {
        heading.textContent =
          mode === "signup" ? "Create your account" : "Welcome back";
      }

      if (originalSignup) {
        originalSignup.hidden = mode !== "signup";
      }

      if (originalLogin) {
        originalLogin.hidden = mode !== "login";
      }

      if (!dialog.open) dialog.showModal();

      const email = document.getElementById("authEmail");
      if (email) email.focus();
    }

    function signedIn() {
      return !logout.hidden;
    }

    function syncAuth() {
      const authenticated = signedIn();

      loginBtn.hidden = authenticated;
      signupBtn.hidden = authenticated;
      accountWrap.hidden = !authenticated;

      if (authenticated && dialog.open) {
        dialog.close();
      }

      if (!authenticated) {
        menu.hidden = true;
        accountBtn.setAttribute("aria-expanded", "false");
      }
    }

    loginBtn.addEventListener("click", () => openAuth("login"));
    signupBtn.addEventListener("click", () => openAuth("signup"));

    closeBtn.addEventListener("click", () => dialog.close());

    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });

    accountBtn.addEventListener("click", () => {
      menu.hidden = !menu.hidden;
      accountBtn.setAttribute(
        "aria-expanded",
        String(!menu.hidden)
      );
    });

    logoutBtn.addEventListener("click", () => {
      menu.hidden = true;
      logout.click();
    });

    document.addEventListener("click", event => {
      if (!accountWrap.contains(event.target)) {
        menu.hidden = true;
        accountBtn.setAttribute("aria-expanded", "false");
      }
    });

    const observer = new MutationObserver(syncAuth);
    observer.observe(logout, {
      attributes: true,
      attributeFilter: ["hidden", "style", "class"]
    });

    // The existing authentication module owns the actual
    // sign-up, log-in and log-out operations.
    // This module changes presentation only.

    if (form) {
      form.addEventListener("submit", () => {
        if (password) password.autocomplete = "current-password";
      });
    }

    syncAuth();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
