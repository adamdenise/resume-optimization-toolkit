import { createClient } from "npm:@supabase/supabase-js@2";

const VERSION = "7.21.4.2";
const ALLOWED_ORIGIN = "https://adamdenise.github.io";

const headers = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers":
    "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
  "Vary": "Origin"
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
    { status, headers }
  );
}

Deno.serve(async (request: Request) => {
  try {
    const origin = request.headers.get("origin");

    if (origin && origin !== ALLOWED_ORIGIN) {
      return respond(403, {
        ok: false,
        code: "ORIGIN_NOT_ALLOWED"
      });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers
      });
    }

    if (request.method !== "POST") {
      return respond(405, {
        ok: false,
        code: "METHOD_NOT_ALLOWED"
      });
    }

    const authorization =
      request.headers.get("Authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return respond(401, {
        ok: false,
        code: "AUTH_REQUIRED"
      });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return respond(401, {
        ok: false,
        code: "AUTH_REQUIRED"
      });
    }

    const url = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!url || !anonKey) {
      return respond(503, {
        ok: false,
        code: "SERVICE_UNAVAILABLE"
      });
    }

    const client = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });

    const { data, error } =
      await client.auth.getUser(token);

    if (error || !data.user?.id) {
      return respond(401, {
        ok: false,
        code: "INVALID_SESSION"
      });
    }

    return respond(200, {
      ok: true,
      code: "BACKEND_READY",
      authenticated: true,
      deletionEnabled: false,
      mode: "security-validation"
    });

  } catch {
    return respond(500, {
      ok: false,
      code: "INTERNAL_ERROR"
    });
  }
});
