"use client";

import { useEffect } from "react";
import { initPostHog, posthog } from "@/lib/posthog";

const COOKIE = "ph_referral";

function readAndClearSlug(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((r) => r.startsWith(`${COOKIE}=`));
  if (!match) return null;
  const slug = decodeURIComponent(match.split("=")[1]);
  document.cookie = `${COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  return slug || null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog();
    const slug = readAndClearSlug();
    if (slug) {
      posthog.identify(slug, { referral_slug: slug });
    }
    posthog.capture("$pageview", { $current_url: window.location.href });
  }, []);

  return <>{children}</>;
}
