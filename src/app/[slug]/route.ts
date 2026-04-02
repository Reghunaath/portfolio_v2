import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const safe = slug.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 60);

  const section = request.nextUrl.searchParams.get("s");
  const hash = section ? `#${section}` : "";
  const response = NextResponse.redirect(new URL(`/${hash}`, request.url));

  if (safe) {
    response.cookies.set("ph_referral", safe, {
      maxAge: 60,
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}
