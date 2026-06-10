import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes the whole site as plain HTML
  // to web/out/. Serve it with any static file server.
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
