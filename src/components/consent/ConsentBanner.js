"use client";

import { useEffect, useRef, useState } from"react";
import { setCookie, getCookie } from"@/utils/cookies";



const CONSENT_STORAGE_KEY ="analytics_consent_choice";
const OPEN_CONSENT_EVENT ="open-consent-banner";

function updateGoogleConsent(choice) {
 if (typeof window ==="undefined" || typeof window.gtag !=="function") {
 return;
 }

 const granted = choice ==="accepted";

 window.gtag("consent","update", {
 ad_storage: granted ?"granted" :"denied",
 ad_user_data: granted ?"granted" :"denied",
 ad_personalization: granted ?"granted" :"denied",
 analytics_storage: granted ?"granted" :"denied",
 });
}

export default function ConsentBanner() {
 const [isVisible, setIsVisible] = useState(false);
 const [mounted, setMounted] = useState(false);
 const [statusMessage, setStatusMessage] = useState(null);
 const feedbackTimerRef = useRef(null);

 const clearFeedbackTimer = () => {
 if (feedbackTimerRef.current) {
 window.clearTimeout(feedbackTimerRef.current);
 feedbackTimerRef.current = null;
 }
 };

 useEffect(() => {
 setMounted(true);
 const storedChoice = getCookie(CONSENT_STORAGE_KEY);
 
 // Only show if no choice has been made
 if (storedChoice !=="accepted" && storedChoice !=="rejected") {
 setIsVisible(true);
 }

 if (storedChoice ==="accepted" || storedChoice ==="rejected") {
 updateGoogleConsent(storedChoice);
 }
 }, []);

 useEffect(() => {
 return () => {
 clearFeedbackTimer();
 };
 }, []);

 useEffect(() => {
 const handleOpenBanner = () => setIsVisible(true);

 window.addEventListener(OPEN_CONSENT_EVENT, handleOpenBanner);

 return () => {
 window.removeEventListener(OPEN_CONSENT_EVENT, handleOpenBanner);
 };
 }, []);

 const handleChoice = (choice) => {
 setCookie(CONSENT_STORAGE_KEY, choice, 365); // 1 year
 updateGoogleConsent(choice);
 clearFeedbackTimer();
 setStatusMessage(choice ==="accepted" ?"Preferences saved. Analytics enabled." :"Preferences saved. Analytics disabled.");
 setIsVisible(false);

 feedbackTimerRef.current = window.setTimeout(() => {
 setStatusMessage(null);
 feedbackTimerRef.current = null;
 }, 2400);
 };

 if (!mounted) return null;

 return (
 <>
 {statusMessage && (
 <div className="fixed inset-x-0 bottom-4 z-[1000] px-4 pointer-events-auto">
 <div className="mx-auto max-w-md rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-lg shadow-emerald-950/5 animate-fade-up">
 {statusMessage}
 </div>
 </div>
 )}

 {isVisible && (
 <div className="fixed inset-x-0 bottom-0 z-[1000] px-4 pb-4 pointer-events-auto">
 <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur md:flex-row md:items-center md:justify-between animate-fade-up dark:bg-slate-900">
 <div className="min-w-0 space-y-1">
 <p className="text-sm font-semibold text-slate-900 dark:text-white">Cookies and analytics</p>
 <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
 We use Google Analytics to understand traffic and improve the site. Accept to allow analytics cookies, or reject to keep them disabled.
 </p>
 </div>
 <div className="grid w-full min-w-0 grid-cols-2 gap-3 md:flex md:w-auto md:shrink-0">
 <button
 type="button"
 onClick={() => handleChoice("rejected")}
 className="min-h-11 min-w-0 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors hover:bg-white dark:hover:bg-slate-800 dark:bg-slate-900 md:px-5"
 >
 Reject
 </button>
 <button
 type="button"
 onClick={() => handleChoice("accepted")}
 className="min-h-11 min-w-0 rounded-full bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 md:px-5"
 >
 Accept
 </button>
 </div>
 </div>
 </div>
 )}
 </>
 );
}

export function openConsentBanner() {
 if (typeof window ==="undefined") {
 return;
 }

 window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
