import posthog from "posthog-js";

export function initPostHog(): void {
  if (typeof window === "undefined") return;
  if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false, // fired manually after identify()
    capture_pageleave: true,
    autocapture: true,
  });
}

export { posthog };
