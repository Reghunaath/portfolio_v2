import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The pixel-art game is a fully static app in `public/game/`. Its index.html
  // loads assets with RELATIVE paths (css/…, js/…), which only resolve when the
  // document URL sits under /game/. Serving the file directly at
  // /game/index.html gives that base, so send the clean `/game` route straight
  // there. Redirecting to `/game/index.html` (not `/game/`) sidesteps Next's
  // default trailing-slash normalization, which would 308 `/game/` back to
  // `/game` and loop. This redirect also runs ahead of the `[slug]` catch-all,
  // which would otherwise swallow /game and bounce it to `/`.
  async redirects() {
    return [
      { source: "/game", destination: "/game/index.html", permanent: false },
    ];
  },
};

export default nextConfig;
