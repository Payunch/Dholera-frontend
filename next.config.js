const apiBase =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.dholeraplatform.com/api";
const apkVersion = process.env.NEXT_PUBLIC_APK_VERSION || "1.0.2+5";
const apkFileVersion = apkVersion.replace(/\+/g, "-");

let apiHostname = "api.dholeraplatform.com";
try {
  apiHostname = new URL(apiBase).hostname || apiHostname;
} catch {
  // Keep default hostname when env value is malformed.
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
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
  async rewrites() {
    return [
      {
        source: "/:lang(hi|gu)/:path*",
        destination: "/:path*?explicitLang=:lang",
      },
      {
        source: "/:lang(hi|gu)",
        destination: "/?explicitLang=:lang",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "dholeraplatform.com",
          },
        ],
        destination: "https://www.dholeraplatform.com/:path*",
        permanent: true,
      },
      {
        source: "/downloads/dholera.apk",
        destination: `/downloads/dholera-${apkFileVersion}.apk`,
        permanent: false,
      },
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
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/blogs/ahmedabad-metro-phase-3-cleared-a-major-boost-for-dholera-airport-link",
        destination: "/blogs/ahmedabad-metro-phase-3-pib-clearance-boosting-connectivity-to-dholera-smart-city",
        permanent: true,
      },
      {
        source: "/blogs/ahmedabad-metro-phase-3-gets-pib-clearance-dholera-airport-link-moves-closer",
        destination: "/blogs/ahmedabad-metro-phase-3-pib-clearance-boosting-connectivity-to-dholera-smart-city",
        permanent: true,
      },
      {
        source: "/blogs/western-railway-floats-18901-crore-tender-for-dholera-smart-city",
        destination: "/blogs/western-railway-has-floated-a-massive-1890168-crore-tender",
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
