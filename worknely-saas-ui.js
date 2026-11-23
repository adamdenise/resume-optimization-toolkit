
/*
 * WORKNELY V7.8.2
 * Responsive Authentication UI + Premium Conversion CTA
 * Compatible with worknely-auth.js V7.6.
 * Preserves original Supabase event handlers.
 */
(() => {
  "use strict";
  function initialize() {
    if (document.getElementById("wnAuthDialog")) return;
    const $ = id => document.getElementById(id);
    const header = document.querySelector(".top");
    const section = $("worknelyAccount");
    const form = $("worknelyAuthForm");
    const login = $("authLogin");
    const signup = $("authSignUp");
    const logout = $("authLogout");
    const email = $("authEmail");
    const password = $("authPassword");
    const heading = $("accountTitle");
    const status = $("authStatus");
    if (![header, section, form, login, signup, logout, email, password, status].every(Boolean)) {
      console.warn("Worknely: Required account elements are missing.");
      return;
    }
    const style = document.createElement("style");
    style.id = "wn-auth-layout-v782";
    style.textContent = `
      .wn-auth-nav { display:flex; align-items:center; justify-content:flex-end; gap:8px; flex-wrap:wrap; margin-left:auto; min-width:0; }
      .wn-auth-btn { box-sizing:border-box; font:inherit; font-size:13px; font-weight:750; border-radius:12px; padding:10px 14px; cursor:pointer; white-space:nowrap; }
      .wn-login { color:#5424ff; background:#fff; border:1px solid #ded7ff; }
      .wn-signup { color:#fff; background:linear-gradient(110deg,#5424ff,#a326e8,#ff23a5); border:0; }
      .wn-account { color:#5424ff; background:#f1edff; border:1px solid #ddd2ff; }
      .wn-account-menu { position:relative; }
      .wn-menu-panel { position:absolute; top:calc(100% + 10px); right:0; z-index:100; min-width:215px; max-width:calc(100vw - 24px); padding:9px; background:#fff; border:1px solid #e8e2fa; border-radius:16px; box-shadow:0 16px 45px #21104c26; }
      .wn-menu-panel a, .wn-menu-panel button { display:block; box-sizing:border-box; width:100%; padding:12px; text-align:left; color:#27144d; background:transparent; border:0; border-radius:10px; font:inherit; font-size:14px; text-decoration:none; cursor:pointer; }
      .wn-menu-panel a:hover, .wn-menu-panel button:hover { background:#f3efff; }
      .wn-menu-divider { height:1px; background:#eee8fa; margin:6px 3px; }
      .wn-menu-pro { color:#7025e8!important; font-weight:750!important; }
      .wn-auth-nav [hidden], .wn-menu-panel[hidden] { display:none!important; }

      /* PREMIUM CONVERSION BANNER */

      .wn-pro-banner {
        box-sizing:border-box;
        position:relative;
        isolation:isolate;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:18px;
        width:100%;
        margin:16px 0 20px;
        padding:18px 20px;
        border:1px solid rgba(116,71,255,.2);
        border-radius:20px;
        background:linear-gradient(115deg,#faf8ff 0%,#f1eaff 52%,#ffeaf9 100%);
        box-shadow:0 10px 30px rgba(84,36,255,.08);
        overflow:hidden;
      }
      .wn-pro-banner::before {
        content:"";
        position:absolute;
        z-index:-1;
        width:170px;
        height:170px;
        border-radius:50%;
        background:radial-gradient(circle,rgba(233,40,200,.16),transparent 70%);
        top:-90px;
        right:70px;
        pointer-events:none;
      }
      .wn-pro-copy {
        display:flex;
        align-items:center;
        gap:12px;
        min-width:0;
      }
      .wn-pro-icon {
        flex:0 0 42px;
        display:grid;
        place-items:center;
        width:42px;
        height:42px;
        border-radius:14px;
        background:linear-gradient(135deg,#5424ff,#e928c8);
        color:#fff;
        font-size:22px;
        box-shadow:0 6px 16px rgba(84,36,255,.18);
      }
      .wn-pro-text { min-width:0; }
      .wn-pro-kicker {
        display:block;
        margin-bottom:4px;
        color:#6725d5;
        font-size:10px;
        font-weight:850;
        letter-spacing:1.6px;
        text-transform:uppercase;
      }
      .wn-pro-title {
        display:block;
        margin:0;
        color:#241442;
        font-size:17px;
        font-weight:850;
        line-height:1.3;
      }
      .wn-pro-subtitle {
        display:block;
        margin-top:4px;
        color:#6f6384;
        font-size:12px;
        line-height:1.5;
      }
      .wn-pro-cta {
        display:inline-flex;
        align-items:center;
        justify-content:center;
        gap:9px;
        flex:0 0 auto;
        min-height:46px;
        padding:12px 19px;
        border:0;
        border-radius:13px;
        background:linear-gradient(105deg,#5424ff,#a326e8,#e928c8);
        color:#fff!important;
        font-size:13px;
        font-weight:800;
        text-decoration:none!important;
        white-space:nowrap;
        box-shadow:0 8px 18px rgba(84,36,255,.2);
        transition:transform .18s ease,box-shadow .18s ease;
      }
      .wn-pro-cta:hover {
        transform:translateY(-2px);
        box-shadow:0 12px 24px rgba(84,36,255,.27);
      }
      .wn-pro-cta:focus-visible {
        outline:3px solid #5424ff;
        outline-offset:3px;
      }

      /* AUTHENTICATION MODAL */

      dialog#wnAuthDialog.wn-dialog {
        box-sizing:border-box!important;
        position:fixed!important;
        inset:0!important;
        margin:auto!important;
        width:440px!important;
        max-width:calc(100vw - 28px)!important;
        min-width:0!important;
        height:fit-content!important;
        max-height:calc(100dvh - 36px)!important;
        padding:0!important;
        border:0!important;
        border-radius:22px!important;
        overflow-x:hidden!important;
        overflow-y:auto!important;
        background:#fff!important;
        color:#261449!important;
        box-shadow:0 24px 80px #1d104d55!important;
        overscroll-behavior:contain;
      }
      dialog#wnAuthDialog.wn-dialog:not([open]) {
        display:none!important;
      }
      dialog#wnAuthDialog.wn-dialog::backdrop {
        background:rgba(22,11,53,.68);
        backdrop-filter:blur(6px);
      }
      #wnAuthDialog,
      #wnAuthDialog *,
      #wnAuthDialog *::before,
      #wnAuthDialog *::after {
        box-sizing:border-box;
      }
      #wnAuthDialog [hidden] {
        display:none!important;
      }
      #wnAuthDialog .wn-dialog-head {
        position:sticky;
        top:0;
        z-index:2;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        width:100%;
        padding:15px 20px;
        background:#fff;
        border-bottom:1px solid #eee8fa;
      }
      #wnAuthDialog .wn-dialog-brand {
        color:#5424ff;
        font-size:21px;
        font-weight:850;
        letter-spacing:-.6px;
      }
      #wnAuthDialog .wn-close {
        display:grid;
        place-items:center;
        flex:0 0 38px;
        width:38px;
        height:38px;
        min-height:38px;
        padding:0;
        border:0;
        border-radius:12px;
        background:#f1edff;
        color:#5424ff;
        font-size:25px;
        cursor:pointer;
      }
      #wnAuthDialog #worknelyAccount.workspace {
        display:block!important;
        position:static!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        margin:0!important;
        padding:22px!important;
        border:0!important;
        border-radius:0!important;
        box-shadow:none!important;
        background:#fff!important;
        overflow:visible!important;
      }
      #wnAuthDialog .section-head {
        display:block!important;
        margin:0 0 20px!important;
        width:100%;
      }
      #wnAuthDialog .section-head > div {
        min-width:0;
      }
      #wnAuthDialog .section-head .overline {
        display:block;
        margin-bottom:10px;
        color:#5424ff;
        font-size:11px;
        font-weight:800;
        letter-spacing:2px;
      }
      #wnAuthDialog #accountTitle {
        margin:0 0 8px!important;
        color:#261449;
        font-size:clamp(25px,6vw,31px);
        font-weight:800;
        line-height:1.2;
        letter-spacing:-.7px;
      }
      #wnAuthDialog .section-head p {
        margin:0!important;
        color:#7d8298;
        font-size:14px;
        line-height:1.5;
      }
      #wnAuthDialog #worknelyAuthForm {
        display:grid!important;
        grid-template-columns:minmax(0,1fr)!important;
        gap:14px!important;
        width:100%!important;
        max-width:100%!important;
        margin:0!important;
        padding:0!important;
      }
      #wnAuthDialog #worknelyAuthForm > label {
        display:flex!important;
        flex-direction:column!important;
        gap:7px!important;
        width:100%!important;
        min-width:0!important;
        margin:0!important;
        padding:0!important;
        color:#261449;
        font-size:14px;
        font-weight:650;
      }
      #wnAuthDialog #authEmail,
      #wnAuthDialog #authPassword {
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        height:49px!important;
        min-height:49px!important;
        margin:0!important;
        padding:12px 14px!important;
        border:1px solid #dedfee!important;
        border-radius:12px!important;
        background:#fbfbfe!important;
        color:#261449!important;
        font-size:16px!important;
        font-weight:400!important;
        box-shadow:none!important;
        -webkit-appearance:none;
        appearance:none;
      }
      #wnAuthDialog #authEmail:focus,
      #wnAuthDialog #authPassword:focus {
        border-color:#5424ff!important;
        outline:2px solid rgba(84,36,255,.15);
        outline-offset:1px;
      }
      #wnAuthDialog .wn-forgot-row {
        display:flex!important;
        justify-content:flex-end;
        width:100%;
        margin:-5px 0 0;
        padding:0;
      }
      #wnAuthDialog .wn-forgot-row[hidden] {
        display:none!important;
      }
      #wnAuthDialog #wnResetPassword,
      #wnAuthDialog #wnResendConfirmation {
        display:inline-block!important;
        width:auto!important;
        max-width:100%!important;
        min-width:0!important;
        min-height:0!important;
        height:auto!important;
        margin:0!important;
        padding:4px 2px!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        color:#5424ff!important;
        box-shadow:none!important;
        font:inherit!important;
        font-size:13px!important;
        font-weight:700!important;
        line-height:1.5!important;
        text-align:center!important;
        cursor:pointer;
      }
      #wnAuthDialog #wnResetPassword[hidden],
      #wnAuthDialog #wnResendConfirmation[hidden] {
        display:none!important;
      }
      #wnAuthDialog #worknelyAuthForm > .actions {
        display:flex!important;
        flex-direction:column!important;
        gap:10px!important;
        width:100%!important;
        margin:2px 0 0!important;
        padding:0!important;
      }
      #wnAuthDialog #authLogin,
      #wnAuthDialog #authSignUp,
      #wnAuthDialog #wnUpdatePassword {
        display:block!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        min-height:50px!important;
        margin:0!important;
        padding:12px 16px!important;
        border:0!important;
        border-radius:13px!important;
        background:linear-gradient(110deg,#5424ff,#a326e8)!important;
        color:#fff!important;
        box-shadow:none!important;
        font:inherit!important;
        font-size:16px!important;
        font-weight:750!important;
        text-align:center!important;
        cursor:pointer;
      }
      #wnAuthDialog #authLogin[hidden],
      #wnAuthDialog #authSignUp[hidden],
      #wnAuthDialog #wnUpdatePassword[hidden],
      #wnAuthDialog #authLogout[hidden] {
        display:none!important;
      }
      #wnAuthDialog #wnSecurityActions {
        display:contents!important;
      }
      #wnAuthDialog .wn-auth-switch {
        display:flex;
        justify-content:center;
        align-items:center;
        flex-wrap:wrap;
        gap:5px;
        margin:14px 0 0;
        color:#786c90;
        font-size:13px;
        text-align:center;
      }
      #wnAuthDialog .wn-auth-switch button {
        width:auto!important;
        min-height:0!important;
        padding:2px!important;
        border:0!important;
        background:transparent!important;
        color:#5424ff!important;
        box-shadow:none!important;
        font:inherit!important;
        font-weight:750!important;
        cursor:pointer;
      }
      #wnAuthDialog .wn-auth-support {
        margin:17px 0 0;
        padding:15px 0 0;
        border-top:1px solid #eee8fa;
        text-align:center;
      }
      #wnAuthDialog .wn-auth-support p {
        margin:0 0 5px;
        color:#857993;
        font-size:12px;
        line-height:1.5;
      }
      #wnAuthDialog #authStatus {
        width:100%;
        min-width:0;
        margin:12px 0 0;
        overflow-wrap:anywhere;
        font-size:13px;
        line-height:1.5;
      }
      #wnAuthDialog #authStatus:empty {
        display:none!important;
      }

      /* MOBILE OPTIMIZATION */

      @media(max-width:600px) {
        .top {
          flex-wrap:wrap;
          gap:10px;
        }
        .wn-auth-nav {
          gap:6px;
        }
        .wn-auth-btn {
          padding:9px 11px;
          font-size:12px;
        }
        .wn-pro-banner {
          flex-direction:column;
          align-items:stretch;
          gap:14px;
          padding:16px;
          margin:12px 0 18px;
          border-radius:18px;
        }
        .wn-pro-copy {
          align-items:flex-start;
        }
        .wn-pro-title {
          font-size:16px;
        }
        .wn-pro-cta {
          width:100%;
          min-height:47px;
        }
        dialog#wnAuthDialog.wn-dialog {
          width:calc(100vw - 24px)!important;
          max-width:calc(100vw - 24px)!important;
          border-radius:20px!important;
        }
        #wnAuthDialog .wn-dialog-head {
          padding:13px 17px;
        }
        #wnAuthDialog #worknelyAccount.workspace {
          padding:19px 18px!important;
        }
      }
      @media(max-width:360px) {
        #wnAuthDialog #worknelyAccount.workspace {
          padding:17px 14px!important;
        }
      }
      @media(prefers-reduced-motion:reduce) {
        .wn-pro-cta {
          transition:none;
        }
      }
    `;
    document.head.appendChild(style);

    /* ACCOUNT NAVIGATION */

    const nav = document.createElement("div");
    nav.className = "wn-auth-nav";
    nav.setAttribute("aria-label", "Account navigation");

    const makeButton = (label, className) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "wn-auth-btn " + className;
      button.textContent = label;
      return button;
    };

    const loginBtn = makeButton("Log In", "wn-login");
    const signupBtn = makeButton("Sign Up", "wn-signup");

    const accountWrap = document.createElement("div");
    accountWrap.className = "wn-account-menu";
    accountWrap.hidden = true;

    const accountBtn = makeButton("My Account ▾", "wn-account");
    accountBtn.setAttribute("aria-expanded", "false");
    accountBtn.setAttribute("aria-haspopup", "true");

    const menu = document.createElement("div");
    menu.className = "wn-menu-panel";
    menu.hidden = true;

    const closeMenu = () => {
      menu.hidden = true;
      accountBtn.setAttribute("aria-expanded", "false");
    };

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
      menuLink("Resume Builder", "index.html#builder"),
      menuLink("Pricing & Plans", "pricing.html"),
      menuLink("Upgrade to Pro", "pricing.html", "wn-menu-pro"),
      divider,
      logoutBtn
    );

    accountWrap.append(accountBtn, menu);
    nav.append(loginBtn, signupBtn, accountWrap);
    header.appendChild(nav);

    /* PREMIUM CONVERSION BANNER */

    const banner = document.createElement("aside");
    banner.className = "wn-pro-banner";
    banner.setAttribute("aria-label", "Explore Worknely Pro plans");

    const copy = document.createElement("div");
    copy.className = "wn-pro-copy";

    const icon = document.createElement("span");
    icon.className = "wn-pro-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "✦";

    const textWrap = document.createElement("div");
    textWrap.className = "wn-pro-text";

    const kicker = document.createElement("span");
    kicker.className = "wn-pro-kicker";
    kicker.textContent = "WORKNELY PRO";

    const title = document.createElement("strong");
    title.className = "wn-pro-title";
    title.textContent = "Unlock more possibilities for your career";

    const subtitle = document.createElement("span");
    subtitle.className = "wn-pro-subtitle";
    subtitle.textContent =
      "Explore upcoming Pro & Premium features. No payment required.";

    textWrap.append(kicker, title, subtitle);
    copy.append(icon, textWrap);

    const cta = document.createElement("a");
    cta.className = "wn-pro-cta";
    cta.href = "pricing.html";
    cta.textContent = "Explore Pro Plans  →";

    banner.append(copy, cta);
    header.insertAdjacentElement("afterend", banner);

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

    const intro = section.querySelector(".section-head p");

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

    support.appendChild(supportText);

    form.insertAdjacentElement("afterend", switchRow);
    switchRow.insertAdjacentElement("afterend", support);

    const forgotRow = document.createElement("div");
    forgotRow.className = "wn-forgot-row";

    const passwordLabel = password.closest("label");

    if (passwordLabel) {
      passwordLabel.insertAdjacentElement("afterend", forgotRow);
    }

    let mode = "login";
    let securityReady = false;

    function isRecovery() {
      const update = $("wnUpdatePassword");
      return !!(update && !update.hidden);
    }

    function setMode(nextMode) {
      mode = nextMode === "signup" ? "signup" : "login";

      if (isRecovery()) return;

      if (heading) {
        heading.textContent = mode === "signup"
          ? "Create your account"
          : "Welcome back";
      }

      if (intro) {
        intro.textContent = mode === "signup"
          ? "Create your account to save and manage your resumes."
          : "Sign in to access your saved resumes.";
      }

      if (logout.hidden) {
        login.hidden = mode !== "login";
        signup.hidden = mode !== "signup";
      }

      const forgot = $("wnResetPassword");
      const resend = $("wnResendConfirmation");

      if (forgot) forgot.hidden = mode !== "login";
      if (resend) resend.hidden = mode !== "login";

      forgotRow.hidden = mode !== "login" || !forgot;
      support.hidden = mode !== "login" || !resend;
      switchRow.hidden = false;

      switchText.textContent = mode === "login"
        ? "Don't have an account?"
        : "Already have an account?";

      switchButton.textContent = mode === "login"
        ? "Sign Up"
        : "Log In";

      password.autocomplete = mode === "signup"
        ? "new-password"
        : "current-password";
    }

    function positionSecurityControls() {
      const security = $("wnSecurityActions");
      const forgot = $("wnResetPassword");
      const resend = $("wnResendConfirmation");
      const update = $("wnUpdatePassword");

      if (!security || !forgot || !resend || !update) {
        return false;
      }

      if (!securityReady) {
        forgotRow.appendChild(forgot);
        support.appendChild(resend);

        const actions = form.querySelector(":scope > .actions");

        if (actions) {
          actions.appendChild(update);
        }

        securityReady = true;
      }

      return true;
    }

    function syncSecurity() {
      if (!positionSecurityControls()) return;

      if (isRecovery()) {
        if (heading) {
          heading.textContent = "Set a new password";
        }

        if (intro) {
          intro.textContent =
            "Enter your new password to finish account recovery.";
        }

        forgotRow.hidden = true;
        support.hidden = true;
        switchRow.hidden = true;
      } else {
        setMode(mode);
      }
    }

    /* ASYNCHRONOUS SECURITY CONTROLS */

    const securityObserver = new MutationObserver(() => {
      if (positionSecurityControls()) {
        securityObserver.disconnect();
        syncSecurity();

        const update = $("wnUpdatePassword");

        if (update) {
          new MutationObserver(() => {
            syncSecurity();

            if (isRecovery() && !dialog.open) {
              dialog.showModal();
            }
          }).observe(update, {
            attributes: true,
            attributeFilter: ["hidden"]
          });
        }
      }
    });

    securityObserver.observe(form, {
      childList: true,
      subtree: true
    });

    syncSecurity();

    function closeDialog() {
      if (dialog.open) dialog.close();
    }

    function openAuth(nextMode) {
      closeMenu();

      if (isRecovery()) {
        syncSecurity();
      } else {
        setMode(nextMode);
      }

      if (!dialog.open) dialog.showModal();
    }

    /* SESSION UI */

    function syncAuth() {
      const authenticated = !logout.hidden;

      loginBtn.hidden = authenticated;
      signupBtn.hidden = authenticated;
      accountWrap.hidden = !authenticated;

      if (authenticated && dialog.open && !isRecovery()) {
        closeDialog();
      }

      if (!authenticated) closeMenu();
    }

    /* EVENTS */

    loginBtn.addEventListener("click", () => {
      openAuth("login");
    });

    signupBtn.addEventListener("click", () => {
      openAuth("signup");
    });

    switchButton.addEventListener("click", () => {
      setMode(mode === "login" ? "signup" : "login");
    });

    closeBtn.addEventListener("click", closeDialog);

    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();

      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (outside) closeDialog();
    });

    accountBtn.addEventListener("click", () => {
      const opening = menu.hidden;
      menu.hidden = !opening;
      accountBtn.setAttribute("aria-expanded", String(opening));
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

    new MutationObserver(syncAuth).observe(logout, {
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
