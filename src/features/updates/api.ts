import { Update } from "@/types/update";
import { API_BASE_URL } from "@/lib/api";

export async function getUpdates(search?: string): Promise<Update[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${API_BASE_URL}/updates${query}`, {
    next: { tags: ["updates"] },
    cache: "no-store", // For listing we might want fresh data or ISR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch updates");
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function getUpdateById(id: string): Promise<Update | null> {
  const res = await fetch(`${API_BASE_URL}/updates/${id}`, {
    next: { revalidate: 3600 }, // ISR: Cache for 1 hour
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
