import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Dholera Land Investment Guide & Checklist",
  description: "Comprehensive Dholera SIR land investment guide. Step-by-step acquisition checklist, TP1 & TP2 rate calculator, Collector NA clear title checks, and ROI.",
  alternates: { canonical: "https://www.dholeraplatform.com/investment-guide" },
  openGraph: {
    title: "Dholera Land Investment Guide & Checklist | Dholera Platform",
    description: "Comprehensive Dholera SIR land investment guide. Step-by-step acquisition checklist, TP1 & TP2 rate calculator, Collector NA clear title checks, and ROI.",
    url: "https://www.dholeraplatform.com/investment-guide",
    type: "website",
  }
};

export default function InvestmentGuideLayout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Investment Guide", path: "/investment-guide" }]} />
      {children}
    </>
  );
}
