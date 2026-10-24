import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (clever.zenova.agency). There is no server:
  // the match flow validates and "submits" on the client in demo mode.
  // (Cache Components is off: its segment rules conflict with exporting the
  // robots, sitemap and OG image routes, and nothing here needs request-time data.)
  output: "export",
  poweredByHeader: false,
  images: {
    // No image server on static hosting — source photos are pre-compressed
    // (see scripts/optimize-images.mjs) and served as-is.
    unoptimized: true,
  },
  turbopack: {
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
