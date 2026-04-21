import { NextResponse } from "next/server";

const POSTHOG_HOST = "https://us.posthog.com";

export const revalidate = 3600; // cache for 1 hour

export async function GET() {
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;

  if (!projectId || !apiKey) {
    return NextResponse.json({ count: null, error: "not_configured" }, { status: 200 });
  }

  try {
    const res = await fetch(`${POSTHOG_HOST}/api/projects/${projectId}/query/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query: {
          kind: "HogQLQuery",
          query: "SELECT count(DISTINCT distinct_id) AS unique_visitors FROM events WHERE event = '$pageview'",
        },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ count: null, error: "posthog_error" }, { status: 200 });
    }

    const data = await res.json() as { results?: [[number]] };
    const count = data.results?.[0]?.[0] ?? null;

    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null, error: "fetch_failed" }, { status: 200 });
  }
}
