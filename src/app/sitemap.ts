import { MetadataRoute } from "next";
import { getUpdates } from "@/features/updates/api";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Fetch all updates to include in sitemap
  let updates: any[] = [];
  try {
    updates = await getUpdates();
  } catch (error) {
    console.error("Sitemap: Failed to fetch updates", error);
  }

  const updateEntries: MetadataRoute.Sitemap = updates.map((update) => ({
    url: `${baseUrl}/updates/${update.id}`,
    lastModified: new Date(update.updatedAt || update.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/clearance-engine`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/investment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...updateEntries,
  ];
}
