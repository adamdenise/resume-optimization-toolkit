
(function () {
  "use strict";

  const VERSION = "7.21.4.12.6";
  const BACKEND_VERSION = "7.21.4.12.2";

  const TEST_UID =
    "003e6e99-3d61-4685-ad8e-3b6abe608f74";

  const ENDPOINT =
    "https://xuyronnwsokfadnekeir.supabase.co/functions/v1/dynamic-task";

  const BUTTON_ID =
    "wnDeletionAuthorizationDiagnostic";

  let busy = false;

  async function run() {
    if (busy) return;

    busy = true;

    const button =
      document.getElementById(BUTTON_ID);

    if (button) {
      button.disabled = true;
      button.textContent = "Checking readiness...";
    }

    try {
      const client = window.worknelySupabase;

      if (!client?.auth) {
        throw new Error("AUTH_UNAVAILABLE");
      }

      const identity =
        await client.auth.getUser();

      const uid = identity.data?.user?.id;

      if (identity.error || !uid) {
        throw new Error("SIGN_IN_REQUIRED");
      }

      const isTestAccount = uid === TEST_UID;

      const sessionResult =
        await client.auth.getSession();

      const session = sessionResult.data?.session;

      if (
        sessionResult.error ||
        !session?.access_token ||
        session.user?.id !== uid
      ) {
        throw new Error("INVALID_SESSION");
      }

      const response = await fetch(ENDPOINT, {
        method: "POST",
        cache: "no-store",
        headers: {
          "Authorization":
            "Bearer " + session.access_token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "status"
        })
      });

      const result = await response.json();

      const verification =
        await client.auth.getUser();

      if (
        verification.error ||
        verification.data?.user?.id !== uid
      ) {
        throw new Error("SESSION_CHANGED");
      }

      const expectedMode = isTestAccount
        ? "restricted-execution"
        : "security-validation";

      const passed =
        response.status === 200 &&
        result.ok === true &&
        result.authenticated === true &&
        result.code === "BACKEND_READY" &&
        result.version === BACKEND_VERSION &&
        result.dryRunOnly === false &&
        result.dryRunAuthorized === isTestAccount &&
        result.deletionEnabled === isTestAccount &&
        result.mode === expectedMode;

      alert([
        "WORKNELY EXECUTION READINESS",
        "",
        "Diagnostic: " + VERSION,
        "Backend: " + result.version,
        "",
        "Account: " + (
          isTestAccount
            ? "Disposable test account"
            : "Protected account"
        ),
        "UID: " + uid.slice(0, 8),
        "",
        "HTTP: " + response.status,
        "Dry-run only: " + result.dryRunOnly,
        "Deletion enabled: " + result.deletionEnabled,
        "Expected: " + isTestAccount,
        "Mode: " + result.mode,
        "",
        "RESULT: " + (passed ? "PASS" : "FAIL"),
        "",
        "Read-only status check.",
        "No deletion requested."
      ].join("\n"));

    } catch {
      alert([
        "WORKNELY EXECUTION READINESS",
        "",
        "RESULT: FAIL",
        "Readiness validation stopped.",
        "No deletion requested."
      ].join("\n"));

    } finally {
      busy = false;

      if (button) {
        button.disabled = false;
        button.textContent =
          "Check Execution Readiness";
      }
    }
  }

  function mount() {
    if (document.getElementById(BUTTON_ID)) {
      return;
    }

    const button =
      document.createElement("button");

    button.id = BUTTON_ID;
    button.type = "button";

    button.textContent =
      "Check Execution Readiness";

    Object.assign(button.style, {
      position: "fixed",
      top: "100px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "2147483647",
      pointerEvents: "auto",
      touchAction: "manipulation",
      display: "block",
      padding: "16px 24px",
      maxWidth: "90%",
      minHeight: "48px",
      border: "0",
      borderRadius: "16px",
      background: "#6528ed",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(0,0,0,.18)"
    });

    button.addEventListener("click", run);

    document.body.appendChild(button);
  }

  window.WorknelyDeletionDiagnostic =
    Object.freeze({
      version: VERSION,
      backendVersion: BACKEND_VERSION,
      run,
      readOnly: true
    });

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      mount,
      { once: true }
    );
  } else {
    mount();
  }
})();
