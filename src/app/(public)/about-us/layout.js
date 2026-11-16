import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "About Us: Dholera Land Advisory",
  description: "Learn how Dholera Platform provides independent planning maps, infrastructure updates, and evidence-led land due diligence across Dholera SIR.",
  alternates: { canonical: "https://www.dholeraplatform.com/about-us" },
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About Us", path: "/about-us" }]} />
      {children}
    </>
  );
}
