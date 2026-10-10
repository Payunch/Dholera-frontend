import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) return {};

  return {
    title: `${project.name} | Dholera Investment Project`,
    description: `${project.name} offers ${project.offering} in the ${project.category} zone. Plot sizes: ${project.plotSizes}. Zoning: ${project.zoning}.`,
    openGraph: {
      title: `${project.name} | Dholera Projects`,
      description: `${project.name} offers ${project.offering} in the ${project.category} zone. Plot sizes: ${project.plotSizes}. Zoning: ${project.zoning}.`,
      images: [{ url: project.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: `${project.name} offers ${project.offering} in the ${project.category} zone. Plot sizes: ${project.plotSizes}. Zoning: ${project.zoning}.`,
      images: [project.image],
    }
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const priceNum = project.priceNumeric || 1850000;
  const listingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: project.name,
    description: `${project.name} offers ${project.offering} in Dholera SIR (${project.category} zone). Available plot sizes: ${project.plotSizes}. Zoning: ${project.zoning}.`,
    url: `https://dholeraplatform.com/projects/${project.slug}`,
    image: project.image?.startsWith("http") ? project.image : `https://dholeraplatform.com${project.image}`,
    category: project.category,
    datePosted: "2026-01-01",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: priceNum,
      highPrice: priceNum * 3,
      price: priceNum,
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01",
      seller: {
        "@type": "RealEstateAgent",
        name: "Dholera Platform",
        telephone: "+91-7435808031",
        url: "https://dholeraplatform.com"
      }
    },
    about: {
      "@type": "Place",
      name: `${project.name} Site`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dholera SIR",
        addressRegion: "Gujarat",
        addressCountry: "IN"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "22.2450",
        longitude: "72.1950"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema).replace(/</g, "\\u003c") }}
      />
      <ProjectDetailClient project={project} />
    </>
  );
}
