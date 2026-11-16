import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "About Dholera Smart City & DSIR Facts",
  description: "Understand Dholera SIR's 920 sq km planned area, 422 sq km developable area, 22 villages, six TP schemes, and 22.54 sq km Activation Area in Gujarat.",
  alternates: { canonical: "https://www.dholeraplatform.com/smart-city" },
};

export default function SmartCityLayout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Smart City", path: "/smart-city" }]} />
      {children}
    </>
  );
}
