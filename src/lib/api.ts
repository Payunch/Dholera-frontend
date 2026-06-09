import axios from "axios";
import { getCookie } from "@/utils/cookies";

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const resolveApiBaseUrl = () => {
  const envValue =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL;

  if (envValue && envValue.startsWith('http')) {
    return trimTrailingSlash(envValue);
  }

  // Fallback to production default
  return "https://api.dholeraplatform.com/api";
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

// ROADMAP PHASE 6: FIREBASE APP CHECK SHIELD
apiClient.interceptors.request.use(async (config) => {
  // 1. Attach Lead Token if present in browser (ONLY for non-admin requests)
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    const isLoginPage = pathname === "/admin/login";
    const isAdminPath = pathname.startsWith('/admin');
    const isAuthRequest = config.url?.includes('/auth/');
    
    // Do not attach lead_token if we are on an admin page or performing auth tasks
    if (!isAdminPath && !isAuthRequest) {
      const leadToken = getCookie('lead_token');
      if (leadToken && !config.headers['Authorization']) {
        config.headers['Authorization'] = leadToken.startsWith('Bearer ') ? leadToken : `Bearer ${leadToken}`;
      }
    }
  }

  // 2. Attach App Check token in the browser environment
  if (typeof window !== "undefined") {
    try {
      const { getAppCheck, getToken } = await import("firebase/app-check") as any;
      const appCheck = getAppCheck();
      const tokenResult = await getToken(appCheck, false);
      if (tokenResult?.token) {
        config.headers['X-Firebase-AppCheck'] = tokenResult.token;
      }
    } catch (e) {
      // App check might fail if blocked by ad-blocker or during hydration
    }
  }
  return config;
});

// Interceptor for handling errors (e.g., redirect to login on 401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      const requestUrl = error.config?.url || "";
      
      // Determine if this is an administrative request
      const isAdminTask = pathname.startsWith('/admin') || 
                          requestUrl.includes('/admin/') || 
                          requestUrl.includes('/auth/login');

      if (isAdminTask && (error.response?.status === 401 || error.response?.status === 403)) {
        const isLoginPage = pathname === "/admin/login";
        if (!isLoginPage) {
          // Delay redirect slightly to ensure backend 'Set-Cookie' (clearCookie) is processed
          setTimeout(() => {
            window.location.href = "/admin/login";
          }, 300);
        }
      }
      
      // For non-admin tasks (like PDF viewing), we do NOT redirect.
      // The individual components (e.g., SecurePdfViewer) handle 401/403 errors
      // by showing the appropriate user-login or payment UI.
    }
    return Promise.reject(error);
  }
);
