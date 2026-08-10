import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Sparkles,
  SquareArrowOutUpRight,
  FileDown,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const apkUrl = process.env.NEXT_PUBLIC_APK_URL || "/downloads/dholera.apk";

export const metadata = {
  title: "Download Dholera App | APK Download",
  description:
    "Download the latest Dholera Android app APK from the official website. View app highlights, install steps, and basic details on one clean page.",
  alternates: {
    canonical: `${siteConfig.url}/download`,
  },
};

const highlights = [
  "Daily admin updates",
  "Login required for private content",
  "Secure account and password flow",
  "Notifications and PDF access",
];

const steps = [
  {
    title: "Download",
    text: "Tap the APK button below and save the file to your device.",
  },
  {
    title: "Allow install",
    text: "If Android asks, allow installation from your browser or file manager.",
  },
  {
    title: "Open app",
    text: "Install the app and sign in to access the full Dholera experience.",
  },
];

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,122,0,0.16),_transparent_34%),linear-gradient(180deg,#08101f_0%,#0b132b_36%,#f8fafc_36%,#f8fafc_100%)] text-slate-900">
      <section className="relative overflow-hidden pb-16 pt-10 text-white">
        <div className="absolute inset-0 bg-[url('/images/futuristic_dholera.png')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-slate-950/20" />
        <div className="relative z-10 container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-orange-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2">
                <Sparkles className="h-3.5 w-3.5" />
                Official download page
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                Latest Android build
              </span>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-orange-300/90">
                  Dholera platform apk
                </p>
                <h1 className="max-w-3xl text-4xl font-black uppercase leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                  One clean popup, one dedicated download page
                </h1>
                <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                  Download the Android app from a page that explains the basics clearly, keeps the homepage simple, and avoids confusing navigation.
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={apkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-[#FF7A00] px-6 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_rgba(255,122,0,0.28)] transition-all hover:-translate-y-0.5 hover:bg-orange-600"
                  >
                    <Download className="h-4 w-4" />
                    Download APK
                  </a>
                  <Link
                    href="/"
                    className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 text-xs font-black uppercase tracking-[0.2em] text-white transition-all hover:border-orange-300/60 hover:bg-white/10"
                  >
                    Back to home
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid gap-4 pt-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-black uppercase tracking-tight">Safe flow</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Simple download button, no extra steps.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-black uppercase tracking-tight">Android ready</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Optimized for direct Android installation.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/15 text-orange-300">
                      <FileDown className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-black uppercase tracking-tight">Direct file</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                      Stored as a normal static file on the site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-8 top-10 hidden h-28 w-28 rounded-full bg-orange-500/25 blur-3xl lg:block" />
                <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#1e293b] p-5">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
                      <span>Dholera app</span>
                      <span>v1.0.1+2</span>
                    </div>

                    <div className="mt-5 flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF7A00]/10 ring-1 ring-[#FF7A00]/20">
                        <Image src="/images/hp.png" alt="App logo" width={38} height={38} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-300">
                          Basic details
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-100">
                          Updates, secure login, PDFs, and notifications.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={apkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FF7A00] px-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-600"
                    >
                      <Download className="h-4 w-4" />
                      Get APK now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] pb-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <span className="text-sm font-black">{index + 1}</span>
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight text-slate-950">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-orange-300">
                  What users get
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                  Built for a simple first impression
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
                  The download page keeps the site attractive while still giving users the information they need before installing the app.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Daily content updates",
                    "Private content after login",
                    "Protected PDF access",
                    "Push notification support",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#FF7A00]">
                  Need help?
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-950">
                  Keep the site clean, keep the APK separate
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">
                  If you want, the homepage popup can stay as the single entry point, and this page can handle the actual APK download.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-slate-800"
                  >
                    Contact team
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 text-xs font-black uppercase tracking-[0.2em] text-slate-700 transition-colors hover:border-[#FF7A00] hover:text-[#FF7A00]"
                  >
                    Explore projects
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white px-6 py-5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)] md:flex-row md:text-left">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
                  File path
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  The APK is served from <span className="font-black">/downloads/dholera.apk</span>
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#FF7A00] px-5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-orange-600"
              >
                Back to homepage
                <SquareArrowOutUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
