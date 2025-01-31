import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add a rule to handle the canvas.node binary module
    config.module.rules.push({ test: /\.node$/, use: "raw-loader" });

    // Exclude canvas from being processed by Next.js in the browser
    if (!isServer) config.externals.push("canvas");

    // Add a rule to handle .svg files with @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
        pathname: "/v1/storage/buckets/**",
        search: "",
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG in next/image
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Optional, for security
  },
};

export default nextConfig;
