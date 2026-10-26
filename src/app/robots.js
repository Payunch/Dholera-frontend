import { siteConfig } from "@/config/site";

export default function robots() {
  const baseUrl = siteConfig.url;

  return {
    rules: {
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
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
