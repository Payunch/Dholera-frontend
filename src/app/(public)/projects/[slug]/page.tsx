import { notFound } from"next/navigation";
import { projects } from"@/data/projects";
import { ProjectDetailClient } from"./ProjectDetailClient";

interface Props {
 params: Promise<{ slug: string }>;
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
