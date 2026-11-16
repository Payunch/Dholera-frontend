import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Dholera Infrastructure & City Updates",
  description: "Track live Dholera SIR infrastructure updates: Ahmedabad-Dholera Expressway, international airport, plug-and-play utilities, and Tata semiconductor fab progress.",
  alternates: { canonical: "https://www.dholeraplatform.com/infrastructure" },
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Infrastructure", path: "/infrastructure" }]} />
      {children}
    </>
  );
}
