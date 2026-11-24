
/*
 * WORKNELY V7.15
 * International Authentication Engine
 * Six International Languages
 * Supabase Authentication
 * Persistent Language Integration
 * GitHub Pages Compatible
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  "https://xuyronnwsokfadnekeir.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_nr1qlZLiORejUM1JwVqciw_YRSDjnni";

const SITE_URL =
  "https://adamdenise.github.io/resume-optimization-toolkit/";

const supabase = window.worknelySupabase || createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

window.worknelySupabase = supabase;

const $ = id => document.getElementById(id);

const authForm = $("worknelyAuthForm");
const emailInput = $("authEmail");
const passwordInput = $("authPassword");
const signUpButton = $("authSignUp");
const loginButton = $("authLogin");
const logoutButton = $("authLogout");
const statusElement = $("authStatus");

let busy = false;
let currentUser = null;
let recoveryMode = false;
let activeStatus = null;
let initialized = false;

/* INTERNATIONAL AUTHENTICATION DICTIONARY */

const keys = [
  "incorrect",
  "unconfirmed",
  "rateLimit",
  "passwordError",
  "connection",
  "requestError",
  "invalidEmail",
  "minimumPassword",
  "creating",
  "confirmation",
  "signingIn",
  "signingOut",
  "signedOut",
  "sendingRecovery",
  "recoverySent",
  "sendingConfirmation",
  "confirmationSent",
  "recoveryInstruction",
  "minimumNewPassword",
  "updatingPassword",
  "passwordUpdated",
  "sessionError",
  "signedIn",
  "newPassword",
  "updatePassword"
];

