import { Update } from"@/types/update";
import { API_BASE_URL } from"@/lib/api";

export async function getUpdates(search?: string, lang?: string): Promise<Update[]> {
 const params = new URLSearchParams();
 if (search) params.append("search", search);
 if (lang) params.append("lang", lang);
 
 const query = params.toString() ?`?${params.toString()}` :"";
 const res = await fetch(`${API_BASE_URL}/updates${query}`, {
 next: { tags: ["updates"] },
 cache:"no-store",
 });

 if (!res.ok) {
 throw new Error("Failed to fetch updates");
 }

 const data = await res.json();
 return Array.isArray(data) ? data : [];
}

export async function getUpdateById(id: string, lang?: string): Promise<Update | null> {
 const query = lang ?`?lang=${lang}` :"";
 const res = await fetch(`${API_BASE_URL}/updates/${id}${query}`, {
 next: { revalidate: 3600 },
 });

 if (!res.ok) {
 if (res.status === 404) return null;
 throw new Error("Failed to fetch update");
 }

 // The backend might return the article directly or wrapped in { data: ... }
 // Based on current frontend logic, it seems it returns the array and then results.find
 // But usually /updates/:id returns a single object.
 const data = await res.json();
 return data;
}
