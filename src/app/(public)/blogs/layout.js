import BreadcrumbSchema from "@/components/common/BreadcrumbSchema";

export const metadata = {
  title: "Dholera News & Smart City Analysis",
  description: "Read verified Dholera SIR infrastructure updates, TP1 & TP2 town planning analysis, semiconductor fab progress news, and land investment intelligence.",
  alternates: { canonical: "https://www.dholeraplatform.com/blogs" },
};

export default function Layout({ children }) {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }]} />
      {children}
    </>
  );
}
