import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBN6qClTk28er9L_AoQnko6M8weNp4bLZk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "user-management-admin-1128f.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "user-management-admin-1128f",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "user-management-admin-1128f.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "536387058166",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:536387058166:web:0fad3e8ce885fde06d2fd7",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-FKFH082E9K"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = typeof window !== "undefined" ? getAuth(app) : null;
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize App Check (Roadmap Phase 6)
if (typeof window !== "undefined") {
  const isHeadless = navigator.webdriver || window.name === 'puppeteer';
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (siteKey && !isHeadless) {
    initializeAppCheck(app, {
      provider: new ReCaptchaEnterpriseProvider(siteKey),
      isTokenAutoRefreshEnabled: true
    });
    (window as any)._appCheckInitialized = true;
  } else if (isHeadless) {
    console.log('[Firebase] Headless browser detected. Skipping App Check initialization to prevent hangs.');
  }
}

export { app, auth, analytics };
