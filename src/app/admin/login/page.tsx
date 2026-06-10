"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, User, KeyRound, Loader2, ChevronRight } from "lucide-react";
import { apiClient } from "@/lib/api";
import { fetchCsrfToken, clearCsrfCache } from "@/utils/csrf";

const parseAuthError = (err: unknown) => {
  const responseData =
    typeof err === "object" && err !== null && "response" in err
      ? (err as { response?: { data?: { mfaRequired?: boolean; error?: string } } }).response?.data
      : undefined;

  return {
    message: responseData?.error || "Access handshake failed. Verify credentials and network integrity.",
    mfaRequired: Boolean(responseData?.mfaRequired),
  };
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mfaCode, setMfaCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [mfaEnabled, setMfaEnabled] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const csrf = await fetchCsrfToken();
      
      // Use the global apiClient but ensure CSRF is passed
      // We pass headers here; apiClient interceptors will append others.
      await apiClient.post(
        "/auth/login", 
        { username, password, mfaCode },
        { 
          headers: { 
            "X-CSRF-Token": csrf 
          } 
        }
      );

      setLoading(true);
      setError("");
      // Clear cache and use a full page reload for maximum cookie reliability
      clearCsrfCache();
      
      console.log("[Login] Success. Relocating to dashboard...");
      window.location.href = "/admin/dashboard";
    } catch (err) {
      console.error("[Login] Authentication exception:", err);
      clearCsrfCache();
      const { message, mfaRequired } = parseAuthError(err);
      setMfaEnabled(mfaRequired);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-900 p-4">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-600 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-[440px] space-y-8 rounded-[2.5rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl shadow-2xl">
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 shadow-[0_0_30px_rgba(234,88,12,0.4)] text-slate-900 dark:text-white">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">Admin <span className="text-orange-500">Access</span></h1>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Master Control Terminal v4.0</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold text-red-400 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="USERNAME"
                className="w-full rounded-2xl border-2 border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-white outline-none transition-all focus:border-orange-600 focus:bg-white/10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                placeholder="PASSWORD"
                className="w-full rounded-2xl border-2 border-white/5 bg-white/5 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-white outline-none transition-all focus:border-orange-600 focus:bg-white/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mfaEnabled && (
              <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />
                <input
                  type="text"
                  placeholder="MFA CODE"
                  className="w-full rounded-2xl border-2 border-orange-500/20 bg-orange-500/5 py-4 pl-12 pr-4 text-sm font-black tracking-widest text-orange-500 outline-none transition-all focus:border-orange-500"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-600 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-orange-500 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Initialize Handshake
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400 italic">
            Authorized Personnel Only - IP Logged
          </p>
        </div>
      </div>
    </div>
  );
}
