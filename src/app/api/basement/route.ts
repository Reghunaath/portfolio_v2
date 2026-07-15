import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

// per-instance guard: run CREATE TABLE once per lambda, not on every claim
let ensured = false;

/**
 * The game's hidden-basement counter: each POST registers one discovery and
 * returns its ordinal (the identity column makes the numbering race-free).
 * The game calls this once per browser, on the first descent.
 */
export async function POST() {
  // Neon's Vercel integration injects DATABASE_URL (POSTGRES_URL kept for compat)
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

  if (!url) {
    // mirror /api/visitors: missing env is a soft 200, the game shows fallback text
    return NextResponse.json({ n: null, error: "not_configured" }, { status: 200 });
  }

  try {
    const sql = neon(url);
    if (!ensured) {
      await sql`CREATE TABLE IF NOT EXISTS basement_finders (
        id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        found_at timestamptz NOT NULL DEFAULT now()
      )`;
      ensured = true;
    }
    const rows = await sql`INSERT INTO basement_finders DEFAULT VALUES RETURNING id`;
    return NextResponse.json({ n: Number(rows[0].id) });
  } catch {
    return NextResponse.json({ n: null, error: "db_error" }, { status: 200 });
  }
}
