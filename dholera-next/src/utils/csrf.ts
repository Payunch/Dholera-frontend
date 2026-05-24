import { apiClient } from "../lib/api";

let cachedCsrfToken = null;

/**
 * Fetches a fresh CSRF token from the backend.
 * This also ensures the initial session cookie is set.
 */
export async function fetchCsrfToken() {
  if (cachedCsrfToken) return cachedCsrfToken;

  try {
    const res = await apiClient.get("/auth/csrf");
    cachedCsrfToken = res.data.csrfToken;
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