const translations = {

  en: [
    "Incorrect email or password.",
    "Please confirm your email before signing in.",
    "Too many requests. Please try again later.",
    "Please check your password and try again.",
    "Connection problem. Please try again.",
    "Unable to complete the request. Please try again.",
    "Please enter a valid email address.",
    "Password must contain at least 6 characters.",
    "Creating your account...",
    "Check your email for an account confirmation link.",
    "Signing in...",
    "Signing out...",
    "You have signed out successfully.",
    "Sending password recovery instructions...",
    "If an account exists for this email, password recovery instructions will be sent.",
    "Sending confirmation email...",
    "If confirmation is pending, a new email will be sent.",
    "Enter your new password and select Update Password.",
    "Use at least 8 characters for your new password.",
    "Updating your password...",
    "Your password has been updated successfully.",
    "Unable to verify the current session. Please check your connection.",
    "Signed in as {email}",
    "New password",
    "Update Password"
  ],

  ro: [
    "Adresa de e-mail sau parola este incorectă.",
    "Confirmă adresa de e-mail înainte de autentificare.",
    "Prea multe solicitări. Încearcă din nou mai târziu.",
    "Verifică parola și încearcă din nou.",
    "Problemă de conexiune. Încearcă din nou.",
    "Solicitarea nu a putut fi finalizată. Încearcă din nou.",
    "Introdu o adresă de e-mail validă.",
    "Parola trebuie să conțină minimum 6 caractere.",
    "Se creează contul tău...",
    "Verifică e-mailul pentru linkul de confirmare a contului.",
    "Se efectuează autentificarea...",
    "Se efectuează deconectarea...",
    "Te-ai deconectat cu succes.",
    "Se trimit instrucțiunile de recuperare a parolei...",
    "Dacă există un cont asociat acestei adrese, vei primi instrucțiunile de recuperare.",
    "Se trimite e-mailul de confirmare...",
    "Dacă există o confirmare în așteptare, vei primi un nou e-mail.",
    "Introdu noua parolă și selectează Actualizează parola.",
    "Noua parolă trebuie să conțină minimum 8 caractere.",
    "Se actualizează parola...",
    "Parola a fost actualizată cu succes.",
    "Sesiunea nu a putut fi verificată. Verifică conexiunea.",
    "Autentificat ca {email}",
    "Parolă nouă",
    "Actualizează parola"
  ],

  it: [
    "Indirizzo e-mail o password non corretti.",
    "Conferma il tuo indirizzo e-mail prima di accedere.",
    "Troppe richieste. Riprova più tardi.",
    "Controlla la password e riprova.",
    "Problema di connessione. Riprova.",
    "Impossibile completare la richiesta. Riprova.",
    "Inserisci un indirizzo e-mail valido.",
    "La password deve contenere almeno 6 caratteri.",
    "Creazione del tuo account...",
    "Controlla la tua e-mail per il link di conferma.",
    "Accesso in corso...",
    "Disconnessione in corso...",
    "Disconnessione completata correttamente.",
    "Invio delle istruzioni per recuperare la password...",
    "Se esiste un account associato a questa e-mail, riceverai le istruzioni di recupero.",
    "Invio dell’e-mail di conferma...",
    "Se la conferma è in sospeso, riceverai una nuova e-mail.",
    "Inserisci la nuova password e seleziona Aggiorna password.",
    "Utilizza almeno 8 caratteri per la nuova password.",
    "Aggiornamento della password...",
    "La password è stata aggiornata correttamente.",
    "Impossibile verificare la sessione. Controlla la connessione.",
    "Accesso effettuato come {email}",
    "Nuova password",
    "Aggiorna password"
  ],

  de: [
    "E-Mail-Adresse oder Passwort ist falsch.",
    "Bestätige deine E-Mail-Adresse vor der Anmeldung.",
    "Zu viele Anfragen. Versuche es später erneut.",
    "Überprüfe dein Passwort und versuche es erneut.",
    "Verbindungsproblem. Versuche es erneut.",
    "Die Anfrage konnte nicht abgeschlossen werden.",
    "Gib eine gültige E-Mail-Adresse ein.",
    "Das Passwort muss mindestens 6 Zeichen enthalten.",
    "Dein Konto wird erstellt...",
    "Überprüfe deine E-Mails auf den Bestätigungslink.",
    "Anmeldung läuft...",
    "Abmeldung läuft...",
    "Du wurdest erfolgreich abgemeldet.",
    "Anweisungen zur Passwortwiederherstellung werden gesendet...",
    "Falls ein Konto existiert, erhältst du Anweisungen zur Passwortwiederherstellung.",
    "Bestätigungs-E-Mail wird gesendet...",
    "Falls eine Bestätigung aussteht, erhältst du eine neue E-Mail.",
    "Gib dein neues Passwort ein und wähle Passwort aktualisieren.",
    "Das neue Passwort muss mindestens 8 Zeichen enthalten.",
    "Passwort wird aktualisiert...",
    "Dein Passwort wurde erfolgreich aktualisiert.",
    "Die Sitzung konnte nicht überprüft werden. Prüfe deine Verbindung.",
    "Angemeldet als {email}",
    "Neues Passwort",
    "Passwort aktualisieren"
  ],

  fr: [
    "Adresse e-mail ou mot de passe incorrect.",
    "Confirmez votre adresse e-mail avant de vous connecter.",
    "Trop de demandes. Réessayez plus tard.",
    "Vérifiez votre mot de passe et réessayez.",
    "Problème de connexion. Réessayez.",
    "Impossible de terminer la demande. Réessayez.",
    "Saisissez une adresse e-mail valide.",
    "Le mot de passe doit contenir au moins 6 caractères.",
    "Création de votre compte...",
    "Consultez votre e-mail pour le lien de confirmation.",
    "Connexion en cours...",
    "Déconnexion en cours...",
    "Vous avez été déconnecté avec succès.",
    "Envoi des instructions de récupération du mot de passe...",
    "Si un compte existe, vous recevrez les instructions de récupération.",
    "Envoi de l’e-mail de confirmation...",
    "Si une confirmation est en attente, un nouvel e-mail sera envoyé.",
    "Saisissez votre nouveau mot de passe et sélectionnez Mettre à jour.",
    "Utilisez au moins 8 caractères pour votre nouveau mot de passe.",
    "Mise à jour du mot de passe...",
    "Votre mot de passe a été mis à jour avec succès.",
    "Impossible de vérifier la session. Vérifiez votre connexion.",
    "Connecté en tant que {email}",
    "Nouveau mot de passe",
    "Mettre à jour le mot de passe"
  ],

  es: [
    "Correo electrónico o contraseña incorrectos.",
    "Confirma tu correo electrónico antes de iniciar sesión.",
    "Demasiadas solicitudes. Inténtalo más tarde.",
    "Comprueba tu contraseña e inténtalo de nuevo.",
    "Problema de conexión. Inténtalo de nuevo.",
    "No se pudo completar la solicitud. Inténtalo de nuevo.",
    "Introduce una dirección de correo electrónico válida.",
    "La contraseña debe contener al menos 6 caracteres.",
    "Creando tu cuenta...",
    "Revisa tu correo electrónico para confirmar tu cuenta.",
    "Iniciando sesión...",
    "Cerrando sesión...",
    "Has cerrado sesión correctamente.",
    "Enviando instrucciones de recuperación de contraseña...",
    "Si existe una cuenta asociada, recibirás las instrucciones de recuperación.",
    "Enviando correo de confirmación...",
    "Si hay una confirmación pendiente, recibirás un nuevo correo.",
    "Introduce tu nueva contraseña y selecciona Actualizar contraseña.",
    "Utiliza al menos 8 caracteres para tu nueva contraseña.",
    "Actualizando contraseña...",
    "Tu contraseña se ha actualizado correctamente.",
    "No se pudo verificar la sesión. Comprueba tu conexión.",
    "Sesión iniciada como {email}",
    "Nueva contraseña",
    "Actualizar contraseña"
  ]

};

