import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Dholera Infrastructure Projects & Development Updates",
  description: "Track Dholera SIR infrastructure including roads, utilities, industrial projects, semiconductor investment, and regional connectivity.",
  alternates: { canonical: "/infrastructure" },
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Infrastructure", path: "/infrastructure" }]} />
      {children}
    </>
  );
}
