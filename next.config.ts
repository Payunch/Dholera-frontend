import type { NextConfig } from "next";

const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.dholeraplatform.com/api";

let apiHostname = "api.dholeraplatform.com";
try {
  apiHostname = new URL(apiBase).hostname || apiHostname;
} catch {
  // Keep default hostname when env value is malformed.
}

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/updates",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/updates/:path*",
        destination: "/blogs/:path*",
        permanent: true,
      },
      {
        source: "/professional/clearance-requests",
        destination: "/clearance-engine",
        permanent: true,
      },
      {
        source: "/my-vault",
        destination: "/pdf",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: apiHostname,
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "dholerahub.com",
      },
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
