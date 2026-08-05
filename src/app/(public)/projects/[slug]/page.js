import { notFound } from"next/navigation";
import { projects } from"@/data/projects";
import { ProjectDetailClient } from"./ProjectDetailClient";

>;
}

import { Metadata } from "next";

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

 return <ProjectDetailClient project={project} />;
}
