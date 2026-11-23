
/*
 * WORKNELY V7.7.1
 * Premium Mobile Authentication Layout Fix
 *
 * Preserves existing Supabase authentication handlers.
 * Fixes modal sizing, mobile alignment and button layout.
 */

(() => {
  "use strict";

  function initialize() {
    if (document.getElementById("wnAuthDialog")) return;

    const header = document.querySelector(".top");
    const section = document.getElementById("worknelyAccount");
    const logout = document.getElementById("authLogout");
    const status = document.getElementById("authStatus");
    const form = document.getElementById("worknelyAuthForm");
    const login = document.getElementById("authLogin");
    const signup = document.getElementById("authSignUp");
    const password = document.getElementById("authPassword");
    const email = document.getElementById("authEmail");

    if (
      !header || !section || !logout || !status ||
      !form || !login || !signup
    ) {
      console.warn("Worknely: Account UI elements missing.");
      return;
    }

    const style = document.createElement("style");
    style.id = "wn-auth-layout-v771";

    style.textContent = `
      /* HEADER NAVIGATION */

      .wn-auth-nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        flex-wrap: wrap;
        margin-left: auto;
        min-width: 0;
      }

      .wn-auth-btn {
        box-sizing: border-box;
        font: inherit;
        font-size: 13px;
        font-weight: 750;
        border-radius: 12px;
        padding: 10px 14px;
        cursor: pointer;
        white-space: nowrap;
      }

      .wn-login {
        color: #5424ff;
        background: #fff;
        border: 1px solid #ded7ff;
      }

      .wn-signup {
        color: #fff;
        background: linear-gradient(
          110deg, #5424ff, #a326e8, #ff23a5
        );
        border: 0;
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
        min-width: 215px;
        max-width: calc(100vw - 24px);
        background: #fff;
        border: 1px solid #e8e2fa;
        border-radius: 16px;
        padding: 9px;
        box-shadow: 0 16px 45px #21104c26;
      }

      .wn-menu-panel[hidden],
      .wn-auth-nav [hidden] {
        display: none !important;
      }

      .wn-menu-panel button,
      .wn-menu-panel a {
        display: block;
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        padding: 12px;
        border: 0;
        border-radius: 10px;
        background: transparent;
        color: #27144d;
        font: inherit;
        font-size: 14px;
        text-decoration: none;
        cursor: pointer;
      }

      .wn-menu-panel button:hover,
      .wn-menu-panel a:hover,
      .wn-menu-panel button:focus-visible,
      .wn-menu-panel a:focus-visible {
        background: #f3efff;
      }

      .wn-menu-divider {
        height: 1px;
        background: #eee8fa;
        margin: 6px 3px;
      }

      .wn-menu-pro {
        color: #7025e8 !important;
        font-weight: 750 !important;
      }

      /* MODAL: FIXED MOBILE GEOMETRY */

      dialog#wnAuthDialog.wn-dialog {
        box-sizing: border-box !important;
        position: fixed !important;
        inset: 0 !important;
        margin: auto !important;

        width: 440px !important;
        max-width: calc(100vw - 32px) !important;
        min-width: 0 !important;

        height: auto !important;
        max-height: min(88dvh, 760px) !important;

        padding: 0 !important;
        border: 0 !important;
        border-radius: 22px !important;

        overflow-x: hidden !important;
        overflow-y: auto !important;
        overscroll-behavior: contain;

        background: #fff !important;
        color: #261449 !important;
        box-shadow: 0 24px 80px #1d104d55 !important;
      }

      dialog#wnAuthDialog.wn-dialog:not([open]) {
        display: none !important;
      }

      dialog#wnAuthDialog.wn-dialog::backdrop {
        background: rgba(22, 11, 53, .68);
        backdrop-filter: blur(6px);
      }

      #wnAuthDialog,
      #wnAuthDialog *,
      #wnAuthDialog *::before,
      #wnAuthDialog *::after {
        box-sizing: border-box;
      }

      /* MODAL HEADER */

      #wnAuthDialog .wn-dialog-head {
        position: sticky;
        top: 0;
        z-index: 2;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;

        width: 100%;
        min-width: 0;
        margin: 0;
        padding: 17px 20px;

        background: #fff;
        border-bottom: 1px solid #eee8fa;
      }

      #wnAuthDialog .wn-dialog-brand {
        min-width: 0;
        color: #5424ff;
        font-size: 21px;
        font-weight: 850;
        letter-spacing: -.6px;
        line-height: 1.3;
      }

      #wnAuthDialog .wn-close {
        flex: 0 0 38px;
        display: grid;
        place-items: center;

        width: 38px;
        height: 38px;
        min-width: 38px;
        min-height: 38px;
        padding: 0;

        border: 0;
        border-radius: 12px;
        background: #f1edff;
        color: #5424ff;

        font-size: 25px;
        line-height: 1;
        cursor: pointer;
      }

      /* ACCOUNT CONTENT */

      #wnAuthDialog #worknelyAccount.workspace {
        display: block !important;
        position: static !important;

        box-sizing: border-box !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;

        margin: 0 !important;
        padding: 24px 22px !important;

        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;

        background: #fff !important;
        overflow: visible !important;
      }

      #wnAuthDialog .section-head {
        display: block !important;
        width: 100%;
        min-width: 0;
        margin: 0 0 22px !important;
      }

      #wnAuthDialog .section-head > div {
        width: 100%;
        min-width: 0;
      }

      #wnAuthDialog .section-head .overline {
        display: block;
        margin-bottom: 12px;
        color: #5424ff;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 2px;
      }

      #wnAuthDialog #accountTitle {
        margin: 0 0 10px !important;
        color: #261449;
        font-size: clamp(25px, 6vw, 31px);
        font-weight: 800;
        line-height: 1.2;
        letter-spacing: -.7px;
      }

      #wnAuthDialog .section-head p {
        margin: 0 !important;
        color: #7d8298;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.6;
        overflow-wrap: anywhere;
      }

      /* AUTH FORM */

      #wnAuthDialog #worknelyAuthForm {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) !important;
        gap: 15px !important;

        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;

        margin: 0 !important;
        padding: 0 !important;
      }

      #wnAuthDialog #worknelyAuthForm > label {
        display: flex !important;
        flex-direction: column !important;
        gap: 8px !important;

        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;

        margin: 0 !important;
        padding: 0 !important;

        color: #261449;
        font-size: 14px;
        font-weight: 650;
        line-height: 1.4;
      }

      #wnAuthDialog #authEmail,
      #wnAuthDialog #authPassword {
        display: block !important;
        box-sizing: border-box !important;

        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;
        height: 50px !important;
        min-height: 50px !important;

        margin: 0 !important;
        padding: 12px 14px !important;

        border: 1px solid #dedfee !important;
        border-radius: 12px !important;

        background: #fbfbfe !important;
        color: #261449 !important;

        font-size: 16px !important;
        font-weight: 400 !important;
        line-height: normal !important;

        box-shadow: none !important;
        appearance: none;
        -webkit-appearance: none;
      }

      #wnAuthDialog #authEmail:focus,
      #wnAuthDialog #authPassword:focus {
        border-color: #5424ff !important;
        outline: 2px solid rgba(84, 36, 255, .15);
        outline-offset: 1px;
      }

      /* FORGOT PASSWORD */

      #wnAuthDialog .wn-forgot-row {
        display: flex !important;
        justify-content: flex-end;
        align-items: center;

        width: 100%;
        min-width: 0;
        margin: -5px 0 0;
        padding: 0;
      }

      #wnAuthDialog #authForgotPassword {
        display: inline-flex !important;
        align-items: center;
        justify-content: flex-end;

        width: auto !important;
        min-width: 0 !important;
        min-height: 0 !important;

        margin: 0 !important;
        padding: 4px 0 !important;

        border: 0 !important;
        border-radius: 0 !important;

        background: transparent !important;
        box-shadow: none !important;

        color: #5424ff !important;
        font: inherit !important;
        font-size: 13px !important;
        font-weight: 650 !important;
        text-align: right;
        cursor: pointer;
      }

      #wnAuthDialog .wn-forgot-row[hidden],
      #wnAuthDialog #authForgotPassword[hidden] {
        display: none !important;
      }

      /* PRIMARY ACTIONS */

      #wnAuthDialog #worknelyAuthForm .actions {
        display: flex !important;
        flex-direction: column !important;
        gap: 10px !important;

        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;

        margin: 3px 0 0 !important;
        padding: 0 !important;
      }

      #wnAuthDialog #authLogin,
      #wnAuthDialog #authSignUp {
        display: block !important;
        box-sizing: border-box !important;

        width: 100% !important;
        max-width: 100% !important;
        min-width: 0 !important;

        min-height: 52px !important;
        margin: 0 !important;
        padding: 13px 16px !important;

        border: 0 !important;
        border-radius: 13px !important;

        background: linear-gradient(
          110deg, #5424ff, #a326e8
        ) !important;

        color: #fff !important;
        font: inherit !important;
        font-size: 16px !important;
        font-weight: 750 !important;
        line-height: 1.4 !important;
        text-align: center !important;

        box-shadow: none !important;
        cursor: pointer;
      }

      #wnAuthDialog #authLogin[hidden],
      #wnAuthDialog #authSignUp[hidden],
      #wnAuthDialog #authLogout[hidden] {
        display: none !important;
      }

      /* LOGIN / SIGNUP SWITCH */

      #wnAuthDialog .wn-auth-switch {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;

        width: 100%;
        min-width: 0;
        margin: 16px 0 0;
        padding: 0;

        color: #786c90;
        font-size: 13px;
        line-height: 1.5;
        text-align: center;
      }

      #wnAuthDialog .wn-auth-switch button {
        width: auto !important;
        min-width: 0 !important;
        min-height: 0 !important;

        margin: 0 !important;
        padding: 2px !important;

        border: 0 !important;
        background: transparent !important;
        box-shadow: none !important;

        color: #5424ff !important;
        font: inherit !important;
        font-weight: 750 !important;
        cursor: pointer;
      }

      /* CONFIRMATION SUPPORT */

      #wnAuthDialog .wn-auth-support {
        width: 100%;
        min-width: 0;
        margin: 20px 0 0;
        padding: 18px 0 0;

        border-top: 1px solid #eee8fa;
        text-align: center;
      }

      #wnAuthDialog .wn-auth-support p {
        margin: 0 0 8px;
        color: #857993;
        font-size: 12px;
        line-height: 1.5;
      }

      #wnAuthDialog #authResendConfirmation {
        display: inline-block !important;

        width: auto !important;
        min-width: 0 !important;
        min-height: 0 !important;

        margin: 0 auto !important;
        padding: 4px 6px !important;

        border: 0 !important;
        border-radius: 0 !important;

        background: transparent !important;
        box-shadow: none !important;

        color: #5424ff !important;
        font: inherit !important;
        font-size: 13px !important;
        font-weight: 700 !important;
        line-height: 1.5 !important;

        text-align: center;
        cursor: pointer;
      }

      #wnAuthDialog .wn-auth-support[hidden],
      #wnAuthDialog #authResendConfirmation[hidden] {
        display: none !important;
      }

      /* STATUS */

      #wnAuthDialog #authStatus {
        width: 100%;
        min-width: 0;
        max-width: 100%;

        margin: 14px 0 0;
        overflow-wrap: anywhere;
        font-size: 13px;
        line-height: 1.5;
      }

      #wnAuthDialog #authStatus:empty {
        display: none !important;
      }

      /* MOBILE */

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

        dialog#wnAuthDialog.wn-dialog {
          width: calc(100vw - 24px) !important;
          max-width: calc(100vw - 24px) !important;
          max-height: calc(100dvh - 32px) !important;
          border-radius: 20px !important;
        }

        #wnAuthDialog .wn-dialog-head {
          padding: 14px 17px;
        }

        #wnAuthDialog #worknelyAccount.workspace {
          padding: 20px 18px !important;
        }

        #wnAuthDialog .section-head {
          margin-bottom: 20px !important;
        }
      }

      @media (max-width: 360px) {
        #wnAuthDialog #worknelyAccount.workspace {
          padding: 18px 14px !important;
        }

        #wnAuthDialog .wn-dialog-head {
          padding: 12px 14px;
        }

        #wnAuthDialog #accountTitle {
          font-size: 25px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        #wnAuthDialog *,
        #wnAuthDialog *::before,
        #wnAuthDialog *::after {
          scroll-behavior: auto !important;
          animation-duration: .01ms !important;
          transition-duration: .01ms !important;
        }
      }
    `;

    document.head.appendChild(style);

    /* NAVIGATION */

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
    accountBtn.setAttribute("aria-haspopup", "true");

    const menu = document.createElement("div");
    menu.className = "wn-menu-panel";
    menu.hidden = true;

    function closeMenu() {
      menu.hidden = true;
      accountBtn.setAttribute("aria-expanded", "false");
    }

    function menuLink(label, href, className = "") {
      const link = document.createElement("a");
      link.textContent = label;
      link.href = href;

      if (className) link.className = className;

      link.addEventListener("click", closeMenu);
      return link;
    }

    const divider = document.createElement("div");
    divider.className = "wn-menu-divider";
    divider.setAttribute("role", "separator");

    const logoutBtn = document.createElement("button");
    logoutBtn.type = "button";
    logoutBtn.textContent = "Log Out";

    menu.append(
      menuLink("My Dashboard", "dashboard.html"),
      menuLink("My Resumes", "dashboard.html#resumes"),
      menuLink("Resume Builder", "#builder"),
      menuLink(
        "Upgrade to Pro",
        "dashboard.html#pro",
        "wn-menu-pro"
      ),
      divider,
      logoutBtn
    );

    accountWrap.append(accountBtn, menu);
    nav.append(loginBtn, signupBtn, accountWrap);
    header.appendChild(nav);

    /* AUTHENTICATION MODAL */

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

    const heading = document.getElementById("accountTitle");
    const intro = section.querySelector(".section-head p");
    const forgot = document.getElementById("authForgotPassword");
    const resend = document.getElementById("authResendConfirmation");

    let mode = "login";

    /* PASSWORD RECOVERY POSITION */

    const forgotRow = document.createElement("div");
    forgotRow.className = "wn-forgot-row";

    if (forgot) {
      const passwordLabel = password?.closest("label");

      if (passwordLabel) {
        passwordLabel.insertAdjacentElement(
          "afterend",
          forgotRow
        );
        forgotRow.appendChild(forgot);
      }
    }

    /* ACCOUNT SWITCH */

    const switchRow = document.createElement("div");
    switchRow.className = "wn-auth-switch";

    const switchText = document.createElement("span");

    const switchButton = document.createElement("button");
    switchButton.type = "button";

    switchRow.append(switchText, switchButton);

    /* CONFIRMATION SUPPORT */

    const support = document.createElement("div");
    support.className = "wn-auth-support";

    const supportText = document.createElement("p");
    supportText.textContent =
      "Didn't receive your confirmation email?";

    support.appendChild(supportText);

    if (resend) {
      support.appendChild(resend);
    }

    form.insertAdjacentElement("afterend", switchRow);
    switchRow.insertAdjacentElement("afterend", support);

    /* MODES */

    function setMode(nextMode) {
      mode = nextMode === "signup" ? "signup" : "login";

      if (heading) {
        heading.textContent =
          mode === "signup"
            ? "Create your account"
            : "Welcome back";
      }

      if (intro) {
        intro.textContent =
          mode === "signup"
            ? "Create your account to save and manage your resumes."
            : "Sign in to access your saved resumes.";
      }

      login.hidden = mode !== "login";
      signup.hidden = mode !== "signup";

      if (forgot) {
        forgot.hidden = mode !== "login";
      }

      forgotRow.hidden =
        mode !== "login" || !forgot;

      if (resend) {
        resend.hidden = mode !== "login";
      }

      support.hidden =
        mode !== "login" || !resend;

      switchText.textContent =
        mode === "login"
          ? "Don't have an account?"
          : "Already have an account?";

      switchButton.textContent =
        mode === "login" ? "Sign Up" : "Log In";

      if (password) {
        password.autocomplete =
          mode === "signup"
            ? "new-password"
            : "current-password";
      }
    }

    function openAuth(nextMode) {
      closeMenu();
      setMode(nextMode);

      if (!dialog.open) {
        dialog.showModal();
      }

      if (email) {
        email.focus({ preventScroll: true });
      }
    }

    /* SESSION UI */

    function syncAuth() {
      const authenticated = !logout.hidden;

      loginBtn.hidden = authenticated;
      signupBtn.hidden = authenticated;
      accountWrap.hidden = !authenticated;

      if (authenticated && dialog.open) {
        dialog.close();
      }

      if (!authenticated) {
        closeMenu();
      }
    }

    /* EVENTS */

    loginBtn.addEventListener("click", () => {
      openAuth("login");
    });

    signupBtn.addEventListener("click", () => {
      openAuth("signup");
    });

    switchButton.addEventListener("click", () => {
      setMode(
        mode === "login" ? "signup" : "login"
      );
    });

    closeBtn.addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;

      const bounds = dialog.getBoundingClientRect();

      const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (outside) dialog.close();
    });

    accountBtn.addEventListener("click", () => {
      const opening = menu.hidden;

      menu.hidden = !opening;
      accountBtn.setAttribute(
        "aria-expanded",
        String(opening)
      );
    });

    logoutBtn.addEventListener("click", () => {
      closeMenu();
      logout.click();
    });

    document.addEventListener("click", event => {
      if (!accountWrap.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    const observer = new MutationObserver(syncAuth);

    observer.observe(logout, {
      attributes: true,
      attributeFilter: ["hidden", "style", "class"]
    });

    setMode("login");
    syncAuth();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }
})();
