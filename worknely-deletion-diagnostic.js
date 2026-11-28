
(function () {
  "use strict";

  const VERSION = "7.21.4.11.4";
  const BACKEND_VERSION = "7.21.4.11.1";

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
      button.textContent = "Validating security...";
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

      async function verifyIdentity() {
        const result =
          await client.auth.getUser();

        if (
          result.error ||
          result.data?.user?.id !== uid
        ) {
          throw new Error("SESSION_CHANGED");
        }
      }

      async function request(body) {
        await verifyIdentity();

        const response = await fetch(ENDPOINT, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Authorization":
              "Bearer " + session.access_token,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();

        await verifyIdentity();

        return {
          status: response.status,
          data
        };
      }

      // Phase 1: verify the deployed safety lock.
      const status = await request({
        action: "status"
      });

      const statusPassed =
        status.status === 200 &&
        status.data.ok === true &&
        status.data.authenticated === true &&
        status.data.code === "BACKEND_READY" &&
        status.data.version === BACKEND_VERSION &&
        status.data.dryRunOnly === true &&
        status.data.deletionEnabled === false &&
        status.data.dryRunAuthorized === isTestAccount &&
        status.data.mode === (
          isTestAccount
            ? "restricted-dry-run"
            : "security-validation"
        );

      if (!statusPassed) {
        throw new Error("SAFETY_STATUS_FAILED");
      }

      // Phase 2: explicitly non-destructive request.
      const result = await request({
        action: "delete-account",
        confirmation: "DELETE_MY_ACCOUNT",
        dryRun: true
      });

      const expectedHTTP =
        isTestAccount ? 200 : 403;

      const expectedCode =
        isTestAccount
          ? "DRY_RUN_PASSED"
          : "TEST_ACCOUNT_ONLY";

      const resultPassed =
        result.status === expectedHTTP &&
        result.data.version === BACKEND_VERSION &&
        result.data.code === expectedCode &&
        result.data.deleted === false &&
        (
          isTestAccount
            ? (
                result.data.ok === true &&
                result.data.authorized === true &&
                result.data.dryRun === true
              )
            : result.data.ok === false
        );

      const passed =
        statusPassed && resultPassed;

      alert([
        "WORKNELY SECURITY DIAGNOSTIC",
        "",
        "Diagnostic: " + VERSION,
        "Backend: " + BACKEND_VERSION,
        "",
        "Account: " + (
          isTestAccount
            ? "Disposable test account"
            : "Protected account"
        ),
        "UID: " + uid.slice(0, 8),
        "",
        "Safety status: PASS",
        "Dry-run only: true",
        "Real deletion enabled: false",
        "",
        "HTTP: " + result.status,
        "Expected HTTP: " + expectedHTTP,
        "Code: " + result.data.code,
        "Expected code: " + expectedCode,
        "Deleted: " + result.data.deleted,
        "",
        "RESULT: " + (passed ? "PASS" : "FAIL"),
        "",
        "No real deletion requested."
      ].join("\n"));

    } catch (error) {
      alert([
        "WORKNELY SECURITY DIAGNOSTIC",
        "RESULT: FAIL",
        "",
        String(error?.message || "UNKNOWN_ERROR"),
        "",
        "Validation stopped.",
        "No real deletion requested."
      ].join("\n"));

    } finally {
      busy = false;

      if (button) {
        button.disabled = false;
        button.textContent =
          "Run Dry-Run Security Test";
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
      "Run Dry-Run Security Test";

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
      readOnly: true,
      dryRunOnly: true
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
