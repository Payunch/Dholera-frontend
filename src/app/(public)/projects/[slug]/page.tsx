import { notFound } from"next/navigation";
import { projects } from"@/data/projects";
import { ProjectDetailClient } from"./ProjectDetailClient";

interface Props {
 params: Promise<{ slug: string }>;
}

import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) return {};

  return {
    title: `${project.name} | Dholera Investment Project`,
    description: project.description.slice(0, 160).replace(/\n/g, " "),
    openGraph: {
      title: `${project.name} | Dholera Projects`,
      description: project.description.slice(0, 160).replace(/\n/g, " "),
      images: [{ url: project.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.description.slice(0, 160).replace(/\n/g, " "),
      images: [project.image],
    }
  };
}

export async function generateStaticParams() {
 return projects.map((p) => ({
 slug: p.slug,
 }));
}

export default async function ProjectPage({ params }: Props) {
 const { slug } = await params;
 const project = projects.find((p) => p.slug === slug);

 if (!project) {
 notFound();
 }

 return <ProjectDetailClient project={project} />;
}
