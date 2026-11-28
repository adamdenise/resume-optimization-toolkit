
(function () {
  "use strict";

  const VERSION = "7.21.4.12.18";
  const BACKEND_VERSION = "7.21.4.12.16";

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
      button.textContent =
        "Checking security lock...";
    }

    try {

      const client =
        window.worknelySupabase;

      if (!client?.auth) {
        throw new Error("AUTH_UNAVAILABLE");
      }

      const identity =
        await client.auth.getUser();

      const uid =
        identity.data?.user?.id;

      if (identity.error || !uid) {
        throw new Error("SIGN_IN_REQUIRED");
      }

      const sessionResult =
        await client.auth.getSession();

      const session =
        sessionResult.data?.session;

      if (
        sessionResult.error ||
        !session?.access_token ||
        session.user?.id !== uid
      ) {
        throw new Error("INVALID_SESSION");
      }

      const response = await fetch(
        ENDPOINT,
        {
          method: "POST",
          cache: "no-store",
          redirect: "error",

          headers: {
            "Authorization":
              "Bearer " + session.access_token,

            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            action: "status"
          })
        }
      );

      const result =
        await response.json();

      const verification =
        await client.auth.getUser();

      if (
        verification.error ||
        verification.data?.user?.id !== uid
      ) {
        throw new Error("SESSION_CHANGED");
      }

      const checks = [
        response.status === 200,
        result.version === BACKEND_VERSION,
        result.ok === true,
        result.code === "BACKEND_READY",
        result.authenticated === true,
        result.dryRunOnly === true,
        result.dryRunAuthorized === false,
        result.deletionEnabled === false,
        result.securityLock === true,
        result.mode === "security-locked",
        result.controlledTestCompleted === true
      ];

      const passed =
        checks.every(Boolean);

      const passedCount =
        checks.filter(Boolean).length;

      alert([
        "WORKNELY SECURITY LOCK",
        "",
        "Diagnostic: " + VERSION,
        "Backend: " + result.version,
        "",
        "UID: " + uid.slice(0, 8),
        "HTTP: " + response.status,
        "",
        "Authenticated: " +
          result.authenticated,

        "Dry-run only: " +
          result.dryRunOnly,

        "Dry-run authorized: " +
          result.dryRunAuthorized,

        "Deletion enabled: " +
          result.deletionEnabled,

        "Security lock: " +
          result.securityLock,

        "Mode: " +
          result.mode,

        "Controlled test completed: " +
          result.controlledTestCompleted,

        "",
        "Checks: " +
          passedCount + "/" + checks.length,

        "RESULT: " +
          (passed ? "PASS" : "FAIL"),

        "",
        "Read-only status check.",
        "No deletion requested."

      ].join("\n"));

    } catch {

      alert([
        "WORKNELY SECURITY LOCK",
        "",
        "RESULT: FAIL",
        "",
        "Security lock validation stopped.",
        "Check authentication and deployment.",
        "",
        "No deletion requested."
      ].join("\n"));

    } finally {

      busy = false;

      if (button) {
        button.disabled = false;

        button.textContent =
          "Verify Backend Security Lock";
      }

    }
  }

  function mount() {

    if (
      document.getElementById(BUTTON_ID)
    ) return;

    const button =
      document.createElement("button");

    button.id = BUTTON_ID;
    button.type = "button";

    button.textContent =
      "Verify Backend Security Lock";

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
      background: "#047857",
      color: "#ffffff",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      boxShadow:
        "0 8px 24px rgba(0,0,0,.18)"
    });

    button.addEventListener(
      "click",
      run
    );

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
