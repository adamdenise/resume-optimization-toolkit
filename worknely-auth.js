
/*
 * WORKNELY V7.6
 * Account & Data Security
 * Supabase Authentication
 * Compatible with GitHub Pages
 */

import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL =
  "https://xuyronnwsokfadnekeir.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_nr1qlZLiORejUM1JwVqciw_YRSDjnni";

const SITE_URL =
  "https://adamdenise.github.io/resume-optimization-toolkit/";

const supabase = createClient(
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

function showStatus(message) {
  if (statusElement) {
    statusElement.textContent = message;
  }
}

function friendlyError(error) {
  const message = String(error?.message || "");
  const lower = message.toLowerCase();

  if (
    lower.includes("invalid login credentials")
  ) {
    return "Incorrect email or password.";
  }

  if (lower.includes("email not confirmed")) {
    return "Please confirm your email before signing in.";
  }

  if (lower.includes("rate limit") ||
      lower.includes("too many requests")) {
    return "Too many requests. Please try again later.";
  }

  if (lower.includes("password")) {
    return "Please check your password and try again.";
  }

  if (lower.includes("network") ||
      lower.includes("fetch")) {
    return "Connection problem. Please try again.";
  }

  return "Unable to complete the request. Please try again.";
}

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
}

function showSignedIn(user) {
  currentUser = user;

  signUpButton.hidden = true;
  loginButton.hidden = true;
  logoutButton.hidden = false;

  emailInput.disabled = true;
  passwordInput.disabled = true;
  passwordInput.value = "";

  if ($("wnResetPassword")) {
    $("wnResetPassword").hidden = true;
  }

  if ($("wnResendConfirmation")) {
    $("wnResendConfirmation").hidden = true;
  }

  showStatus(
    "Signed in as " + (user.email || "Worknely user")
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

function getEmail() {
  const email = emailInput.value.trim();

  if (
    !email ||
    !emailInput.checkValidity()
  ) {
    showStatus("Please enter a valid email address.");
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
      "Password must contain at least 6 characters."
    );
    return null;
  }

  return { email, password };
}

async function execute(operation, message, callback) {
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

    showStatus(friendlyError(error));
  } finally {
    setBusy(false);
  }
}

async function signUp() {
  if (recoveryMode) return;

  const credentials = getCredentials();
  if (!credentials) return;

  await execute(
    "signup",
    "Creating your account...",
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
          "Check your email for an account confirmation link."
        );
      }
    }
  );
}

async function logIn(event) {
  event.preventDefault();

  if (recoveryMode) {
    showStatus(
      "Set your new password to finish recovery."
    );
    return;
  }

  const credentials = getCredentials();
  if (!credentials) return;

  await execute(
    "login",
    "Signing in...",
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

async function logOut() {
  await execute(
    "logout",
    "Signing out...",
    async () => {
      const { error } =
        await supabase.auth.signOut();

      if (error) throw error;

      showSignedOut();
      passwordInput.value = "";

      showStatus(
        "You have signed out successfully."
      );
    }
  );
}

async function resetPassword() {
  const email = getEmail();
  if (!email) return;

  await execute(
    "reset",
    "Sending password recovery instructions...",
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
        "If an account exists for this email, " +
        "password recovery instructions will be sent."
      );
    }
  );
}

async function resendConfirmation() {
  const email = getEmail();
  if (!email) return;

  await execute(
    "resend",
    "Sending confirmation email...",
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
        "If confirmation is pending, " +
        "a new email will be sent."
      );
    }
  );
}

function enterRecoveryMode() {
  recoveryMode = true;

  showSignedOut();

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

  emailInput.disabled = true;
  passwordInput.disabled = false;
  passwordInput.value = "";
  passwordInput.required = true;
  passwordInput.autocomplete = "new-password";

  const passwordLabel =
    document.querySelector('label[for="authPassword"]');

  if (passwordLabel) {
    passwordLabel.firstChild.textContent =
      "New password ";
  }

  showStatus(
    "Enter your new password and select Update Password."
  );
}

function exitRecoveryMode() {
  recoveryMode = false;

  if ($("wnUpdatePassword")) {
    $("wnUpdatePassword").hidden = true;
  }

  passwordInput.value = "";
  passwordInput.autocomplete = "current-password";

  const passwordLabel =
    document.querySelector('label[for="authPassword"]');

  if (passwordLabel) {
    passwordLabel.firstChild.textContent =
      "Password ";
  }

  if (currentUser) {
    showSignedIn(currentUser);
  } else {
    showSignedOut();
  }
}

async function updatePassword() {
  if (!recoveryMode) return;

  const newPassword = passwordInput.value;

  if (newPassword.length < 8) {
    showStatus(
      "Use at least 8 characters for your new password."
    );
    return;
  }

  await execute(
    "update-password",
    "Updating your password...",
    async () => {
      const { data, error } =
        await supabase.auth.updateUser({
          password: newPassword
        });

      if (error) throw error;

      exitRecoveryMode();

      if (data.user) {
        showSignedIn(data.user);
      }

      showStatus(
        "Your password has been updated successfully."
      );
    }
  );
}

function createSecurityControls() {
  const container = document.createElement("div");

  container.className = "actions";
  container.id = "wnSecurityActions";

  container.style.flexWrap = "wrap";
  container.style.marginTop = "12px";

  const resetButton =
    document.createElement("button");

  resetButton.type = "button";
  resetButton.id = "wnResetPassword";
  resetButton.className = "ghost";
  resetButton.textContent = "Forgot password?";

  const resendButton =
    document.createElement("button");

  resendButton.type = "button";
  resendButton.id = "wnResendConfirmation";
  resendButton.className = "ghost";
  resendButton.textContent = "Resend confirmation";

  const updateButton =
    document.createElement("button");

  updateButton.type = "button";
  updateButton.id = "wnUpdatePassword";
  updateButton.className = "primary";
  updateButton.textContent = "Update Password";
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
}

async function initializeAuth() {
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
        enterRecoveryMode();
        return;
      }

      if (recoveryMode) return;

      if (session?.user) {
        showSignedIn(session.user);
      } else {
        showSignedOut();
      }
    }
  );

  try {
    const { data, error } =
      await supabase.auth.getUser();

    if (error || !data.user) {
      if (!recoveryMode) {
        showSignedOut();
        showStatus("");
      }
    } else if (!recoveryMode) {
      showSignedIn(data.user);
    }
  } catch (error) {
    if (!recoveryMode) {
      showStatus(
        "Unable to verify the current session. " +
        "Please check your connection."
      );
    }
  }
}

window.worknelySupabase = supabase;

initializeAuth();
