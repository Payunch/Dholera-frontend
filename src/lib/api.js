import axios from"axios";
import { getCookie } from"@/utils/cookies";

const trimTrailingSlash = (value) => value.replace(/\/+$/,"");

const resolveApiBaseUrl = () => {
 const envValue =
 process.env.NEXT_PUBLIC_API_BASE_URL ||
 process.env.NEXT_PUBLIC_API_URL;

 if (envValue && envValue.startsWith('http')) {
 return trimTrailingSlash(envValue);
 }

 // Fallback to production default
 return"https://api.dholeraplatform.com/api";
};

export const API_BASE_URL = resolveApiBaseUrl();
export const SITE_BASE_URL = API_BASE_URL.replace(/\/api$/,"");

export const apiClient = axios.create({
 baseURL,
 withCredentials: true,
 headers: {
"Content-Type":"application/json",
 },
});

// ROADMAP PHASE 6 APP CHECK SHIELD
apiClient.interceptors.request.use(async (config) => {
 // 1. Attach Lead Token if present in browser (ONLY for non-admin requests)
 if (typeof window !=="undefined") {
 const requestUrl = config.url || "";
 
 // Identify if the TARGET is an admin API or if we are on an AUTH request
 const isApiAdminRequest = requestUrl.includes('/admin/') || (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));
 const isAuthRequest = requestUrl.includes('/auth/');
 
 // We attach lead_token to any request that is NOT an admin task and NOT an auth task.
 // This ensures public syncs (like language preferences) work even if the user is on an admin page.
 if (!isApiAdminRequest && !isAuthRequest) {
 const leadToken = getCookie('lead_token');
 
 // Use config.headers.get/set for Axios 1.x compatibility
 const hasAuth = config.headers.get ? config.headers.get('Authorization') : config.headers['Authorization'];
 
 if (leadToken && !hasAuth) {
 const finalToken = leadToken.startsWith('Bearer') ? leadToken :`Bearer ${leadToken}`;
 if (config.headers.set) {
 config.headers.set('Authorization', finalToken);
 } else {
 config.headers['Authorization'] = finalToken;
 }
 }
 }
 }

  // 2. Attach App Check token in the browser environment
  if (typeof window !== "undefined") {
    if ((window)._appCheckInitialized) {
      try {
        const appCheckModule = await import("firebase/app-check");
        const getAppCheck = appCheckModule.getAppCheck || appCheckModule.default?.getAppCheck;
        const getToken = appCheckModule.getToken || appCheckModule.default?.getToken;

        if (typeof getAppCheck === "function" && typeof getToken === "function") {
          const appCheck = getAppCheck();
          
          // Wrap getToken in a timeout promise to prevent hanging in headless browsers / testing
          const tokenPromise = getToken(appCheck, false);
          const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("App Check timeout")), 1500)
          );
          
          const tokenResult = await Promise.race([tokenPromise, timeoutPromise]);
          if (tokenResult?.token) {
            config.headers['X-Firebase-AppCheck'] = tokenResult.token;
          }
        } else {
          console.warn('[App Check] getAppCheck or getToken function resolved as undefined from import.');
        }
      } catch (e) {
        // App check might fail if blocked by ad-blocker, timed out, or during hydration
        console.warn('[App Check] Failed to get token or timed out:', e.message);
      }
    }
  }
 return config;
});

// Interceptor for handling errors (e.g., redirect to login on 401)
apiClient.interceptors.response.use(
 (response) => response,
 (error) => {
 if (typeof window !=="undefined") {
 const pathname = window.location.pathname;
 const requestUrl = error.config?.url ||"";
 
 // Determine if this is an administrative request
 const isAdminTask = pathname.startsWith('/admin') || 
 requestUrl.includes('/admin/') || 
 requestUrl.includes('/auth/login');

 if (isAdminTask && (error.response?.status === 401 || error.response?.status === 403)) {
 const isLoginPage = pathname ==="/admin/login";
 if (!isLoginPage) {
 // Delay redirect slightly to ensure backend'Set-Cookie' (clearCookie) is processed
 setTimeout(() => {
 window.location.href ="/admin/login";
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
