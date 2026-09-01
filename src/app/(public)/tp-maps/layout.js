import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Dholera TP Maps | Town Planning Scheme Maps & Information",
  description: "Explore Dholera TP scheme maps and town-planning information for Dholera Special Investment Region in one searchable resource.",
  alternates: { canonical: "/tp-maps" },
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "TP Maps", path: "/tp-maps" }]} />
      {children}
    </>
  );
}
