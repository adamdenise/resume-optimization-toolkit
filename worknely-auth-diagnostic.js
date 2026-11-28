/* WORKNELY
 * Authenticated Backend Diagnostic
 * Version: 7.21.4.8
 * Non-destructive test
 */

(function () {
  "use strict";

  async function run() {
    const client = window.worknelySupabase;

    if (!client || !client.auth) {
      alert("FAIL: Supabase client unavailable.");
      return;
    }

    try {
      const { data, error } =
        await client.auth.getUser();

      if (error || !data.user) {
        alert("FAIL: Authentication required.");
        return;
      }

      const { data: sessionData, error: sessionError } =
        await client.auth.getSession();

      const session = sessionData?.session;

      if (
        sessionError ||
        !session?.access_token ||
        session.user?.id !== data.user.id
      ) {
        alert("FAIL: Invalid session.");
        return;
      }

      const response = await fetch(
        "https://xuyronnwsokfadnekeir.supabase.co/functions/v1/dynamic-task",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + session.access_token
          },
          body: JSON.stringify({
            action: "status"
          }),
          cache: "no-store"
        }
      );

      const result = await response.json();

      alert([
        "WORKNELY AUTH DIAGNOSTIC",
        "Version: 7.21.4.8",
        "",
        "PASS: User authenticated.",
        "PASS: Session verified.",
        "HTTP: " + response.status,
        "Backend version: " + (result.version || "Unknown"),
        "Backend code: " + (result.code || "None"),
        "Backend OK: " + (result.ok === true),
        "",
        "No deletion requested."
      ].join("\n"));

    } catch (error) {
      alert("FAIL: Backend diagnostic unavailable.");
    }
  }

  window.WorknelyAuthDiagnostic = Object.freeze({
    version: "7.21.4.8",
    run
  });

  function mount() {
    if (document.getElementById("wnAuthDiagnostic")) {
      return;
    }

    const button = document.createElement("button");

    button.id = "wnAuthDiagnostic";
    button.type = "button";
    button.textContent = "Run Authenticated Diagnostic";

    button.style.cssText = [
      "position:fixed",
      "bottom:24px",
      "left:50%",
      "transform:translateX(-50%)",
      "z-index:99999",
      "background:#6325ed",
      "color:white",
      "padding:14px 20px",
      "border:0",
      "border-radius:12px",
      "font-weight:700",
      "width:max-content",
      "max-width:90vw",
      "box-shadow:0 4px 20px #0002"
    ].join(";");

    button.addEventListener("click", run);
    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