/* LOCALIZATION HELPERS */

function getLanguage() {
  const language =
    window.WorknelyLocalization?.getLanguage() ||
    document.documentElement.lang ||
    "en";

  return translations[language]
    ? language
    : "en";
}

function t(key, variables = {}) {
  const index = keys.indexOf(key);

  if (index === -1) return key;

  const template =
    translations[getLanguage()][index] ||
    translations.en[index];

  return template.replace(
    /\{([a-zA-Z0-9_]+)\}/g,
    (match, name) =>
      Object.prototype.hasOwnProperty.call(
        variables,
        name
      )
        ? String(variables[name])
        : match
  );
}

function central(key, fallback) {
  const value =
    window.WorknelyLocalization?.t(key);

  return value && value !== key
    ? value
    : fallback;
}

function setText(element, value) {
  if (
    element &&
    element.textContent !== value
  ) {
    element.textContent = value;
  }
}

function setFieldLabel(input, value) {
  if (!input) return;

  const label =
    input.labels?.[0] ||
    input.closest("label");

  if (!label) return;

  const span = Array.from(
    label.children
  ).find(child =>
    child.tagName === "SPAN"
  );

  if (span) {
    setText(span, value);
    return;
  }

  const textNode = Array.from(
    label.childNodes
  ).find(node =>
    node.nodeType === Node.TEXT_NODE &&
    node.textContent.trim()
  );

  if (textNode) {
    textNode.textContent = value + " ";
  } else {
    label.prepend(
      document.createTextNode(value + " ")
    );
  }
}

/* LOCALIZED STATUS MESSAGES */

function renderStatus() {
  if (!statusElement) return;

  if (!activeStatus) {
    setText(statusElement, "");
    delete statusElement.dataset.wnAuthStatus;
    delete statusElement.dataset.wnAuthType;
    return;
  }

  statusElement.dataset.wnAuthType =
    activeStatus.type;

  statusElement.dataset.wnAuthStatus =
    activeStatus.type;

  setText(
    statusElement,
    t(
      activeStatus.key,
      activeStatus.variables
    )
  );
}

function showStatus(
  key,
  type = "info",
  variables = {}
) {
  activeStatus = key
    ? { key, type, variables }
    : null;

  renderStatus();
}

/* STATIC AUTHENTICATION TRANSLATIONS */

