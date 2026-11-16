import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Dholera International Airport Updates",
  description: "Review Dholera International Airport location, planned capacity, construction milestones, flight connectivity, and land impact around Aerocity.",
  alternates: { canonical: "https://www.dholeraplatform.com/airport" },
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Airport", path: "/airport" }]} />
      {children}
    </>
  );
}
