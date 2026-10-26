import { projects } from "@/data/content";

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs() {
  return projects.map(({ slug }) => ({ slug }));
}
