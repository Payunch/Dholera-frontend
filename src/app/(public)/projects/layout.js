import { projects } from "@/data/projects";

export const metadata = {
  title: "Dholera Projects & Plots for Sale | Verified Property Listings",
  description: "Explore verified residential, commercial, and industrial plots for sale in Dholera Special Investment Region (SIR). Pricing, sizes, and DSIRDA zoning clearance.",
  alternates: { canonical: "/projects" },
};

export default function Layout({ children }) {
  const catalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Verified Dholera SIR Real Estate & Plotted Development Projects",
    description: "Official real estate listings, plotted developments, and feasibility reports in Dholera SIR Gujarat.",
    itemListElement: projects.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "RealEstateListing",
        name: p.name,
        url: `https://dholeraplatform.com/projects/${p.slug}`,
        category: p.category,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: p.priceNumeric || "1850000",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "RealEstateAgent",
            name: "Dholera Platform",
            telephone: "+91-7435808031"
          }
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema).replace(/</g, "\\u003c") }}
      />
      {children}
    </>
  );
}
