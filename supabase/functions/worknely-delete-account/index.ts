
import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * WORKNELY
 * Secure Account Deletion Engine
 *
 * Version: 7.21.4.12.16
 * Release: Backend Security Lock
 *
 * Controlled deletion test completed.
 *
 * Security configuration:
 * - Real deletion disabled
 * - Dry-run authorization disabled
 * - No privileged admin client
 * - No service role key access
 * - Authenticated status checks only
 * - Fail-closed execution
 */

const VERSION = "7.21.4.12.16";

const ALLOWED_ORIGIN =
  "https://adamdenise.github.io";

const DELETION_ENABLED = false;

const DRY_RUN_ONLY = true;

const SECURITY_LOCK = true;

const headers = {
  "Access-Control-Allow-Origin":
    ALLOWED_ORIGIN,

  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info",

  "Access-Control-Allow-Methods":
    "POST, OPTIONS",

  "Content-Type":
    "application/json",

  "Cache-Control":
    "no-store",

  "X-Content-Type-Options":
    "nosniff",

  "Vary":
    "Origin"
};

function respond(
  status: number,
  payload: Record<string, unknown>
) {
  return new Response(
    JSON.stringify({
      version: VERSION,
      ...payload
    }),
    {
      status,
      headers
    }
  );
}

const authOptions = {
  persistSession: false,
  autoRefreshToken: false,
  detectSessionInUrl: false
};

Deno.serve(async (request: Request) => {

  try {

    // 01. Origin validation

    const origin =
      request.headers.get("origin");

    if (
      origin &&
      origin !== ALLOWED_ORIGIN
    ) {
      return respond(403, {
        ok: false,
        code: "ORIGIN_NOT_ALLOWED"
      });
    }

    // 02. CORS preflight

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers
      });
    }

    // 03. HTTP method validation

    if (request.method !== "POST") {
      return respond(405, {
        ok: false,
        code: "METHOD_NOT_ALLOWED"
      });
    }

    // 04. Authorization validation

    const authorization =
      request.headers.get("Authorization");

    if (
      !authorization?.startsWith("Bearer ")
    ) {
      return respond(401, {
        ok: false,
        code: "AUTH_REQUIRED"
      });
    }

    const token =
      authorization.slice(7).trim();

    if (!token) {
      return respond(401, {
        ok: false,
        code: "AUTH_REQUIRED"
      });
    }

    // 05. Public backend configuration

    const url =
      Deno.env.get("SUPABASE_URL");

    const anonKey =
      Deno.env.get("SUPABASE_ANON_KEY");

    if (!url || !anonKey) {
      return respond(503, {
        ok: false,
        code: "SERVICE_UNAVAILABLE"
      });
    }

    // 06. Non-privileged authentication client

    const client = createClient(
      url,
      anonKey,
      {
        auth: authOptions
      }
    );

    // 07. Verify authenticated identity

    const { data, error } =
      await client.auth.getUser(token);

    if (
      error ||
      !data.user?.id
    ) {
      return respond(401, {
        ok: false,
        code: "INVALID_SESSION"
      });
    }

    // 08. Content type validation

    const contentType =
      request.headers.get("content-type") || "";

    const mediaType =
      contentType
        .split(";")[0]
        .trim()
        .toLowerCase();

    if (mediaType !== "application/json") {
      return respond(415, {
        ok: false,
        code: "UNSUPPORTED_CONTENT_TYPE"
      });
    }

    // 09. Request size validation

    const MAX_PAYLOAD_BYTES = 4096;

    const contentLength =
      request.headers.get("content-length");

    if (contentLength !== null) {

      const declaredLength =
        Number(contentLength);

      if (
        !Number.isSafeInteger(declaredLength) ||
        declaredLength < 0
      ) {
        return respond(400, {
          ok: false,
          code: "INVALID_CONTENT_LENGTH"
        });
      }

      if (
        declaredLength > MAX_PAYLOAD_BYTES
      ) {
        return respond(413, {
          ok: false,
          code: "PAYLOAD_TOO_LARGE"
        });
      }
    }

    // 10. Bounded request body reader

    if (!request.body) {
      return respond(400, {
        ok: false,
        code: "INVALID_REQUEST"
      });
    }

    const reader =
      request.body.getReader();

    const decoder =
      new TextDecoder("utf-8", {
        fatal: true
      });

    let raw = "";
    let receivedBytes = 0;

    try {

      while (true) {

        const { done, value } =
          await reader.read();

        if (done) break;

        receivedBytes += value.byteLength;

        if (
          receivedBytes > MAX_PAYLOAD_BYTES
        ) {

          try {
            await reader.cancel();
          } catch {
            // Cancellation is best effort.
          }

          return respond(413, {
            ok: false,
            code: "PAYLOAD_TOO_LARGE"
          });
        }

        raw += decoder.decode(value, {
          stream: true
        });
      }

      raw += decoder.decode();

    } catch {

      try {
        await reader.cancel();
      } catch {
        // Cancellation is best effort.
      }

      return respond(400, {
        ok: false,
        code: "INVALID_REQUEST"
      });

    } finally {

      reader.releaseLock();

    }

    // 11. JSON payload validation

    let body: Record<string, unknown>;

    try {

      const parsed =
        JSON.parse(raw);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {
        throw new Error("Invalid payload");
      }

      body = parsed;

    } catch {

      return respond(400, {
        ok: false,
        code: "INVALID_REQUEST"
      });
    }

    // 12. Allowed request fields

    const allowedFields = [
      "action",
      "confirmation",
      "dryRun",
      "executionConfirmation"
    ];

    if (
      Object.keys(body).some(
        key => !allowedFields.includes(key)
      )
    ) {
      return respond(400, {
        ok: false,
        code: "UNEXPECTED_FIELDS"
      });
    }

    // 13. Validate dry-run type

    if (
      body.dryRun !== undefined &&
      typeof body.dryRun !== "boolean"
    ) {
      return respond(400, {
        ok: false,
        code: "INVALID_DRY_RUN"
      });
    }

    // 14. Authenticated status endpoint

    if (body.action === "status") {

      return respond(200, {
        ok: true,
        code: "BACKEND_READY",

        authenticated: true,

        dryRunOnly: DRY_RUN_ONLY,

        dryRunAuthorized: false,

        deletionEnabled: DELETION_ENABLED,

        securityLock: SECURITY_LOCK,

        mode: "security-locked",

        controlledTestCompleted: true
      });
    }

    // 15. Reject unsupported actions

    if (
      body.action !== "delete-account"
    ) {
      return respond(400, {
        ok: false,
        code: "INVALID_ACTION"
      });
    }

    // 16. Permanent fail-closed test lock
    //
    // All deletion requests are rejected.
    // No privileged client exists.
    // No destructive operation is available.
    //
    // This also blocks dry-run authorization.

    return respond(503, {
      ok: false,

      code: "DELETION_DISABLED",

      deleted: false,

      authorized: false,

      deletionEnabled: false,

      securityLock: true,

      mode: "security-locked"
    });

  } catch {

    // 17. Safe error response

    return respond(500, {
      ok: false,
      code: "INTERNAL_ERROR",
      deleted: false
    });

  }

});
