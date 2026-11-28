
(function () {
  "use strict";

  const VERSION = "7.21.4.12.9";
  const BACKEND_VERSION = "7.21.4.12.2";

  const TEST_UID =
    "003e6e99-3d61-4685-ad8e-3b6abe608f74";

  const ENDPOINT =
    "https://xuyronnwsokfadnekeir.supabase.co/functions/v1/dynamic-task";

  const BUTTON_ID =
    "wnControlledDeletionExecutor";

  const CONFIRMATION =
    "DELETE_MY_ACCOUNT";

  const EXECUTION_CONFIRMATION =
    "EXECUTE_DISPOSABLE_TEST_DELETION";

  let busy = false;
  let attempted = false;

  async function verifyIdentity(client) {
    const identity =
      await client.auth.getUser();

    if (
      identity.error ||
      identity.data?.user?.id !== TEST_UID
    ) {
      throw new Error("TEST_ACCOUNT_REQUIRED");
    }

    const sessionResult =
      await client.auth.getSession();

    const session =
      sessionResult.data?.session;

    if (
      sessionResult.error ||
      !session?.access_token ||
      session.user?.id !== TEST_UID
    ) {
      throw new Error("INVALID_TEST_SESSION");
    }

    return session.access_token;
  }

  async function request(token, payload) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      cache: "no-store",
      redirect: "error",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    return {
      status: response.status,
      result
    };
  }

  async function verifyReadiness(token) {
    const { status, result } =
      await request(token, {
        action: "status"
      });

    if (
      status !== 200 ||
      result.ok !== true ||
      result.authenticated !== true ||
      result.version !== BACKEND_VERSION ||
      result.code !== "BACKEND_READY" ||
      result.dryRunOnly !== false ||
      result.dryRunAuthorized !== true ||
      result.deletionEnabled !== true ||
      result.mode !== "restricted-execution"
    ) {
      throw new Error("BACKEND_NOT_READY");
    }
  }

  async function verifyDryRun(token) {
    const { status, result } =
      await request(token, {
        action: "delete-account",
        confirmation: CONFIRMATION,
        dryRun: true
      });

    if (
      status !== 200 ||
      result.version !== BACKEND_VERSION ||
      result.ok !== true ||
      result.code !== "DRY_RUN_PASSED" ||
      result.authorized !== true ||
      result.dryRun !== true ||
      result.deleted !== false
    ) {
      throw new Error("DRY_RUN_FAILED");
    }
  }

  async function execute() {
    if (busy || attempted) return;

    busy = true;

    const button =
      document.getElementById(BUTTON_ID);

    if (button) {
      button.disabled = true;
      button.textContent =
        "Validating security...";
    }

    let deletionConfirmed = false;

    try {
      const client =
        window.worknelySupabase;

      if (!client?.auth) {
        throw new Error("AUTH_UNAVAILABLE");
      }

      const token =
        await verifyIdentity(client);

      await verifyReadiness(token);
      await verifyDryRun(token);

      const approved = window.confirm(
        [
          "WORKNELY CONTROLLED DELETION",
          "",
          "Disposable test account only.",
          "",
          "UID:",
          TEST_UID,
          "",
          "Expected associated records:",
          "1 resume",
          "6 career analyses",
          "1 job application",
          "",
          "This operation is irreversible.",
          "",
          "Continue to final confirmation?"
        ].join("\n")
      );

      if (!approved) return;

      const typedConfirmation =
        window.prompt(
          "Type DELETE TEST ACCOUNT to confirm."
        );

      if (
        typedConfirmation !==
        "DELETE TEST ACCOUNT"
      ) {
        alert("Execution cancelled.");
        return;
      }

      const finalToken =
        await verifyIdentity(client);

      await verifyReadiness(finalToken);

      const executionToken =
        await verifyIdentity(client);

      attempted = true;

      if (button) {
        button.textContent =
          "Executing controlled deletion...";
      }

      const { status, result } =
        await request(executionToken, {
          action: "delete-account",
          confirmation: CONFIRMATION,
          dryRun: false,
          executionConfirmation:
            EXECUTION_CONFIRMATION
        });

      if (
        status !== 200 ||
        result.version !== BACKEND_VERSION ||
        result.ok !== true ||
        result.code !== "ACCOUNT_DELETED" ||
        result.deleted !== true
      ) {
        throw new Error(
          "DELETION_RESULT_UNCONFIRMED"
        );
      }

      deletionConfirmed = true;

      let localSignOut = false;

      try {
        const signOutResult =
          await client.auth.signOut({
            scope: "local"
          });

        localSignOut =
          !signOutResult.error;

      } catch {
        localSignOut = false;
      }

      alert([
        "WORKNELY CONTROLLED DELETION",
        "",
        "Executor: " + VERSION,
        "Backend: " + BACKEND_VERSION,
        "",
        "UID: " + TEST_UID.slice(0, 8),
        "HTTP: " + status,
        "Code: ACCOUNT_DELETED",
        "Deleted: true",
        "",
        "Local sign-out: " + (
          localSignOut
            ? "SUCCESS"
            : "UNCONFIRMED"
        ),
        "",
        "Backend result: SUCCESS",
        "",
        "SQL integrity audit required.",
        "Do not repeat the operation."
      ].join("\n"));

      if (localSignOut) {
        window.location.reload();
      }

    } catch {
      alert([
        "WORKNELY CONTROLLED DELETION",
        "",
        deletionConfirmed
          ? "Deletion confirmed."
          : attempted
            ? "Execution result unconfirmed."
            : "Security validation stopped.",
        "",
        attempted
          ? "Do not retry. Run SQL audit first."
          : "No real deletion request sent."
      ].join("\n"));

    } finally {
      busy = false;

      if (button) {
        button.disabled = attempted;

        button.textContent = attempted
          ? "Execution locked - audit required"
          : "Execute Controlled Test Deletion";
      }
    }
  }

  async function mount() {
    if (
      document.getElementById(BUTTON_ID)
    ) return;

    const client =
      window.worknelySupabase;

    if (!client?.auth) return;

    try {
      await verifyIdentity(client);
    } catch {
      return;
    }

    if (
      document.getElementById(BUTTON_ID)
    ) return;

    const button =
      document.createElement("button");

    button.id = BUTTON_ID;
    button.type = "button";

    button.textContent =
      "Execute Controlled Test Deletion";

    Object.assign(button.style, {
      position: "fixed",
      bottom: "120px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "2147483647",
      padding: "16px 20px",
      maxWidth: "90%",
      minHeight: "48px",
      border: "0",
      borderRadius: "16px",
      background: "#b91c1c",
      color: "#ffffff",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      touchAction: "manipulation",
      boxShadow:
        "0 8px 24px rgba(0,0,0,.18)"
    });

    button.addEventListener(
      "click",
      execute
    );

    document.body.appendChild(button);
  }

  if (document.readyState === "complete") {
    mount();
  } else {
    window.addEventListener(
      "load",
      mount,
      { once: true }
    );
  }
})();
