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

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
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

module.exports = nextConfig;
