import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBN6qClTk28er9L_AoQnko6M8weNp4bLZk", // NOTE: User should rotate this
  authDomain: "user-management-admin-1128f.firebaseapp.com",
  projectId: "user-management-admin-1128f",
  storageBucket: "user-management-admin-1128f.firebasestorage.app",
  messagingSenderId: "536387058166",
  appId: "1:536387058166:web:221d86e1db8169096d2fd7",
  measurementId: "G-N7HCNRG5J1"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize App Check (Roadmap Phase 6)
if (typeof window !== "undefined") {
  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider('6LcV6pYqAAAAANL-9I66S6-U3hW_6_n0v0W6-w6X'), // Site Key
    isTokenAutoRefreshEnabled: true
  });
}

export { app };
