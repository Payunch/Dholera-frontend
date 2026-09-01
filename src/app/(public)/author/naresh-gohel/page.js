import Link from "next/link";

export const metadata = {
  title: "Naresh Gohel | Dholera Platform Author & Operator",
  description: "About Naresh Gohel, operator and contributing author at Dholera Platform, including editorial responsibilities and contact details.",
  alternates: { canonical: "/author/naresh-gohel" },
};

export default function NareshGohelAuthorPage() {
  return <main className="mx-auto max-w-4xl px-6 py-28 text-slate-700 dark:text-slate-200">
    <p className="font-bold uppercase tracking-widest text-orange-600">Author and operator</p>
    <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">Naresh Gohel</h1>
    <div className="mt-8 space-y-6 text-lg leading-8">
      <p>Naresh Gohel operates Dholera Platform and contributes to its coverage of Dholera SIR planning, infrastructure, projects, and property due diligence.</p>
      <p>His editorial responsibility is to distinguish documented facts from analysis, identify the date and source of time-sensitive information, and correct material errors brought to the platform’s attention. Dholera Platform is independent and is not a government website.</p>
      <p>Readers should confirm land, title, planning, approval, and investment decisions using current official records and qualified professional advice.</p>
    </div>
    <div className="mt-10 flex flex-wrap gap-4">
      <a className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white" href="mailto:gohelnaresh7707@gmail.com">Contact Naresh</a>
      <Link className="rounded-full border border-slate-300 px-6 py-3 font-bold" href="/editorial-policy">Editorial policy</Link>
    </div>
  </main>;
}
