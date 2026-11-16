import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Dholera TP Maps: Town Planning Schemes",
  description: "Download official Dholera SIR Town Planning (TP) scheme maps 1 to 6. Detailed zoning boundaries, village survey numbers, road networks, and land use plans.",
  alternates: { canonical: "https://www.dholeraplatform.com/tp-maps" },
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "TP Maps", path: "/tp-maps" }]} />
      {children}
    </>
  );
}
