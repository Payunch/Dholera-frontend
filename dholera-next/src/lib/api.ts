import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.dholeraplatform.com/api";

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
