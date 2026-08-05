
import { getUpdates } from"@/features/updates/api";
import { siteConfig } from"@/config/site";

export const dynamic ="force-dynamic";

export default async function sitemap() {
 const baseUrl = siteConfig.url;

 // Fetch all updates to include in sitemap
 
 let updates = [];
 try {
 updates = await getUpdates();
 } catch (error) {
 console.error("Sitemap to fetch updates", error);
 }

 const updateEntries = updates.map((update) => ({
 url:`${baseUrl}/blogs/${update.id}`,
 lastModified: new Date(update.publishedAt || update.createdAt),
 changeFrequency:'weekly',
 priority: 0.6,
 }));

 return [
 {
 url: baseUrl,
 lastModified: new Date(),
 changeFrequency:'daily',
 priority: 1,
 },
 {
 url:`${baseUrl}/blogs`,
 lastModified: new Date(),
 changeFrequency:"daily",
 priority: 0.8,
 },
 {
 url:`${baseUrl}/tp-maps`,
 lastModified: new Date(),
 changeFrequency:"weekly",
 priority: 0.9,
 },
 {
 url:`${baseUrl}/pdf`,
 lastModified: new Date(),
 changeFrequency:"weekly",
 priority: 0.9,
 },
 {
 url:`${baseUrl}/portals`,
 lastModified: new Date(),
 changeFrequency:"monthly",
 priority: 0.7,
 },
 {
 url:`${baseUrl}/projects`,
 lastModified: new Date(),
 changeFrequency:"daily",
 priority: 0.9,
 },
 {
 url:`${baseUrl}/airport`,
 lastModified: new Date(),
 changeFrequency:"monthly",
 priority: 0.8,
 },
 {
 url:`${baseUrl}/infrastructure`,
 lastModified: new Date(),
 changeFrequency:"monthly",
 priority: 0.8,
 },
 {
 url:`${baseUrl}/clearance-engine`,
 lastModified: new Date(),
 changeFrequency:"monthly",
 priority: 0.8,
 },
 {
 url:`${baseUrl}/investment`,
 lastModified: new Date(),
 changeFrequency:"monthly",
 priority: 0.6,
 },
 {
 url:`${baseUrl}/contact`,
 lastModified: new Date(),
 changeFrequency:"yearly",
 priority: 0.5,
 },
 ...updateEntries,
 ];
}
