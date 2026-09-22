import { NextResponse, type NextRequest } from "next/server";
import crypto from "node:crypto";

const SUPABASE_URL =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const IS_PROD = process.env.NODE_ENV === "production";

function base64url(buf: Buffer): string {
  return buf.toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function GET(request: NextRequest) {
  if (!SUPABASE_URL) {
    return NextResponse.redirect(
      new URL("/login?error=google_not_configured", request.url)
    );
  }

  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/dashboard";

  
  const verifier = base64url(crypto.randomBytes(32));
  const challenge = base64url(
    crypto.createHash("sha256").update(verifier).digest()
  );

  const callbackUrl = new URL("/api/auth/callback", request.url).toString();

  const supabaseAuthUrl = new URL(SUPABASE_URL + "/auth/v1/authorize");
  supabaseAuthUrl.searchParams.set("provider", "google");
  supabaseAuthUrl.searchParams.set("redirect_to", callbackUrl);
  supabaseAuthUrl.searchParams.set("code_challenge", challenge);
  supabaseAuthUrl.searchParams.set("code_challenge_method", "S256");

  const response = NextResponse.redirect(supabaseAuthUrl.toString());

  
  const cookieValue = encodeURIComponent(verifier + "|" + next);
  const parts = [
    "praxis_oauth=" + cookieValue,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=600",
  ];
  if (IS_PROD) parts.push("Secure");
  response.headers.append("Set-Cookie", parts.join("; "));

  return response;
}
