export const metadata = {
  title: "Editorial, Sourcing and Corrections Policy",
  description: "How Dholera Platform researches, labels, reviews, sources, updates, and corrects its published information.",
  alternates: { canonical: "/editorial-policy" },
};

const sections = [
  ["Editorial independence", "Dholera Platform is a private, independent information and advisory platform. It is not affiliated with or endorsed by DSIRDA, DICDL, or the Government of Gujarat. Commercial relationships must not change how documented facts are described."],
  ["Sources and verification", "Time-sensitive claims should link to the most direct available source, with preference for government authorities, statutory filings, tender documents, company disclosures, and original project records. Secondary reporting may provide context but should not be presented as official confirmation."],
  ["Facts, estimates and opinions", "Confirmed facts, announced plans, estimates, and editorial analysis must be clearly distinguished. Forecasts, expected completion dates, prices, appreciation, and returns are uncertain and must not be presented as guaranteed outcomes."],
  ["Updates", "Articles should display publication and update dates when material changes are made. Outdated statements should be revised or accompanied by a dated clarification."],
  ["Corrections", "Readers may report a factual error by emailing support@dholeraplatform.com with the page URL and supporting evidence. Material corrections should be made promptly and transparently."],
  ["Property and investment information", "Content is educational and does not replace legal, tax, financial, engineering, or title advice. Readers must independently verify ownership, encumbrances, zoning, permissions, developer claims, and applicable regulation before acting."],
];

export default function EditorialPolicyPage() {
  return <main className="mx-auto max-w-4xl px-6 py-28 text-slate-700 dark:text-slate-200">
    <p className="font-bold uppercase tracking-widest text-orange-600">Trust and transparency</p>
    <h1 className="mt-3 text-4xl font-black text-slate-950 dark:text-white">Editorial, sourcing and corrections policy</h1>
    <p className="mt-4 text-sm text-slate-500">Effective 1 September 2026</p>
    <div className="mt-10 space-y-10">{sections.map(([title, body]) => <section key={title}><h2 className="text-2xl font-black text-slate-950 dark:text-white">{title}</h2><p className="mt-3 text-lg leading-8">{body}</p></section>)}</div>
  </main>;
}