function translateAuthControls() {
  setText(
    loginButton,
    central("auth.login", "Log In")
  );

  setText(
    signUpButton,
    central("auth.signup", "Sign Up")
  );

  setText(
    logoutButton,
    central("auth.logout", "Log Out")
  );

  setText(
    $("wnResetPassword"),
    central("auth.forgot", "Forgot password?")
  );

  setText(
    $("wnResendConfirmation"),
    central(
      "auth.resend",
      "Resend confirmation email"
    )
  );

  setText(
    $("wnUpdatePassword"),
    t("updatePassword")
  );

  setFieldLabel(
    emailInput,
    central("auth.email", "Email address")
  );

  setFieldLabel(
    passwordInput,
    recoveryMode
      ? t("newPassword")
      : central("auth.password", "Password")
  );

  renderStatus();
}

/* FRIENDLY AUTHENTICATION ERRORS */

function friendlyError(error) {
  const code = String(error?.code || "");

  const lower = String(
    error?.message || ""
  ).toLowerCase();

  if (
    code === "invalid_credentials" ||
    lower.includes("invalid login credentials")
  ) {
    return "incorrect";
  }

  if (
    code === "email_not_confirmed" ||
    lower.includes("email not confirmed")
  ) {
    return "unconfirmed";
  }

  if (
    error?.status === 429 ||
    lower.includes("rate limit") ||
    lower.includes("too many requests")
  ) {
    return "rateLimit";
  }

  if (
    lower.includes("network") ||
    lower.includes("fetch")
  ) {
    return "connection";
  }

  if (lower.includes("password")) {
    return "passwordError";
  }

  return "requestError";
}

/* REQUEST STATE */

function setBusy(value) {
  busy = value;

  [
    signUpButton,
    loginButton,
    logoutButton,
    $("wnResetPassword"),
    $("wnResendConfirmation"),
    $("wnUpdatePassword")
  ].forEach(button => {
    if (button) button.disabled = value;
  });

  authForm?.setAttribute(
    "aria-busy",
    String(value)
  );
}

/* AUTHENTICATED SESSION */

function showSignedIn(user) {
  currentUser = user;

  signUpButton.hidden = true;
  loginButton.hidden = true;
  logoutButton.hidden = false;

  emailInput.disabled = true;
  passwordInput.disabled = true;
  passwordInput.value = "";

  if (user.email) {
    emailInput.value = user.email;
  }

  if ($("wnResetPassword")) {
    $("wnResetPassword").hidden = true;
  }

  if ($("wnResendConfirmation")) {
    $("wnResendConfirmation").hidden = true;
  }

  showStatus(
    "signedIn",
    "success",
    {
      email: user.email || "Worknely"
    }
  );
}

function showSignedOut() {
  currentUser = null;

  signUpButton.hidden = false;
  loginButton.hidden = false;
  logoutButton.hidden = true;

  emailInput.disabled = false;
  passwordInput.disabled = false;

  if ($("wnResetPassword")) {
    $("wnResetPassword").hidden = false;
  }

  if ($("wnResendConfirmation")) {
    $("wnResendConfirmation").hidden = false;
  }
}

/* INPUT VALIDATION */

function getEmail() {
  const email = emailInput.value.trim();

  if (!email || !emailInput.checkValidity()) {
    showStatus("invalidEmail", "error");
    return null;
  }

  return email;
}

function getCredentials() {
  const email = getEmail();

  if (!email) return null;

  const password = passwordInput.value;

  if (password.length < 6) {
    showStatus(
      "minimumPassword",
      "error"
    );
    return null;
  }

  return { email, password };
}

/* SAFE ASYNCHRONOUS REQUESTS */

async function execute(message, callback) {
  if (busy) return;

  setBusy(true);
  showStatus(message);

  try {
    await callback();

  } catch (error) {

    console.error(
      "Worknely authentication request failed:",
      error?.name || "AuthError"
    );

    showStatus(
      friendlyError(error),
      "error"
    );

  } finally {
    setBusy(false);
  }
}

