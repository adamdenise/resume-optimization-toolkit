
/*
 * WORKNELY V7.20.8.1
 * International SaaS Interface
 * Career Intelligence Account Navigation
 * Six International Languages
 * Authentication & Account Navigation
 * Responsive Authentication Modal
 * Premium Conversion Banner
 * Persistent Localization Integration
 *
 * WORKNELY — PEOPLE TECHNOLOGY
 */

(() => {

  "use strict";

  const VERSION = "7.20.8.1";

  const keys = [
    "login",
    "signup",
    "logout",
    "account",
    "dashboard",
    "resumes",
    "builder",
    "pricing",
    "upgrade",
    "welcome",
    "createAccount",
    "loginIntro",
    "signupIntro",
    "noAccount",
    "hasAccount",
    "confirmationHelp",
    "recoveryTitle",
    "recoveryIntro",
    "close",
    "navigation",
    "accountDialog",
    "proTitle",
    "proSubtitle",
    "proCta",
    "proLabel",
    "accountOverline",
    "careerIntelligence",
    "professionalDashboard",
    "jobTracker"
  ];

  const dictionary = {

    en: [
      "Log In",
      "Sign Up",
      "Log Out",
      "My Account",
      "My Dashboard",
      "My Resumes",
      "Resume Builder",
      "Pricing & Plans",
      "Upgrade to Pro",
      "Welcome back",
      "Create your account",
      "Sign in to access your saved resumes.",
      "Create your account to save and manage your resumes.",
      "Don't have an account?",
      "Already have an account?",
      "Didn't receive your confirmation email?",
      "Set a new password",
      "Enter your new password to finish account recovery.",
      "Close",
      "Account navigation",
      "Worknely account",
      "Unlock more possibilities for your career",
      "Explore upcoming Pro & Premium features. No payment required.",
      "Explore Pro Plans",
      "Explore Worknely Pro plans",
      "YOUR WORKNELY ACCOUNT",
      "Career Intelligence",
      "Professional Dashboard",
      "Job Application Tracker"
    ],

    ro: [
      "Autentificare",
      "Înregistrare",
      "Deconectare",
      "Contul meu",
      "Panoul meu",
      "CV-urile mele",
      "Creator de CV",
      "Prețuri și abonamente",
      "Treci la Pro",
      "Bine ai revenit",
      "Creează-ți contul",
      "Autentifică-te pentru a accesa CV-urile salvate.",
      "Creează-ți un cont pentru a salva și gestiona CV-urile tale.",
      "Nu ai un cont?",
      "Ai deja un cont?",
      "Nu ai primit e-mailul de confirmare?",
      "Setează o parolă nouă",
      "Introdu noua parolă pentru a finaliza recuperarea contului.",
      "Închide",
      "Navigarea contului",
      "Cont Worknely",
      "Descoperă mai multe oportunități pentru cariera ta",
      "Explorează viitoarele funcții Pro și Premium. Nu este necesară nicio plată.",
      "Explorează planurile Pro",
      "Explorează abonamentele Worknely Pro",
      "CONTUL TĂU WORKNELY",
      "Inteligență profesională",
      "Tablou de bord profesional",
      "Monitorizare candidaturi"
    ],

    it: [
      "Accedi",
      "Registrati",
      "Esci",
      "Il mio account",
      "La mia dashboard",
      "I miei CV",
      "Crea CV",
      "Prezzi e piani",
      "Passa a Pro",
      "Bentornato",
      "Crea il tuo account",
      "Accedi per consultare i tuoi CV salvati.",
      "Crea il tuo account per salvare e gestire i tuoi CV.",
      "Non hai un account?",
      "Hai già un account?",
      "Non hai ricevuto l’e-mail di conferma?",
      "Imposta una nuova password",
      "Inserisci la nuova password per completare il recupero dell’account.",
      "Chiudi",
      "Navigazione account",
      "Account Worknely",
      "Scopri nuove possibilità per la tua carriera",
      "Esplora le prossime funzionalità Pro e Premium. Nessun pagamento richiesto.",
      "Esplora i piani Pro",
      "Esplora i piani Worknely Pro",
      "IL TUO ACCOUNT WORKNELY",
      "Intelligenza professionale",
      "Dashboard professionale",
      "Gestione candidature"
    ],

    de: [
      "Anmelden",
      "Registrieren",
      "Abmelden",
      "Mein Konto",
      "Mein Dashboard",
      "Meine Lebensläufe",
      "Lebenslauf erstellen",
      "Preise und Tarife",
      "Zu Pro wechseln",
      "Willkommen zurück",
      "Erstelle dein Konto",
      "Melde dich an, um deine gespeicherten Lebensläufe aufzurufen.",
      "Erstelle ein Konto, um deine Lebensläufe zu speichern und zu verwalten.",
      "Noch kein Konto?",
      "Du hast bereits ein Konto?",
      "Keine Bestätigungs-E-Mail erhalten?",
      "Neues Passwort festlegen",
      "Gib dein neues Passwort ein, um die Kontowiederherstellung abzuschließen.",
      "Schließen",
      "Kontonavigation",
      "Worknely-Konto",
      "Entdecke neue Möglichkeiten für deine Karriere",
      "Entdecke kommende Pro- und Premium-Funktionen. Keine Zahlung erforderlich.",
      "Pro-Tarife entdecken",
      "Worknely Pro-Tarife entdecken",
      "DEIN WORKNELY-KONTO",
      "Karriere-Intelligenz",
      "Professionelles Dashboard",
      "Bewerbungsübersicht"
    ],

    fr: [
      "Connexion",
      "Inscription",
      "Déconnexion",
      "Mon compte",
      "Mon tableau de bord",
      "Mes CV",
      "Créer un CV",
      "Tarifs et offres",
      "Passer à Pro",
      "Bon retour",
      "Créez votre compte",
      "Connectez-vous pour accéder à vos CV enregistrés.",
      "Créez votre compte pour enregistrer et gérer vos CV.",
      "Vous n’avez pas de compte ?",
      "Vous avez déjà un compte ?",
      "Vous n’avez pas reçu l’e-mail de confirmation ?",
      "Définir un nouveau mot de passe",
      "Saisissez votre nouveau mot de passe pour terminer la récupération du compte.",
      "Fermer",
      "Navigation du compte",
      "Compte Worknely",
      "Découvrez de nouvelles possibilités pour votre carrière",
      "Découvrez les prochaines fonctionnalités Pro et Premium. Aucun paiement requis.",
      "Découvrir les offres Pro",
      "Découvrir les offres Worknely Pro",
      "VOTRE COMPTE WORKNELY",
      "Intelligence de carrière",
      "Tableau de bord professionnel",
      "Suivi des candidatures"
    ],

    es: [
      "Iniciar sesión",
      "Registrarse",
      "Cerrar sesión",
      "Mi cuenta",
      "Mi panel",
      "Mis currículums",
      "Crear currículum",
      "Precios y planes",
      "Pasar a Pro",
      "Bienvenido de nuevo",
      "Crea tu cuenta",
      "Inicia sesión para acceder a tus currículums guardados.",
      "Crea tu cuenta para guardar y gestionar tus currículums.",
      "¿No tienes una cuenta?",
      "¿Ya tienes una cuenta?",
      "¿No has recibido el correo de confirmación?",
      "Establece una nueva contraseña",
      "Introduce tu nueva contraseña para completar la recuperación de la cuenta.",
      "Cerrar",
      "Navegación de la cuenta",
      "Cuenta Worknely",
      "Descubre nuevas posibilidades para tu carrera",
      "Explora las próximas funciones Pro y Premium. No se requiere ningún pago.",
      "Explorar planes Pro",
      "Explorar los planes Worknely Pro",
      "TU CUENTA WORKNELY",
      "Inteligencia profesional",
      "Panel profesional",
      "Seguimiento de candidaturas"
    ]

  };

  function getLanguage() {

    const value =
      window.WorknelyLocalization?.getLanguage() ||
      document.getElementById("language")?.value ||
      document.documentElement.lang ||
      "en";

    const language = String(value)
      .toLowerCase()
      .split("-")[0];

    return Object.prototype.hasOwnProperty.call(
      dictionary,
      language
    ) ? language : "en";

  }

  function t(key) {

    const index = keys.indexOf(key);

    if (index < 0) return key;

    return dictionary[getLanguage()][index] ||
      dictionary.en[index];

  }

  function setText(element, value) {

    if (element && element.textContent !== value) {
      element.textContent = value;
    }

  }

  function initialize() {

    if (document.getElementById("wnAuthDialog")) {
      return;
    }

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

    if (![header, section, form, login, signup,
          logout, email, password, status].every(Boolean)) {

      console.warn(
        "Worknely: Required account elements are missing."
      );

      return;

    }

    /* INTERNATIONAL AUTHENTICATION STYLES */

    const style = document.createElement("style");

    style.id = "wn-auth-layout-v715";

    style.textContent = `

      body .wn-auth-nav {
        display:flex;
        align-items:center;
        justify-content:flex-end;
        flex-wrap:nowrap;
        gap:6px;
        margin-left:auto;
        min-width:0;
      }

      body .wn-auth-nav .wn-auth-btn {
        box-sizing:border-box;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        flex:0 0 auto;
        width:auto;
        min-width:0;
        height:40px;
        min-height:40px;
        max-height:40px;
        padding:8px 12px;
        border-radius:9px;
        font-family:inherit;
        font-size:12px;
        font-weight:750;
        line-height:1.3;
        cursor:pointer;
        white-space:nowrap;
      }

      body .wn-auth-nav .wn-login {
        color:#5424ff!important;
        background:#fff!important;
        border:1px solid #ded7ff!important;
        -webkit-text-fill-color:#5424ff!important;
      }

      body .wn-auth-nav .wn-signup {
        color:#fff!important;
        background:linear-gradient(
          105deg,#5424ff,#ff24a8
        )!important;
        border:0!important;
        -webkit-text-fill-color:#fff!important;
      }

      body .wn-auth-nav .wn-account {
        color:#5424ff!important;
        background:#f1edff!important;
        border:1px solid #ddd2ff!important;
        -webkit-text-fill-color:#5424ff!important;
      }

      .wn-account-menu {
        position:relative;
        min-width:0;
      }

      body .wn-menu-panel {
        position:absolute;
        top:calc(100% + 7px);
        right:0;
        z-index:1000;
        min-width:185px;
        max-width:calc(100vw - 24px);
        max-height:65vh;
        max-height:65dvh;
        overflow-y:auto;
        overscroll-behavior:contain;
        padding:6px;
        background:#fff;
        border:1px solid #e8e2fa;
        border-radius:12px;
        box-shadow:0 12px 32px #21104c26;
      }

      body .wn-menu-panel a,
      body .wn-menu-panel button {
        display:flex;
        align-items:center;
        box-sizing:border-box;
        width:100%;
        min-width:0;
        min-height:36px;
        height:auto;
        padding:8px 10px;
        text-align:left;
        color:#27144d;
        background:transparent;
        border:0;
        border-radius:8px;
        font-family:inherit;
        font-size:12px;
        line-height:1.4;
        text-decoration:none;
        white-space:normal;
        overflow-wrap:anywhere;
        cursor:pointer;
      }

      .wn-menu-panel a:hover,
      .wn-menu-panel button:hover {
        background:#f3efff;
      }

      .wn-menu-divider {
        height:1px;
        background:#eee8fa;
        margin:4px 3px;
      }

      .wn-menu-pro {
        color:#7025e8!important;
        font-weight:750!important;
      }

      body .wn-menu-panel .wn-menu-career {
        color:#5424ff!important;
        font-weight:750!important;
      }

      body .wn-menu-panel .wn-menu-career[aria-current="page"] {
        background:#f1edff!important;
      }

      body .wn-menu-panel a:focus-visible,
      body .wn-menu-panel button:focus-visible {
        outline:2px solid #5424ff;
        outline-offset:-2px;
      }

      body .wn-auth-nav [hidden],
      body .wn-auth-nav .wn-auth-btn[hidden],
      body .wn-auth-nav .wn-account-menu[hidden],
      body .wn-menu-panel[hidden],
      body .shell header.top .wn-auth-nav .wn-auth-btn[hidden],
      body .shell header.top .wn-auth-nav .wn-account-menu[hidden],
      body .shell header.top .wn-auth-nav .wn-menu-panel[hidden] {
        display:none!important;
      }

      body .wn-pro-banner {
        box-sizing:border-box;
        position:relative;
        isolation:isolate;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
        width:100%;
        margin:10px 0 12px;
        padding:12px 14px;
        border:1px solid rgba(116,71,255,.2);
        border-radius:13px;
        background:linear-gradient(
          115deg,#faf8ff 0%,#f1eaff 52%,#ffeaf9 100%
        );
        box-shadow:0 5px 18px rgba(84,36,255,.06);
        overflow:hidden;
      }

      .wn-pro-banner::before {
        content:"";
        position:absolute;
        z-index:-1;
        width:120px;
        height:120px;
        border-radius:50%;
        background:radial-gradient(
          circle,rgba(233,40,200,.16),transparent 70%
        );
        top:-65px;
        right:50px;
        pointer-events:none;
      }

      body .wn-pro-copy {
        display:flex;
        align-items:center;
        gap:9px;
        min-width:0;
      }

      body .wn-pro-icon {
        flex:0 0 34px;
        display:grid;
        place-items:center;
        width:34px;
        height:34px;
        border-radius:9px;
        background:linear-gradient(
          135deg,#5424ff,#ff24a8
        );
        color:#fff;
        font-size:18px;
        box-shadow:0 4px 12px rgba(84,36,255,.14);
      }

      .wn-pro-text {
        min-width:0;
      }

      body .wn-pro-kicker {
        display:block;
        margin-bottom:3px;
        color:#6725d5;
        font-size:9px;
        font-weight:850;
        letter-spacing:1.2px;
        text-transform:uppercase;
      }

      body .wn-pro-title {
        display:block;
        margin:0;
        color:#241442;
        font-size:14px;
        font-weight:800;
        line-height:1.35;
        overflow-wrap:anywhere;
      }

      body .wn-pro-subtitle {
        display:block;
        margin-top:3px;
        color:#6f6384;
        font-size:11px;
        line-height:1.45;
        overflow-wrap:anywhere;
      }

      body .wn-pro-cta {
        box-sizing:border-box;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        flex:0 0 auto;
        gap:6px;
        height:auto;
        min-height:40px;
        max-width:100%;
        padding:8px 12px;
        border:0;
        border-radius:9px;
        background:linear-gradient(
          105deg,#5424ff,#ff24a8
        );
        color:#fff!important;
        -webkit-text-fill-color:#fff!important;
        font-size:12px;
        font-weight:750;
        line-height:1.3;
        text-align:center;
        text-decoration:none!important;
        white-space:normal;
        box-shadow:0 4px 12px rgba(84,36,255,.14);
      }

      .wn-pro-cta:focus-visible {
        outline:3px solid #5424ff;
        outline-offset:3px;
      }

      body dialog#wnAuthDialog.wn-dialog {
        box-sizing:border-box!important;
        position:fixed!important;
        inset:0!important;
        margin:auto!important;
        width:400px!important;
        max-width:calc(100vw - 24px)!important;
        min-width:0!important;
        height:fit-content!important;
        min-height:0!important;
        max-height:calc(100vh - 28px)!important;
        max-height:calc(100dvh - 28px)!important;
        padding:0!important;
        border:0!important;
        border-radius:16px!important;
        overflow-x:hidden!important;
        overflow-y:auto!important;
        background:#fff!important;
        color:#261449!important;
        box-shadow:0 18px 60px #1d104d45!important;
        overscroll-behavior:contain;
      }

      body dialog#wnAuthDialog.wn-dialog[open] {
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        pointer-events:auto!important;
        transform:none!important;
      }

      body dialog#wnAuthDialog.wn-dialog:not([open]) {
        display:none!important;
      }

      dialog#wnAuthDialog.wn-dialog::backdrop {
        background:rgba(22,11,53,.62);
        backdrop-filter:blur(5px);
      }

      #wnAuthDialog,
      #wnAuthDialog *,
      #wnAuthDialog *::before,
      #wnAuthDialog *::after {
        box-sizing:border-box;
      }

      body #wnAuthDialog [hidden] {
        display:none!important;
      }

      body #wnAuthDialog .wn-dialog-head {
        position:sticky;
        top:0;
        z-index:2;
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:8px;
        width:100%;
        padding:10px 14px;
        background:#fff;
        border-bottom:1px solid #eee8fa;
      }

      body #wnAuthDialog .wn-dialog-brand {
        color:#5424ff!important;
        -webkit-text-fill-color:#5424ff!important;
        font-size:19px;
        font-weight:850;
        letter-spacing:-.5px;
      }

      body #wnAuthDialog .wn-close {
        display:grid!important;
        place-items:center!important;
        flex:0 0 36px!important;
        width:36px!important;
        height:36px!important;
        min-height:36px!important;
        max-height:36px!important;
        padding:0!important;
        margin:0!important;
        border:0!important;
        border-radius:9px!important;
        background:#f1edff!important;
        color:#5424ff!important;
        -webkit-text-fill-color:#5424ff!important;
        font-size:23px!important;
        line-height:1!important;
        cursor:pointer;
      }

      body #wnAuthDialog #worknelyAccount {
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        pointer-events:auto!important;
        position:static!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        height:auto!important;
        min-height:0!important;
        margin:0!important;
        padding:16px!important;
        border:0!important;
        border-radius:0!important;
        box-shadow:none!important;
        background:#fff!important;
        color:#261449!important;
        overflow:visible!important;
        transform:none!important;
      }

      body #wnAuthDialog .section-head {
        display:block!important;
        width:100%!important;
        margin:0 0 12px!important;
      }

      #wnAuthDialog .section-head > div {
        min-width:0;
      }

      body #wnAuthDialog .section-head .overline {
        display:block;
        margin-bottom:6px;
        color:#5424ff;
        font-size:10px;
        font-weight:800;
        letter-spacing:1.4px;
      }

      body #wnAuthDialog #accountTitle {
        margin:0 0 5px!important;
        color:#261449!important;
        -webkit-text-fill-color:#261449!important;
        font-size:clamp(23px,6vw,28px);
        font-weight:800;
        line-height:1.2;
        letter-spacing:-.6px;
        overflow-wrap:anywhere;
      }

      body #wnAuthDialog .section-head p {
        margin:0!important;
        color:#706780!important;
        font-size:13px;
        line-height:1.5;
      }

      body #wnAuthDialog #worknelyAuthForm {
        display:grid!important;
        visibility:visible!important;
        opacity:1!important;
        grid-template-columns:minmax(0,1fr)!important;
        grid-template-rows:none!important;
        grid-auto-rows:auto!important;
        align-content:start!important;
        align-items:start!important;
        gap:10px!important;
        width:100%!important;
        max-width:100%!important;
        height:auto!important;
        min-height:0!important;
        max-height:none!important;
        margin:0!important;
        padding:0!important;
      }

      body #wnAuthDialog #worknelyAuthForm > label {
        display:flex!important;
        flex-direction:column!important;
        gap:5px!important;
        width:100%!important;
        min-width:0!important;
        height:auto!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
        color:#261449!important;
        font-size:13px;
        font-weight:650;
      }

      body #wnAuthDialog #authEmail,
      body #wnAuthDialog #authPassword {
        display:block!important;
        box-sizing:border-box!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        height:44px!important;
        min-height:44px!important;
        max-height:44px!important;
        flex:0 0 44px!important;
        margin:0!important;
        padding:9px 12px!important;
        border:1px solid #dedfee!important;
        border-radius:9px!important;
        background:#fbfbfe!important;
        color:#261449!important;
        -webkit-text-fill-color:#261449!important;
        caret-color:#5424ff;
        font-family:inherit!important;
        font-size:16px!important;
        font-weight:400!important;
        line-height:1.4!important;
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

      body #wnAuthDialog .wn-forgot-row {
        display:flex!important;
        justify-content:flex-end!important;
        align-items:center!important;
        width:100%!important;
        height:auto!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
      }

      body #wnAuthDialog .wn-forgot-row[hidden] {
        display:none!important;
      }

      body #wnAuthDialog #wnResetPassword,
      body #wnAuthDialog #wnResendConfirmation {
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        flex:0 0 auto!important;
        width:auto!important;
        max-width:100%!important;
        min-width:0!important;
        height:auto!important;
        min-height:32px!important;
        max-height:none!important;
        margin:0!important;
        padding:5px 2px!important;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        color:#5424ff!important;
        -webkit-text-fill-color:#5424ff!important;
        box-shadow:none!important;
        font-family:inherit!important;
        font-size:12px!important;
        font-weight:700!important;
        line-height:1.4!important;
        text-align:center!important;
        white-space:normal!important;
        cursor:pointer;
      }

      body #wnAuthDialog #wnResetPassword[hidden],
      body #wnAuthDialog #wnResendConfirmation[hidden] {
        display:none!important;
      }

      body #wnAuthDialog #worknelyAuthForm > .actions {
        display:flex!important;
        flex-direction:column!important;
        flex:0 0 auto!important;
        align-items:stretch!important;
        align-content:start!important;
        justify-content:flex-start!important;
        align-self:start!important;
        gap:8px!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        height:auto!important;
        min-height:0!important;
        max-height:none!important;
        margin:0!important;
        padding:0!important;
      }

      body #wnAuthDialog #worknelyAuthForm #authLogin,
      body #wnAuthDialog #worknelyAuthForm #authSignUp,
      body #wnAuthDialog #worknelyAuthForm #wnUpdatePassword,
      body #wnAuthDialog #worknelyAuthForm #authLogout {
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        align-self:stretch!important;
        box-sizing:border-box!important;
        flex:0 0 44px!important;
        flex-grow:0!important;
        flex-shrink:0!important;
        flex-basis:44px!important;
        width:100%!important;
        max-width:100%!important;
        min-width:0!important;
        height:44px!important;
        min-height:44px!important;
        max-height:44px!important;
        block-size:44px!important;
        min-block-size:44px!important;
        max-block-size:44px!important;
        margin:0!important;
        padding:0 14px!important;
        border:0!important;
        border-radius:10px!important;
        background:linear-gradient(
          105deg,#5424ff,#a326e8,#ff24a8
        )!important;
        color:#fff!important;
        -webkit-text-fill-color:#fff!important;
        box-shadow:none!important;
        font-family:inherit!important;
        font-size:14px!important;
        font-weight:750!important;
        line-height:1.2!important;
        text-align:center!important;
        white-space:normal!important;
        transform:none!important;
        cursor:pointer;
      }

      body #wnAuthDialog #worknelyAuthForm #authLogin:disabled,
      body #wnAuthDialog #worknelyAuthForm #authSignUp:disabled,
      body #wnAuthDialog #worknelyAuthForm #wnUpdatePassword:disabled,
      body #wnAuthDialog #worknelyAuthForm #authLogout:disabled {
        opacity:.65!important;
        cursor:not-allowed!important;
      }

      body #wnAuthDialog #worknelyAuthForm #authLogin[hidden],
      body #wnAuthDialog #worknelyAuthForm #authSignUp[hidden],
      body #wnAuthDialog #worknelyAuthForm #wnUpdatePassword[hidden],
      body #wnAuthDialog #worknelyAuthForm #authLogout[hidden] {
        display:none!important;
      }

      body #wnAuthDialog #wnSecurityActions {
        display:contents!important;
      }

      body #wnAuthDialog .wn-auth-switch {
        display:flex;
        justify-content:center;
        align-items:center;
        flex-wrap:wrap;
        gap:5px;
        margin:9px 0 0;
        color:#786c90;
        font-size:12px;
        line-height:1.4;
        text-align:center;
      }

      body #wnAuthDialog .wn-auth-switch button {
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        flex:0 0 auto!important;
        width:auto!important;
        min-width:0!important;
        height:auto!important;
        min-height:32px!important;
        max-height:none!important;
        padding:4px 2px!important;
        border:0!important;
        background:transparent!important;
        color:#5424ff!important;
        -webkit-text-fill-color:#5424ff!important;
        box-shadow:none!important;
        font-family:inherit!important;
        font-size:12px!important;
        font-weight:750!important;
        line-height:1.4!important;
        cursor:pointer;
      }

      body #wnAuthDialog .wn-auth-support {
        margin:8px 0 0;
        padding:9px 0 0;
        border-top:1px solid #eee8fa;
        text-align:center;
      }

      body #wnAuthDialog .wn-auth-support p {
        margin:0 0 2px;
        color:#857993;
        font-size:11px;
        line-height:1.5;
      }

      body #wnAuthDialog #authStatus {
        box-sizing:border-box!important;
        width:100%!important;
        min-width:0!important;
        height:auto!important;
        min-height:0!important;
        margin:8px 0 0!important;
        padding:8px 10px!important;
        border:1px solid #e1d7ff!important;
        border-radius:8px!important;
        background:#f3efff!important;
        color:#5424ff!important;
        overflow-wrap:anywhere;
        font-size:12px!important;
        font-weight:500!important;
        line-height:1.5;
      }

      body #wnAuthDialog #authStatus:empty {
        display:none!important;
      }

      body #wnAuthDialog #authStatus[data-wn-auth-status="success"] {
        color:#08784c!important;
        background:#ecfdf4!important;
        border-color:#b7efd1!important;
      }

      body #wnAuthDialog #authStatus[data-wn-auth-status="error"] {
        color:#b42332!important;
        background:#fff1f2!important;
        border-color:#fecdd3!important;
      }

      body #wnAuthDialog #authStatus[data-wn-auth-status="info"] {
        color:#5424ff!important;
        background:#f3efff!important;
        border-color:#e1d7ff!important;
      }

      #wnAuthDialog button:focus-visible,
      #wnAuthDialog input:focus-visible {
        outline:3px solid #6a3bff;
        outline-offset:2px;
      }

      @media(max-width:600px) {

        body .wn-auth-nav {
          gap:5px;
        }

        body .wn-auth-nav .wn-auth-btn {
          height:44px;
          min-height:44px;
          max-height:44px;
          padding:8px 10px;
          font-size:12px;
        }

        body .wn-menu-panel a,
        body .wn-menu-panel button {
          min-height:44px;
        }

        body .wn-pro-banner {
          flex-direction:column;
          align-items:stretch;
          gap:8px;
          padding:11px;
          margin:9px 0 11px;
          border-radius:12px;
        }

        body .wn-pro-copy {
          align-items:center;
        }

        body .wn-pro-title {
          font-size:13px;
        }

        body .wn-pro-cta {
          width:100%;
          height:auto;
          min-height:44px;
        }

        body dialog#wnAuthDialog.wn-dialog {
          width:calc(100vw - 24px)!important;
          max-width:400px!important;
          border-radius:15px!important;
        }

        body #wnAuthDialog .wn-dialog-head {
          padding:9px 13px;
        }

        body #wnAuthDialog .wn-close {
          flex:0 0 44px!important;
          width:44px!important;
          height:44px!important;
          min-height:44px!important;
          max-height:44px!important;
        }

        body #wnAuthDialog #worknelyAccount {
          padding:14px!important;
        }

        body #wnAuthDialog #worknelyAuthForm {
          gap:8px!important;
        }

        body #wnAuthDialog #wnResetPassword,
        body #wnAuthDialog #wnResendConfirmation,
        body #wnAuthDialog .wn-auth-switch button {
          min-height:44px!important;
        }

      }

      @media(max-width:480px) {

        html:not([lang="en"]) body .shell header.top {
          flex-wrap:wrap!important;
          row-gap:5px!important;
        }

        html:not([lang="en"]) body .shell header.top > .brand {
          order:0!important;
          flex:1 1 calc(100% - 55px)!important;
        }

        html:not([lang="en"]) body .shell header.top > .header-tools {
          order:1!important;
        }

        html:not([lang="en"]) body .shell header.top > .wn-auth-nav {
          order:2!important;
          flex:1 1 100%!important;
          justify-content:flex-end!important;
        }

      }

      @media(max-width:360px) {

        body #wnAuthDialog #worknelyAccount {
          padding:12px!important;
        }

        body #wnAuthDialog .wn-dialog-brand {
          font-size:18px;
        }

      }

      @media(prefers-reduced-motion:reduce) {

        #wnAuthDialog *,
        .wn-pro-cta {
          transition:none!important;
          animation:none!important;
        }

      }

      body #wnAuthDialog #worknelyAuthForm > label[hidden],
      body #wnAuthDialog #worknelyAuthForm input[hidden],
      body #wnAuthDialog #worknelyAuthForm .actions[hidden],
      body #wnAuthDialog .wn-auth-support[hidden],
      body #wnAuthDialog .wn-auth-switch[hidden] {
        display:none!important;
      }

    `;

    document.head.appendChild(style);

    /* LANGUAGE-INDEPENDENT STATUS CLASSIFICATION */

    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    function updateAuthStatus() {

      const message = status.textContent.trim();

      if (!message) {
        delete status.dataset.wnAuthStatus;
        return;
      }

      const explicitType = status.dataset.wnAuthType;

      if (["success", "error", "info"].includes(explicitType)) {

        status.dataset.wnAuthStatus = explicitType;

        return;

      }

      const errorPattern =
        /error|failed|invalid|incorrect|unable|cannot|could not|expired|not confirmed|not successful|denied|too many|rate limit|please enter|must be|required|at least|not match/i;

      const successPattern =
        /success|signed out|signed in|logged in|logged out|password updated|password changed|email sent|link sent|account created|confirmation sent|check your email/i;

      let type = "info";

      if (errorPattern.test(message)) {
        type = "error";
      } else if (successPattern.test(message)) {
        type = "success";
      }

      status.dataset.wnAuthStatus = type;

    }

    const statusObserver = new MutationObserver(
      updateAuthStatus
    );

    statusObserver.observe(status, {
      childList:true,
      characterData:true,
      subtree:true,
      attributes:true,
      attributeFilter:["data-wn-auth-type"]
    });

    updateAuthStatus();

    /* ACCOUNT NAVIGATION */

    const nav = document.createElement("div");

    nav.className = "wn-auth-nav";

    nav.setAttribute(
      "aria-label",
      t("navigation")
    );

    const makeButton = (label, className) => {

      const button = document.createElement("button");

      button.type = "button";
      button.className = "wn-auth-btn " + className;
      button.textContent = label;

      return button;

    };

    const loginBtn = makeButton(
      t("login"),
      "wn-login"
    );

    const signupBtn = makeButton(
      t("signup"),
      "wn-signup"
    );

    const accountWrap = document.createElement("div");

    accountWrap.className = "wn-account-menu";
    accountWrap.hidden = true;

    const accountBtn = makeButton(
      t("account") + " ▾",
      "wn-account"
    );

    accountBtn.setAttribute("aria-expanded", "false");
    accountBtn.setAttribute("aria-controls", "wnAccountMenu");

    const menu = document.createElement("div");

    menu.id = "wnAccountMenu";
    menu.className = "wn-menu-panel";
    menu.hidden = true;

    function closeMenu() {

      menu.hidden = true;

      accountBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    }

    function menuLink(key, href, className = "") {

      const link = document.createElement("a");

      link.textContent = t(key);
      link.href = href;
      link.dataset.wnSaasKey = key;

      if (className) {
        link.className = className;
      }

      link.addEventListener("click", closeMenu);

      return link;

    }

    /* CAREER INTELLIGENCE ROUTER INTEGRATION */

    function getWorkspaceHref(view) {

      const workspace = document.getElementById(view);

      if (workspace) {
        return "#" + view;
      }

      return "index.html#" + view;

    }

    const careerLink = menuLink(
      "careerIntelligence",
      getWorkspaceHref("career-intelligence"),
      "wn-menu-career"
    );

    careerLink.id = "wnAccountCareerIntelligence";

    careerLink.addEventListener("click", event => {

      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const workspace =
        document.getElementById("career-intelligence");

      if (!workspace) {
        return;
      }

      event.preventDefault();

      closeMenu();

      if (window.location.hash !== "#career-intelligence") {

        window.location.hash = "career-intelligence";

      } else {

        workspace.scrollIntoView({
          behavior:"auto",
          block:"start"
        });

      }

    });

    function syncCareerNavigation() {

      const active =
        window.location.hash.toLowerCase() ===
        "#career-intelligence";

      if (active) {

        careerLink.setAttribute(
          "aria-current",
          "page"
        );

      } else {

        careerLink.removeAttribute(
          "aria-current"
        );

      }

      careerLink.setAttribute(
        "href",
        getWorkspaceHref("career-intelligence")
      );

    }

    /* PROFESSIONAL WORKSPACE NAVIGATION — V7.20.8.1 */

    function createWorkspaceLink(key, view, id) {
      const link = menuLink(
        key,
        getWorkspaceHref(view),
        "wn-menu-career"
      );
      link.id = id;

      link.addEventListener("click", event => {
        if (
          event.defaultPrevented ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) return;

        const workspace = document.getElementById(view);
        if (!workspace) return;

        event.preventDefault();
        closeMenu();

        if (window.location.hash !== "#" + view) {
          window.location.hash = view;
        } else {
          workspace.scrollIntoView({
            behavior: "auto",
            block: "start"
          });
        }
      });

      return link;
    }

    const professionalLink = createWorkspaceLink(
      "professionalDashboard",
      "professional-dashboard",
      "wnAccountProfessionalDashboard"
    );

    const jobTrackerLink = createWorkspaceLink(
      "jobTracker",
      "job-tracker",
      "wnAccountJobTracker"
    );

    function syncProfessionalNavigation() {
      const hash = window.location.hash.toLowerCase();

      [
        [professionalLink, "professional-dashboard"],
        [jobTrackerLink, "job-tracker"]
      ].forEach(([link, view]) => {
        link.setAttribute("href", getWorkspaceHref(view));

        if (hash === "#" + view) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    window.addEventListener("hashchange", syncProfessionalNavigation);
    window.addEventListener("pageshow", syncProfessionalNavigation);
    document.addEventListener(
      "worknely:workspacechange",
      syncProfessionalNavigation
    );

    const divider = document.createElement("div");

    divider.className = "wn-menu-divider";
    divider.setAttribute("role", "separator");

    const logoutBtn = document.createElement("button");

    logoutBtn.type = "button";
    logoutBtn.textContent = t("logout");

    menu.append(

      menuLink(
        "dashboard",
        "dashboard.html"
      ),

      professionalLink,

      menuLink(
        "resumes",
        "dashboard.html#resumes"
      ),

      menuLink(
        "builder",
        getWorkspaceHref("builder")
      ),

      careerLink,

      jobTrackerLink,

      menuLink(
        "pricing",
        "pricing.html"
      ),

      menuLink(
        "upgrade",
        "pricing.html",
        "wn-menu-pro"
      ),

      divider,
      logoutBtn

    );

    accountWrap.append(accountBtn, menu);

    nav.append(loginBtn, signupBtn, accountWrap);

    header.appendChild(nav);

    syncProfessionalNavigation();
    syncCareerNavigation();

    window.addEventListener(
      "hashchange",
      syncCareerNavigation
    );

    document.addEventListener(
      "worknely:workspacechange",
      syncCareerNavigation
    );

    window.addEventListener(
      "pageshow",
      syncCareerNavigation
    );

    /* PREMIUM CONVERSION BANNER */

    const banner = document.createElement("aside");

    banner.className = "wn-pro-banner";

    banner.setAttribute(
      "aria-label",
      t("proLabel")
    );

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
    title.textContent = t("proTitle");

    const subtitle = document.createElement("span");

    subtitle.className = "wn-pro-subtitle";
    subtitle.textContent = t("proSubtitle");

    textWrap.append(kicker, title, subtitle);

    copy.append(icon, textWrap);

    const cta = document.createElement("a");

    cta.className = "wn-pro-cta";
    cta.href = "pricing.html";
    cta.textContent = t("proCta") + " →";

    banner.append(copy, cta);

    const premiumSlot = $("wnPremiumSlot");

    if (premiumSlot) {

      premiumSlot.appendChild(banner);

    } else {

      header.insertAdjacentElement(
        "afterend",
        banner
      );

    }

    /* AUTHENTICATION MODAL */

    const dialog = document.createElement("dialog");

    dialog.id = "wnAuthDialog";
    dialog.className = "wn-dialog";

    dialog.setAttribute(
      "aria-label",
      t("accountDialog")
    );

    const dialogHead = document.createElement("div");

    dialogHead.className = "wn-dialog-head";

    const brand = document.createElement("strong");

    brand.className = "wn-dialog-brand";
    brand.textContent = "✦ Worknely";

    const closeBtn = document.createElement("button");

    closeBtn.type = "button";
    closeBtn.className = "wn-close";
    closeBtn.textContent = "×";

    closeBtn.setAttribute(
      "aria-label",
      t("close")
    );

    dialogHead.append(brand, closeBtn);

    /* RESTORE ACCOUNT VISIBILITY */

    function restoreAccountVisibility() {

      section.hidden = false;

      section.classList.remove(
        "hidden",
        "wn-tool-view"
      );

      section.removeAttribute("data-wn-view");
      section.removeAttribute("aria-hidden");
      section.removeAttribute("inert");

      section.style.removeProperty("display");
      section.style.removeProperty("visibility");
      section.style.removeProperty("opacity");

      form.hidden = false;

      form.classList.remove("hidden");

      form.removeAttribute("aria-hidden");
      form.removeAttribute("inert");

      form.style.removeProperty("display");
      form.style.removeProperty("visibility");
      form.style.removeProperty("opacity");

    }

    dialog.append(dialogHead, section);

    document.body.appendChild(dialog);

    restoreAccountVisibility();

    const intro = section.querySelector(
      ".section-head p"
    );

    const overline = section.querySelector(
      ".section-head .overline"
    );

    /* AUTHENTICATION MODE SWITCH */

    const switchRow = document.createElement("div");

    switchRow.className = "wn-auth-switch";

    const switchText = document.createElement("span");

    const switchButton = document.createElement("button");

    switchButton.type = "button";

    switchRow.append(switchText, switchButton);

    /* CONFIRMATION EMAIL SUPPORT */

    const support = document.createElement("div");

    support.className = "wn-auth-support";

    const supportText = document.createElement("p");

    supportText.textContent = t("confirmationHelp");

    support.appendChild(supportText);

    form.insertAdjacentElement(
      "afterend",
      switchRow
    );

    switchRow.insertAdjacentElement(
      "afterend",
      support
    );

    /* PASSWORD RECOVERY ROW */

    const forgotRow = document.createElement("div");

    forgotRow.className = "wn-forgot-row";

    const passwordLabel =
      password.closest("label") ||
      password.labels?.[0];

    if (passwordLabel) {

      passwordLabel.insertAdjacentElement(
        "afterend",
        forgotRow
      );

    } else {

      form.appendChild(forgotRow);

    }

    let mode = "login";

    let securityReady = false;

    let recoveryObserver = null;

    let translationScheduled = false;

    function isRecovery() {

      const update = $("wnUpdatePassword");

      return !!(update && !update.hidden);

    }

    /* LOCALIZED MODAL CONTENT */

    function translateModalContent() {

      setText(
        overline,
        t("accountOverline")
      );

      if (isRecovery()) {

        setText(heading, t("recoveryTitle"));
        setText(intro, t("recoveryIntro"));

      } else {

        setText(
          heading,
          mode === "signup"
            ? t("createAccount")
            : t("welcome")
        );

        setText(
          intro,
          mode === "signup"
            ? t("signupIntro")
            : t("loginIntro")
        );

      }

      setText(
        switchText,
        mode === "login"
          ? t("noAccount")
          : t("hasAccount")
      );

      setText(
        switchButton,
        mode === "login"
          ? t("signup")
          : t("login")
      );

      setText(
        supportText,
        t("confirmationHelp")
      );

    }

    /* INTERNATIONAL SAAS LOCALIZATION */

    function translateInterface() {

      translationScheduled = false;

      setText(loginBtn, t("login"));
      setText(signupBtn, t("signup"));
      setText(accountBtn, t("account") + " ▾");
      setText(logoutBtn, t("logout"));

      menu.querySelectorAll(
        "[data-wn-saas-key]"
      ).forEach(element => {

        setText(
          element,
          t(element.dataset.wnSaasKey)
        );

      });

      nav.setAttribute(
        "aria-label",
        t("navigation")
      );

      dialog.setAttribute(
        "aria-label",
        t("accountDialog")
      );

      closeBtn.setAttribute(
        "aria-label",
        t("close")
      );

      banner.setAttribute(
        "aria-label",
        t("proLabel")
      );

      /*
       * Existing landing localization owns
       * the premium banner inside wnPremiumSlot.
       */

      if (!premiumSlot) {

        setText(title, t("proTitle"));

        setText(subtitle, t("proSubtitle"));

        setText(cta, t("proCta") + " →");

      }

      translateModalContent();

      syncProfessionalNavigation();
      syncCareerNavigation();

      updateAuthStatus();

    }

    function scheduleTranslation() {

      if (translationScheduled) return;

      translationScheduled = true;

      queueMicrotask(translateInterface);

    }

    /* LOGIN AND SIGNUP MODES */

    function setMode(nextMode) {

      mode = nextMode === "signup"
        ? "signup"
        : "login";

      if (isRecovery()) {

        translateModalContent();

        return;

      }

      const authenticated = !logout.hidden;

      if (!authenticated) {

        login.hidden = mode !== "login";

        signup.hidden = mode !== "signup";

      }

      const forgot = $("wnResetPassword");

      const resend = $("wnResendConfirmation");

      if (forgot) {

        forgot.hidden =
          authenticated ||
          mode !== "login";

      }

      if (resend) {

        resend.hidden =
          authenticated ||
          mode !== "login";

      }

      forgotRow.hidden =
        authenticated ||
        mode !== "login" ||
        !forgot;

      support.hidden =
        authenticated ||
        mode !== "login" ||
        !resend;

      switchRow.hidden = authenticated;

      password.autocomplete =
        mode === "signup"
          ? "new-password"
          : "current-password";

      translateModalContent();

    }

    /* SECURITY CONTROLS */

    function positionSecurityControls() {

      const security = $("wnSecurityActions");

      const forgot = $("wnResetPassword");

      const resend = $("wnResendConfirmation");

      const update = $("wnUpdatePassword");

      if (!security || !forgot || !resend || !update) {

        return false;

      }

      const actions = Array.from(form.children)
        .find(element =>
          element.classList.contains("actions") &&
          element.id !== "wnSecurityActions"
        );

      if (!actions) return false;

      if (!securityReady) {

        forgotRow.appendChild(forgot);

        support.appendChild(resend);

        actions.appendChild(update);

        securityReady = true;

      }

      return true;

    }

    function syncSecurity() {

      if (!positionSecurityControls()) {
        return;
      }

      if (isRecovery()) {

        login.hidden = true;

        signup.hidden = true;

        forgotRow.hidden = true;

        support.hidden = true;

        switchRow.hidden = true;

        password.autocomplete = "new-password";

        translateModalContent();

      } else {

        setMode(mode);

      }

    }

    /* SAFE MODAL OPENING */

    function showAuthDialog() {

      restoreAccountVisibility();

      translateInterface();

      if (dialog.open) return;

      try {

        dialog.showModal();

      } catch (error) {

        console.error(
          "Worknely: Unable to open authentication modal.",
          error
        );

      }

    }

    /* RECOVERY STATE OBSERVER */

    function observeRecovery() {

      const update = $("wnUpdatePassword");

      if (!update || recoveryObserver) return;

      recoveryObserver = new MutationObserver(() => {

        syncSecurity();

        syncAuth();

        if (isRecovery()) {

          showAuthDialog();

        }

      });

      recoveryObserver.observe(update, {
        attributes:true,
        attributeFilter:["hidden"]
      });

    }

    /* ASYNCHRONOUS SECURITY CONTROLS */

    const securityObserver = new MutationObserver(() => {

      if (positionSecurityControls()) {

        securityObserver.disconnect();

        syncSecurity();

        observeRecovery();

        if (isRecovery()) {

          showAuthDialog();

        }

      }

    });

    securityObserver.observe(form, {
      childList:true,
      subtree:true
    });

    if (positionSecurityControls()) {

      securityObserver.disconnect();

      syncSecurity();

      observeRecovery();

    }

    /* MODAL CONTROLS */

    function closeDialog() {

      if (dialog.open) {

        dialog.close();

      }

    }

    function openAuth(nextMode) {

      closeMenu();

      restoreAccountVisibility();

      if (isRecovery()) {

        syncSecurity();

      } else {

        setMode(nextMode);

      }

      showAuthDialog();

    }

    /* AUTHENTICATED SESSION UI */

    function syncAuth() {

      const recovering = isRecovery();

      const authenticated =
        !logout.hidden &&
        !recovering;

      loginBtn.hidden =
        authenticated || recovering;

      signupBtn.hidden =
        authenticated || recovering;

      accountWrap.hidden =
        !authenticated;

      if (authenticated && dialog.open) {

        closeDialog();

      }

      if (!authenticated) {

        closeMenu();

        if (!recovering) {

          setMode(mode);

        }

      }

      if (recovering) {

        syncSecurity();

      }

    }

    /* ACCOUNT DEEP LINKS */

    function handleAccountLink() {

      const hash =
        window.location.hash.toLowerCase();

      if (hash !== "#worknelyaccount") return;

      if (isRecovery()) {

        syncSecurity();

        showAuthDialog();

        return;

      }

      if (logout.hidden) {

        openAuth("login");

      }

    }

    /* AUTHENTICATION EVENTS */

    loginBtn.addEventListener("click", () => {

      openAuth("login");

    });

    signupBtn.addEventListener("click", () => {

      openAuth("signup");

    });

    switchButton.addEventListener("click", () => {

      if (form.getAttribute("aria-busy") === "true") {
        return;
      }

      setMode(
        mode === "login"
          ? "signup"
          : "login"
      );

    });

    closeBtn.addEventListener(
      "click",
      closeDialog
    );

    dialog.addEventListener("click", event => {

      if (event.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();

      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (outside) {

        closeDialog();

      }

    });

    accountBtn.addEventListener("click", () => {

      const opening = menu.hidden;

      menu.hidden = !opening;

      accountBtn.setAttribute(
        "aria-expanded",
        String(opening)
      );

      if (opening) {

        syncProfessionalNavigation();
        syncCareerNavigation();

      }

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

      if (event.key === "Escape" && !menu.hidden) {

        closeMenu();

        accountBtn.focus();

      }

    });

    window.addEventListener(
      "hashchange",
      handleAccountLink
    );

    document.addEventListener("click", event => {

      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest(
        'a[href="#worknelyAccount"]'
      );

      if (!link) return;

      event.preventDefault();

      if (logout.hidden || isRecovery()) {

        openAuth("login");

      } else {

        window.location.href = "dashboard.html";

      }

    });

    /* SESSION STATE OBSERVER */

    new MutationObserver(syncAuth).observe(logout, {
      attributes:true,
      attributeFilter:[
        "hidden",
        "style",
        "class"
      ]
    });

    /* INTERNATIONAL LANGUAGE EVENTS */

    document.addEventListener(
      "worknely:languagechange",
      scheduleTranslation
    );

    document.addEventListener(
      "worknely:localizationready",
      scheduleTranslation
    );

    document.addEventListener("change", event => {

      if (
        event.target instanceof HTMLSelectElement &&
        event.target.matches(
          "#language, [data-wn-language]"
        )
      ) {

        scheduleTranslation();

      }

    });

    window.addEventListener(
      "pageshow",
      scheduleTranslation
    );

    /* INITIALIZATION */

    setMode("login");

    syncAuth();

    translateInterface();

    updateAuthStatus();

    syncCareerNavigation();

    if (isRecovery()) {

      syncSecurity();

      showAuthDialog();

    } else {

      handleAccountLink();

    }

    console.info(
      "Worknely V" +
      VERSION +
      " International SaaS Interface initialized."
    );

  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once:true }
    );

  } else {

    initialize();

  }

})();

/*
 * END WORKNELY V7.20.8.1
 * CAREER INTELLIGENCE ACCOUNT NAVIGATION
 * INTERNATIONAL SAAS INTERFACE
 * WORKNELY — PEOPLE TECHNOLOGY
 */
