
(function () {
  "use strict";

  const VERSION = "7.21.4.10.2";

  const TEST_UID =
    "003e6e99-3d61-4685-ad8e-3b6abe608f74";

  const BACKEND_VERSION = "7.21.4.9.4";

  const ENDPOINT =
    "https://xuyronnwsokfadnekeir.supabase.co/functions/v1/dynamic-task";

  let busy = false;

  async function run() {
    if (busy) return;

    busy = true;

    try {
      const client = window.worknelySupabase;

      if (!client?.auth) {
        throw new Error("Supabase unavailable.");
      }

      const { data, error } =
        await client.auth.getUser();

      if (error || !data.user?.id) {
        throw new Error("Authentication required.");
      }

      const uid = data.user.id;

      const isTestAccount = uid === TEST_UID;

      const expectedPermission = isTestAccount;

      const expectedMode = isTestAccount
        ? "restricted-test"
        : "security-validation";

      const sessionResult =
        await client.auth.getSession();

      const session = sessionResult.data?.session;

      if (
        sessionResult.error ||
        !session?.access_token ||
        session.user?.id !== uid
      ) {
        throw new Error("Invalid session.");
      }

      // Read-only status request.
      // Never requests account deletion.

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Authorization":
            "Bearer " + session.access_token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "status"
        }),
        cache: "no-store"
      });

      const result = await response.json();

      const verification =
        await client.auth.getUser();

      if (
        verification.error ||
        verification.data.user?.id !== uid
      ) {
        throw new Error("Session changed.");
      }

      const passed =
        response.status === 200 &&
        result.ok === true &&
        result.authenticated === true &&
        result.code === "BACKEND_READY" &&
        result.version === BACKEND_VERSION &&
        result.deletionEnabled === expectedPermission &&
        result.mode === expectedMode;

      alert([
        "WORKNELY AUTHORIZATION DIAGNOSTIC",
        "Version: " + VERSION,
        "",
        "Account: " + (
          isTestAccount
            ? "TEST ACCOUNT"
            : "PROTECTED ACCOUNT"
        ),
        "UID reference: " + uid.slice(0, 8),
        "HTTP: " + response.status,
        "Backend: " + result.version,
        "Deletion enabled: " + result.deletionEnabled,
        "Expected: " + expectedPermission,
        "Mode: " + result.mode,
        "",
        "Authorization status: " + (
          passed ? "PASS" : "FAIL"
        ),
        "",
        "No deletion requested."
      ].join("\n"));

    } catch (error) {
      alert(
        "WORKNELY AUTHORIZATION DIAGNOSTIC\n\n" +
        "FAIL: Diagnostic unavailable.\n" +
        "No deletion requested."
      );

    } finally {
      busy = false;
    }
  }

  function mount() {
    if (
      document.getElementById(
        "wnDeletionAuthorizationDiagnostic"
      )
    ) return;

    const button = document.createElement("button");

    button.id =
      "wnDeletionAuthorizationDiagnostic";

    button.type = "button";

    button.textContent =
      "Run Authorization Diagnostic";

    button.style.cssText = [
      "display:block",
      "margin:24px auto",
      "padding:16px 24px",
      "max-width:90%",
      "min-height:48px",
      "border:0",
      "border-radius:16px",
      "background:#6528ed",
      "color:#ffffff",
      "font-size:16px",
      "font-weight:700",
      "cursor:pointer"
    ].join(";");

    button.addEventListener("click", run);

    document.body.appendChild(button);
  }

  window.WorknelyDeletionDiagnostic =
    Object.freeze({
      version: VERSION,
      run: run,
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
