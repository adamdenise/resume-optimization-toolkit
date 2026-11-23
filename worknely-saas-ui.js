
/*
 * WORKNELY V7.7
 * Premium Authentication UI Refinement
 *
 * Compatible with Worknely V7.6 authentication.
 * Does not replace Supabase event handlers.
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

    if (
      !header || !section || !logout || !status ||
      !form || !login || !signup
    ) {
      console.warn("Worknely: Account UI elements missing.");
      return;
    }

    const style = document.createElement("style");

    style.textContent = `
      .wn-auth-nav {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        flex-wrap: wrap;
        margin-left: auto;
      }

      .wn-auth-btn {
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
        box-sizing: border-box;
      }

      .wn-menu-panel button:hover,
      .wn-menu-panel a:hover {
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

      .wn-dialog {
        box-sizing: border-box;
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
        padding: 17px 22px;
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
        box-sizing: border-box;
      }

      .wn-dialog .section-head {
        margin-bottom: 18px;
      }

      .wn-dialog .builder-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 15px;
      }

      .wn-dialog .builder-grid > label {
        min-width: 0;
      }

      .wn-dialog input {
        box-sizing: border-box;
        width: 100%;
        max-width: 100%;
        min-height: 48px;
      }

      .wn-dialog .actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        margin-top: 4px;
      }

      .wn-dialog #authLogin,
      .wn-dialog #authSignUp {
        box-sizing: border-box;
        display: block;
        width: 100%;
        min-height: 50px;
        padding: 13px 18px;
        border: 0;
        border-radius: 13px;
        background: linear-gradient(
          110deg, #5424ff, #a326e8
        );
        color: #fff;
        font: inherit;
        font-size: 15px;
        font-weight: 750;
        cursor: pointer;
      }

      .wn-dialog #authLogin[hidden],
      .wn-dialog #authSignUp[hidden],
      .wn-dialog #authLogout[hidden] {
        display: none !important;
      }

      .wn-dialog #authForgotPassword,
      .wn-dialog #authResendConfirmation {
        display: block;
        width: auto;
        min-height: 0;
        padding: 5px 2px;
        margin: 0 auto;
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
        color: #5424ff;
        font: inherit;
        font-size: 13px;
        font-weight: 650;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
      }

      .wn-dialog #authForgotPassword:hover,
      .wn-dialog #authResendConfirmation:hover {
        text-decoration: underline;
      }

      .wn-dialog .wn-auth-switch {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
        margin-top: 12px;
        font-size: 13px;
        color: #786c90;
      }

      .wn-dialog .wn-auth-switch button {
        border: 0;
        background: transparent;
        color: #5424ff;
        padding: 3px;
        font: inherit;
        font-weight: 750;
        cursor: pointer;
      }

      .wn-dialog .wn-auth-support {
        border-top: 1px solid #eee8fa;
        margin-top: 16px;
        padding-top: 14px;
        text-align: center;
      }

      .wn-dialog .wn-auth-support p {
        margin: 0 0 6px;
        color: #857993;
        font-size: 12px;
      }

      .wn-dialog .message {
        overflow-wrap: anywhere;
        font-size: 13px;
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

        .wn-menu-panel {
          min-width: 205px;
          max-width: calc(100vw - 24px);
        }

        .wn-dialog .workspace {
          padding: 18px !important;
        }

        .wn-dialog-head {
          padding: 15px 18px;
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
    const email = document.getElementById("authEmail");
    const forgot = document.getElementById("authForgotPassword");
    const resend = document.getElementById("authResendConfirmation");

    let mode = "login";

    const switchRow = document.createElement("div");
    switchRow.className = "wn-auth-switch";

    const switchText = document.createElement("span");
    const switchButton = document.createElement("button");
    switchButton.type = "button";

    switchRow.append(switchText, switchButton);

    const support = document.createElement("div");
    support.className = "wn-auth-support";

    const supportText = document.createElement("p");
    supportText.textContent =
      "Didn't receive your confirmation email?";

    if (resend) {
      support.append(supportText, resend);
    }

    if (forgot) {
      const passwordLabel = password?.closest("label");

      if (passwordLabel) {
        passwordLabel.insertAdjacentElement(
          "afterend",
          forgot
        );
      }
    }

    form.insertAdjacentElement("afterend", switchRow);
    switchRow.insertAdjacentElement("afterend", support);

    function setMode(nextMode) {
      mode = nextMode === "signup" ? "signup" : "login";

      if (heading) {
        heading.textContent =
          mode === "signup"
            ? "Create your account"
            : "Welcome back";
      }

      login.hidden = mode !== "login";
      signup.hidden = mode !== "signup";

      if (forgot) {
        forgot.hidden = mode !== "login";
      }

      if (resend) {
        resend.hidden = mode !== "login";
      }

      support.hidden = mode !== "login";

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

      if (!dialog.open) dialog.showModal();

      if (email) email.focus();
    }

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

    loginBtn.addEventListener(
      "click",
      () => openAuth("login")
    );

    signupBtn.addEventListener(
      "click",
      () => openAuth("signup")
    );

    switchButton.addEventListener("click", () => {
      setMode(mode === "login" ? "signup" : "login");
    });

    closeBtn.addEventListener(
      "click",
      () => dialog.close()
    );

    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
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
      if (event.key === "Escape") closeMenu();
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
