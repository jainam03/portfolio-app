import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Lightbulb, Target, TrendingUp, Wrench } from "lucide-react";
import { ProjectArtifacts } from "@/components/projects/ProjectArtifacts";
import { personalInfo, projects } from "@/data/content";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";

type ProjectPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return getProjectSlugs();
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — ${personalInfo.name}`,
    description: project.summary,
    alternates: { canonical: `${personalInfo.siteUrl}/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${personalInfo.name}`,
      description: project.summary,
      url: `${personalInfo.siteUrl}/projects/${project.slug}`,
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const sections = [
    { label: "Problem", icon: Target, value: project.problem },
    { label: "Approach", icon: Lightbulb, value: project.approach },
    { label: "Outcome", icon: TrendingUp, value: project.outcome },
  ];

  return (
    <main className="relative min-h-screen">
      <div className="blob w-[500px] h-[500px] -left-40 top-24" style={{ background: "hsl(238, 78%, 68%)" }} />
      <article className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-20 space-y-12">
        <header>
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> All projects
          </Link>
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="chip-accent">{project.domain}</span>
            <span className="chip-muted">{project.projectType}</span>
            <span className="chip-muted">{project.period}</span>
            {project.teamContext && <span className="chip-muted">{project.teamContext}</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">{project.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed mt-5 max-w-3xl">{project.summary}</p>
          <div className="mt-7 p-5 rounded-2xl bg-[hsl(var(--primary)/0.06)] border border-[hsl(var(--primary)/0.18)]">
            <p className="text-[10px] uppercase tracking-widest font-semibold text-[hsl(var(--primary))] mb-2">Project outcome</p>
            <p className="font-semibold leading-relaxed">{project.impact}</p>
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {sections.map(({ label, icon: Icon, value }) => (
            <section key={label} className="glass rounded-2xl p-6">
              <h2 className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-3">
                <Icon className="w-4 h-4 text-[hsl(var(--primary))]" /> {label}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{value}</p>
            </section>
          ))}
          <section className="glass rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold mb-3">
              <Wrench className="w-4 h-4 text-[hsl(var(--primary))]" /> Tools and methods
            </h2>
            <div className="flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="chip-muted">{tool}</span>)}</div>
          </section>
        </div>

        <section className="glass rounded-2xl p-6 md:p-8">
          <h2 className="text-xs uppercase tracking-widest font-semibold mb-4">What I learned</h2>
          <ul className="space-y-3">{project.insights.map((insight) => <li key={insight} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"><span className="text-[hsl(var(--primary))]">•</span>{insight}</li>)}</ul>
        </section>

        {project.artifacts && <ProjectArtifacts artifacts={project.artifacts} />}

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[hsl(var(--border))] pt-6">
          <Link href="/#projects" className="btn-secondary"><ArrowLeft className="w-4 h-4" /> Back to all projects</Link>
          <Link href="/#contact" className="btn-primary">Discuss this work <ArrowUpRight className="w-4 h-4" /></Link>
        </footer>
      </article>
    </main>
  );
}