/* ACCOUNT REGISTRATION */

async function signUp() {
  if (recoveryMode || busy) return;

  const credentials = getCredentials();

  if (!credentials) return;

  await execute(
    "creating",
    async () => {

      const { data, error } =
        await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password,
          options: {
            emailRedirectTo: SITE_URL
          }
        });

      if (error) throw error;

      passwordInput.value = "";

      if (data.session && data.user) {
        showSignedIn(data.user);
      } else {
        showStatus(
          "confirmation",
          "success"
        );
      }
    }
  );
}

/* ACCOUNT LOGIN */

async function logIn(event) {
  event.preventDefault();

  if (busy) return;

  if (recoveryMode) {
    await updatePassword();
    return;
  }

  if (
    !signUpButton.hidden &&
    loginButton.hidden
  ) {
    await signUp();
    return;
  }

  const credentials = getCredentials();

  if (!credentials) return;

  await execute(
    "signingIn",
    async () => {

      const { data, error } =
        await supabase.auth.signInWithPassword(
          credentials
        );

      if (error) throw error;

      if (data.user) {
        showSignedIn(data.user);
      }
    }
  );
}

/* ACCOUNT LOGOUT */

async function logOut() {
  await execute(
    "signingOut",
    async () => {

      const { error } =
        await supabase.auth.signOut();

      if (error) throw error;

      showSignedOut();

      passwordInput.value = "";

      showStatus(
        "signedOut",
        "success"
      );
    }
  );
}

/* PASSWORD RECOVERY */

async function resetPassword() {
  if (busy || recoveryMode) return;

  const email = getEmail();

  if (!email) return;

  await execute(
    "sendingRecovery",
    async () => {

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          email,
          {
            redirectTo: SITE_URL
          }
        );

      if (error) throw error;

      showStatus(
        "recoverySent",
        "success"
      );
    }
  );
}

/* EMAIL CONFIRMATION */

async function resendConfirmation() {
  if (busy || recoveryMode) return;

  const email = getEmail();

  if (!email) return;

  await execute(
    "sendingConfirmation",
    async () => {

      const { error } =
        await supabase.auth.resend({
          type: "signup",
          email,
          options: {
            emailRedirectTo: SITE_URL
          }
        });

      if (error) throw error;

      showStatus(
        "confirmationSent",
        "success"
      );
    }
  );
}

/* PASSWORD RECOVERY MODE */

function enterRecoveryMode(user) {
  recoveryMode = true;

  showSignedOut();

  currentUser = user || null;

  signUpButton.hidden = true;
  loginButton.hidden = true;

  if ($("wnResetPassword")) {
    $("wnResetPassword").hidden = true;
  }

  if ($("wnResendConfirmation")) {
    $("wnResendConfirmation").hidden = true;
  }

  if ($("wnUpdatePassword")) {
    $("wnUpdatePassword").hidden = false;
  }

  if (user?.email) {
    emailInput.value = user.email;
  }

  emailInput.disabled = true;

  passwordInput.disabled = false;
  passwordInput.value = "";
  passwordInput.required = true;
  passwordInput.autocomplete = "new-password";

  translateAuthControls();

  showStatus(
    "recoveryInstruction"
  );
}

function exitRecoveryMode(user) {
  recoveryMode = false;

  if ($("wnUpdatePassword")) {
    $("wnUpdatePassword").hidden = true;
  }

  passwordInput.value = "";
  passwordInput.autocomplete =
    "current-password";

  if (user) {
    showSignedIn(user);
  } else {
    showSignedOut();
  }

  translateAuthControls();
}

/* UPDATE PASSWORD */

async function updatePassword() {
  if (!recoveryMode || busy) return;

  const newPassword =
    passwordInput.value;

  if (newPassword.length < 8) {
    showStatus(
      "minimumNewPassword",
      "error"
    );
    return;
  }

  await execute(
    "updatingPassword",
    async () => {

      const { data, error } =
        await supabase.auth.updateUser({
          password: newPassword
        });

      if (error) throw error;

      exitRecoveryMode(
        data.user || currentUser
      );

      showStatus(
        "passwordUpdated",
        "success"
      );
    }
  );
}

