import { siteConfig } from "@/config/site";

export default function robots() {
  const baseUrl = siteConfig.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/pdf/",
          "/portals/",
          "/downloads/",
          "/leads",
          "/system",
          "/database",
          "/thank-you",
          "/thank-you/",
          "/thank-you-home",
          "/thank-you-contact"
        ],
      },
      // Generative Engine Optimization (GEO): explicitly allow AI search engines
      {
        userAgent: [
          "GPTBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Google-Extended",
          "Applebot-Extended"
        ],
        allow: [
          "/",
          "/blogs",
          "/blogs/",
          "/tp-maps",
          "/projects",
          "/infrastructure",
          "/invest",
          "/llms.txt",
          "/llms-full.txt"
        ],
        disallow: [
          "/admin/",
          "/pdf/",
          "/portals/",
          "/downloads/",
          "/leads",
          "/system",
          "/database"
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
