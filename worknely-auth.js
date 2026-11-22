
/*
 * WORKNELY SaaS
 * Authentication Module V1.1
 * Supabase Auth - Email & Password
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

const authForm =
  document.getElementById("worknelyAuthForm");

const emailInput =
  document.getElementById("authEmail");

const passwordInput =
  document.getElementById("authPassword");

const signUpButton =
  document.getElementById("authSignUp");

const loginButton =
  document.getElementById("authLogin");

const logoutButton =
  document.getElementById("authLogout");

const statusElement =
  document.getElementById("authStatus");

function showStatus(message) {
  if (statusElement) {
    statusElement.textContent = message;
  }
}

function setBusy(busy) {
  signUpButton.disabled = busy;
  loginButton.disabled = busy;
  logoutButton.disabled = busy;
}

function showSignedIn(user) {
  signUpButton.hidden = true;
  loginButton.hidden = true;
  logoutButton.hidden = false;

  emailInput.disabled = true;
  passwordInput.disabled = true;
  passwordInput.value = "";

  showStatus(
    "Signed in as " + (user.email || "Worknely user")
  );
}

function showSignedOut() {
  signUpButton.hidden = false;
  loginButton.hidden = false;
  logoutButton.hidden = true;

  emailInput.disabled = false;
  passwordInput.disabled = false;
}

function getCredentials() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!emailInput.checkValidity() || !email) {
    showStatus("Please enter a valid email address.");
    return null;
  }

  if (password.length < 6) {
    showStatus(
      "Password must contain at least 6 characters."
    );
    return null;
  }

  return { email, password };
}

async function signUp() {
  const credentials = getCredentials();
  if (!credentials) return;

  setBusy(true);
  showStatus("Creating your account...");

  try {
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
        "Account request received. Check your email " +
        "for a confirmation link before logging in."
      );
    }
  } catch (error) {
    showStatus(
      error.message || "Unable to create account."
    );
  } finally {
    setBusy(false);
  }
}

async function logIn(event) {
  event.preventDefault();

  const credentials = getCredentials();
  if (!credentials) return;

  setBusy(true);
  showStatus("Signing in...");

  try {
    const { data, error } =
      await supabase.auth.signInWithPassword(
        credentials
      );

    if (error) throw error;

    if (data.user) {
      showSignedIn(data.user);
    }
  } catch (error) {
    showStatus(
      error.message || "Unable to sign in."
    );
  } finally {
    setBusy(false);
  }
}

async function logOut() {
  setBusy(true);
  showStatus("Signing out...");

  try {
    const { error } =
      await supabase.auth.signOut();

    if (error) throw error;

    showSignedOut();
    showStatus("You have signed out successfully.");
  } catch (error) {
    showStatus(
      error.message || "Unable to sign out."
    );
  } finally {
    setBusy(false);
  }
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
    (_event, session) => {
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
      showSignedOut();
      showStatus("");
    } else {
      showSignedIn(data.user);
    }
  } catch (error) {
    showSignedOut();
    showStatus(
      "Unable to verify the current session."
    );
  }
}

window.worknelySupabase = supabase;

initializeAuth();
