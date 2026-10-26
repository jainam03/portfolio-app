import Link from "next/link";
import { ArrowUpRight, ChevronRight, TrendingUp } from "lucide-react";
import type { Project } from "@/data/content";

export function ProjectCard({
  project,
  index,
  onQuickView,
}: {
  project: Project;
  index: number;
  onQuickView: () => void;
}) {
  const artifactCount = (project.artifacts ?? []).filter((artifact) => artifact.available).length;

  return (
    <article className="glass rounded-2xl card-hover relative overflow-hidden group h-full flex flex-col w-full">
      <div className="h-24 w-full relative overflow-hidden flex items-center justify-center border-b border-[hsl(var(--border))]">
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: index % 2 === 0 ? "radial-gradient(circle at center, hsl(var(--primary)), transparent)" : "radial-gradient(circle at center, hsl(var(--accent)), transparent)" }} />
        <span className="absolute top-4 left-4 chip-accent text-[10px]">{project.domain}</span>
        <TrendingUp className="w-10 h-10 text-[hsl(var(--primary))] opacity-40 group-hover:scale-110 transition-transform" />
        <span className="absolute top-4 right-4 text-[10px] font-semibold text-muted-foreground">
          {artifactCount ? `${artifactCount} artifact${artifactCount === 1 ? "" : "s"}` : "Case study"}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-bold text-base leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">{project.title}</h3>
          <span className="text-[10px] text-muted-foreground shrink-0">{project.period}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="chip-muted text-[10px]">{project.projectType}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">{project.summary}</p>
        <div className="p-3 rounded-xl bg-[hsl(var(--primary)/0.06)] border border-[hsl(var(--primary)/0.12)] mb-4">
          <p className="text-xs font-semibold text-[hsl(var(--primary))]">{project.impact}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => <span key={tag} className="chip-muted text-[10px]">{tag}</span>)}
          {project.tags.length > 3 && <span className="chip-muted text-[10px]">+{project.tags.length - 3}</span>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[hsl(var(--border))]">
          <button type="button" onClick={onQuickView} className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-[hsl(var(--primary))] transition-colors">
            Quick view <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[hsl(var(--primary))] hover:underline">
            Full case study <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