/* SECURITY CONTROLS */

function createSecurityControls() {
  if ($("wnSecurityActions")) return;

  const container =
    document.createElement("div");

  container.className = "actions";
  container.id = "wnSecurityActions";

  container.style.flexWrap = "wrap";
  container.style.marginTop = "12px";

  const resetButton =
    document.createElement("button");

  resetButton.type = "button";
  resetButton.id = "wnResetPassword";
  resetButton.className = "ghost";

  const resendButton =
    document.createElement("button");

  resendButton.type = "button";
  resendButton.id = "wnResendConfirmation";
  resendButton.className = "ghost";

  const updateButton =
    document.createElement("button");

  updateButton.type = "button";
  updateButton.id = "wnUpdatePassword";
  updateButton.className = "primary";
  updateButton.hidden = true;

  container.append(
    resetButton,
    resendButton,
    updateButton
  );

  authForm.appendChild(container);

  resetButton.addEventListener(
    "click",
    resetPassword
  );

  resendButton.addEventListener(
    "click",
    resendConfirmation
  );

  updateButton.addEventListener(
    "click",
    updatePassword
  );

  translateAuthControls();
}

/* INTERNATIONAL LANGUAGE EVENTS */

document.addEventListener(
  "worknely:languagechange",
  translateAuthControls
);

document.addEventListener(
  "worknely:localizationready",
  translateAuthControls
);

document.addEventListener(
  "change",
  event => {
    if (
      event.target instanceof HTMLSelectElement &&
      event.target.matches(
        "#language, [data-wn-language]"
      )
    ) {
      queueMicrotask(
        translateAuthControls
      );
    }
  }
);

/* AUTHENTICATION INITIALIZATION */

async function initializeAuth() {
  if (initialized) return;

  if (
    !authForm ||
    !emailInput ||
    !passwordInput ||
    !signUpButton ||
    !loginButton ||
    !logoutButton
  ) {
    console.error(
      "Worknely authentication elements are missing."
    );
    return;
  }

  initialized = true;

  createSecurityControls();

  signUpButton.addEventListener(
    "click",
    signUp
  );

  authForm.addEventListener(
    "submit",
    logIn
  );

  logoutButton.addEventListener(
    "click",
    logOut
  );

  supabase.auth.onAuthStateChange(
    (event, session) => {

      if (event === "PASSWORD_RECOVERY") {

        enterRecoveryMode(
          session?.user
        );

        return;
      }

      if (event === "SIGNED_OUT") {

        recoveryMode = false;

        if ($("wnUpdatePassword")) {
          $("wnUpdatePassword").hidden = true;
        }

        showSignedOut();

        passwordInput.value = "";

        passwordInput.autocomplete =
          "current-password";

        translateAuthControls();

        if (!busy) {
          showStatus(
            "signedOut",
            "success"
          );
        }

        return;
      }

      if (recoveryMode) return;

      if (session?.user) {

        if (
          event === "TOKEN_REFRESHED" &&
          currentUser?.id === session.user.id
        ) {
          currentUser = session.user;
          return;
        }

        showSignedIn(session.user);

      } else {

        showSignedOut();

      }
    }
  );

  try {

    const { data, error } =
      await supabase.auth.getUser();

    if (recoveryMode) return;

    if (error || !data.user) {

      showSignedOut();
      showStatus(null);

    } else {

      showSignedIn(data.user);

    }

  } catch {

    if (!recoveryMode) {
      showStatus(
        "sessionError",
        "error"
      );
    }

  }

  translateAuthControls();

  console.info(
    "Worknely V7.15 International Authentication initialized."
  );
}

initializeAuth();

/*
 * END WORKNELY V7.15
 * INTERNATIONAL AUTHENTICATION ENGINE
 * WORKNELY — PEOPLE TECHNOLOGY
 */
