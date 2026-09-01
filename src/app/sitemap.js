import { getUpdates } from "@/features/updates/api";
import { siteConfig } from "@/config/site";
import { getBlogPath } from "@/lib/blogSlug";

export const dynamic = "force-dynamic";

const publicRoutes = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/airport", changeFrequency: "weekly", priority: 0.8 },
  { path: "/author/naresh-gohel", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blogs", changeFrequency: "daily", priority: 0.9 },
  { path: "/clearance-engine", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/download", changeFrequency: "monthly", priority: 0.5 },
  { path: "/editorial-policy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/government-schemes", changeFrequency: "weekly", priority: 0.8 },
  { path: "/infrastructure", changeFrequency: "weekly", priority: 0.8 },
  { path: "/investment-guide", changeFrequency: "weekly", priority: 0.9 },
  { path: "/plots-for-sale", changeFrequency: "weekly", priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.8 },
  { path: "/smart-city", changeFrequency: "weekly", priority: 0.8 },
  { path: "/tp-maps", changeFrequency: "weekly", priority: 0.9 },
  { path: "/travel-lifestyle", changeFrequency: "weekly", priority: 0.7 },
];

export default async function sitemap() {
  let updates = [];

  try {
    updates = await getUpdates();
  } catch (error) {
    console.error("Failed to fetch blog entries for sitemap", error);
  }

  const staticEntries = publicRoutes.map(({ path, ...seo }) => ({
    url: `${siteConfig.url}${path}`,
    ...seo,
  }));

  const blogEntries = updates
    .filter((update) => update?.id)
    .map((update) => ({
      url: `${siteConfig.url}${getBlogPath(update)}`,
      lastModified: new Date(update.publishedAt || update.createdAt || Date.now()),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticEntries, ...blogEntries];
}
