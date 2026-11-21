import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export: `npm run build` writes the site to the `out/` folder that nginx serves.
  output: "export",
  // The Next image optimizer needs a running Node server, which a static export doesn't have.
  images: { unoptimized: true },
};

export default nextConfig;
