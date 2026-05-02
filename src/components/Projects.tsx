'use client';

import { useState, useEffect } from 'react';
import { projects } from '@/data/content';
import {
  X,
  ExternalLink,
  ChevronRight,
  Target,
  Wrench,
  Lightbulb,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

type Project = (typeof projects)[0];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-title-${project.id}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-6 md:p-8 animate-slide-up shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="chip-accent text-[10px] mb-3 inline-flex">
              {project.domain}
            </span>
            <h2
              id={`modal-title-${project.id}`}
              className="text-2xl font-bold tracking-tight"
            >
              {project.title}
            </h2>
            <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
              {project.summary}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-xl glass hover:bg-[hsl(var(--muted))] transition-all shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Impact banner */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[hsl(var(--primary)/0.08)] border border-[hsl(var(--primary)/0.2)] mb-6">
          <TrendingUp className="w-5 h-5 text-[hsl(var(--primary))]" />
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--primary))]">
              Key Impact
            </p>
            <p className="text-sm font-semibold">{project.impact}</p>
          </div>
        </div>

        {/* Case study sections */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-[hsl(var(--primary))]" />
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                Problem Statement
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">
              {project.problem}
            </p>
          </div>
          <div className="divider" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[hsl(var(--primary))]" />
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                Approach & Framework
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">
              {project.approach}
            </p>
          </div>
          <div className="divider" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-4 h-4 text-[hsl(var(--primary))]" />
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                Tools & Skills Used
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 pl-6">
              {project.tools.map((tool) => (
                <span key={tool} className="chip-muted">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="divider" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[hsl(var(--primary))]" />
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                Key Insights
              </h3>
            </div>
            <ul className="space-y-2 pl-6">
              {project.insights.map((insight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <ChevronRight className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
          <div className="divider" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[hsl(var(--primary))]" />
              <h3 className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">
                Outcome & Impact
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed pl-6">
              {project.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  return (
    <div
      className="glass rounded-2xl p-6 card-hover cursor-pointer relative overflow-hidden group h-full flex flex-col"
      onClick={onClick}
      role="button"
      tabIndex={0}
      id={`project-card-${project.id}`}
      aria-label={`View ${project.title} case study`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 group-hover:opacity-100 opacity-60"
        style={{
          background:
            index % 2 === 0
              ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))'
              : 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)))',
        }}
      />

      {/* Domain tag */}
      <div className="flex items-center justify-between mb-4">
        <span className={index % 2 === 0 ? 'chip' : 'chip-accent'}>
          {project.domain}
        </span>
        <ExternalLink className="w-4 h-4 text-muted-foreground transition-all duration-200 group-hover:text-[hsl(var(--primary))] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg leading-snug mb-2 transition-colors duration-200 group-hover:text-[hsl(var(--primary))]">
        {project.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
        {project.summary}
      </p>

      {/* Impact */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-[hsl(var(--primary)/0.06)] border border-[hsl(var(--primary)/0.12)] mb-4">
        <TrendingUp className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
        <p className="text-xs font-semibold text-[hsl(var(--primary))]">
          {project.impact}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span key={tag} className="chip-muted text-[10px]">
            {tag}
          </span>
        ))}
      </div>

      {/* CTA line */}
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-[hsl(var(--primary))] transition-colors duration-200 mt-auto">
        <span>View Case Study</span>
        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative">
      <div
        className="blob w-[400px] h-[400px] -left-32 top-1/2 -translate-y-1/2"
        style={{ background: 'hsl(238, 78%, 68%)' }}
      />

      <div className="section-container">
        {/* Section header */}
        <AnimatedSection>
          <div className="mb-16">
            <p className="section-tag">
              <span className="glow-dot" />
              Projects
            </p>
            <h2 className="section-heading">Where Thinking Meets Execution</h2>
            <p className="section-subheading">
              Each project is a structured case study — Problem → Approach →
              Impact. Click any card to read the full breakdown.
            </p>
          </div>
        </AnimatedSection>

        {/* Staggered card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 120} className="flex">
              <ProjectCard
                project={project}
                index={i}
                onClick={() => setActiveProject(project)}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
