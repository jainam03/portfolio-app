'use client';

import { useState } from 'react';
import type { Project, ProjectArtifact, ProjectFocus } from '@/data/content';
import { projects } from '@/data/content';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArtifactChooser, ArtifactViewer, CaseStudyDialog } from '@/components/projects/ProjectDialogs';

const filters: { label: string; areas: ProjectFocus[] }[] = [
  { label: 'All work', areas: [] },
  { label: 'Operations & analytics', areas: ['operations', 'analytics'] },
  { label: 'Product & UX', areas: ['product'] },
  { label: 'Technology & research', areas: ['technology'] },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<{ project: Project; artifact: ProjectArtifact } | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<ProjectFocus[]>([]);

  const visibleProjects = selectedAreas.length === 0
    ? projects
    : projects.filter((project) => selectedAreas.some((area) => project.focusAreas.includes(area)));

  return (
    <section id="projects" className="relative">
      <div className="blob w-[400px] h-[400px] -left-32 top-1/2 -translate-y-1/2" style={{ background: 'hsl(238, 78%, 68%)' }} />
      <div className="section-container">
        <AnimatedSection>
          <div className="mb-8">
            <p className="section-tag"><span className="glow-dot" />Selected work</p>
            <h2 className="section-heading">Where Thinking Meets Execution</h2>
            <p className="section-subheading">Choose a focus area, explore a case study, or open the project materials.</p>
          </div>
        </AnimatedSection>

        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by focus area">
          {filters.map((filter) => {
            const active = filter.areas.length === selectedAreas.length && filter.areas.every((area) => selectedAreas.includes(area));
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedAreas(filter.areas)}
                className={active ? 'chip-accent' : 'chip-muted hover:text-foreground'}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-live="polite">
          {visibleProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 75} className="flex">
              <ProjectCard project={project} index={index} onQuickView={() => setSelectedProject(project)} />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ArtifactChooser
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onCaseStudy={() => { setCaseStudyProject(selectedProject); setSelectedProject(null); }}
          onArtifact={(artifact) => { setSelectedArtifact({ project: selectedProject, artifact }); setSelectedProject(null); }}
        />
      )}
      {caseStudyProject && <CaseStudyDialog project={caseStudyProject} onClose={() => setCaseStudyProject(null)} />}
      {selectedArtifact && <ArtifactViewer project={selectedArtifact.project} artifact={selectedArtifact.artifact} onClose={() => setSelectedArtifact(null)} />}
    </section>
  );
}
