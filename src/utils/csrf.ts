import { apiClient } from"../lib/api";

let cachedCsrfToken: string | null = null;

/**
 * Fetches a fresh CSRF token from the backend.
 * This also ensures the initial session cookie is set.
 */
export async function fetchCsrfToken(): Promise<string | null> {
 if (cachedCsrfToken) return cachedCsrfToken;

 try {
 // Support both legacy and current backend CSRF endpoints.
 const res = await apiClient.get("/auth/csrf-token").catch(() => apiClient.get("/auth/csrf"));
 cachedCsrfToken = res.data?.csrfToken || null;
 return cachedCsrfToken;
 } catch (err) {
 console.error("Failed to fetch CSRF token:", err);
 return null;
 }
}

/**
 * Clears the CSRF token cache. 
 * Should be called on login failure or after successful login (session regeneration).
 */
export function clearCsrfCache() {
 cachedCsrfToken = null;
}
