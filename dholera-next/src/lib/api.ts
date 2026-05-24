import axios from "axios";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const resolveApiBaseUrl = () => {
  const envValue =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "";

  return trimTrailingSlash(envValue || "https://api.dholeraplatform.com/api");
};

export const API_BASE_URL = resolveApiBaseUrl();
export const SITE_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for handling errors (e.g., redirect to login on 401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && (error.response?.status === 401 || error.response?.status === 403)) {
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);
