'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { projects, Project, ProjectArtifact } from '@/data/content';
import { AlertCircle, ArrowUpRight, ChevronRight, ExternalLink, FileText, Lightbulb, Presentation, Target, TrendingUp, Wrench, X } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';

function useDialog(onClose: () => void) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKeyDown); };
  }, [onClose]);
}

function DialogShell({ title, children, onClose, maxWidth = 'max-w-2xl' }: { title: string; children: ReactNode; onClose: () => void; maxWidth?: string }) {
  useDialog(onClose);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close dialog" onClick={onClose} />
      <div className={`relative z-10 w-full ${maxWidth} max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-5 md:p-7 animate-slide-up shadow-2xl`}>
        <div className="flex items-start justify-between gap-4 mb-6"><h2 className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2><button onClick={onClose} className="p-2 rounded-xl glass hover:bg-[hsl(var(--muted))] transition-all shrink-0" aria-label="Close dialog"><X className="w-5 h-5" /></button></div>
        {children}
      </div>
    </div>
  );
}

function ArtifactViewer({ project, artifact, onClose }: { project: Project; artifact: ProjectArtifact; onClose: () => void }) {
  if (artifact.mode === 'external') return <DialogShell title={artifact.label} onClose={onClose}><div className="glass rounded-2xl p-6 text-center"><ExternalLink className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-3" /><p className="text-sm text-muted-foreground mb-5">This prototype is hosted externally.</p><a className="btn-primary" href={artifact.url} target="_blank" rel="noopener noreferrer">Open Prototype <ArrowUpRight className="w-4 h-4" /></a></div></DialogShell>;
  return <DialogShell title={`${project.title} · ${artifact.label}`} onClose={onClose} maxWidth="max-w-5xl"><div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))] bg-black/20"><iframe src={artifact.url} title={`${project.title} ${artifact.type}`} className="w-full h-[65vh] min-h-[420px]" /></div><div className="flex justify-end gap-2 mt-4"><a href={artifact.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">Open in new tab <ArrowUpRight className="w-4 h-4" /></a>{artifact.type === 'presentation' && <a href={artifact.url} download className="btn-primary">Download PDF</a>}</div></DialogShell>;
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections = [{ label: 'Problem', icon: AlertCircle, value: project.problem }, { label: 'Approach', icon: Target, value: project.approach }, { label: 'Outcome', icon: TrendingUp, value: project.outcome }];
  return <DialogShell title={project.title} onClose={onClose}>
    <div className="flex flex-wrap gap-2 mb-4"><span className="chip-accent">{project.domain}</span><span className="chip-muted">{project.period}</span></div>
    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.summary}</p>
    <div className="rounded-2xl p-4 bg-[hsl(var(--primary)/0.08)] border border-[hsl(var(--primary)/0.2)] mb-6"><p className="text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--primary))] mb-1">Key impact</p><p className="font-bold">{project.impact}</p></div>
    <div className="space-y-5">{sections.map(({ label, icon: Icon, value }) => <div key={label} className="flex items-start gap-3"><Icon className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 shrink-0" /><div><p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{label}</p><p className="text-sm leading-relaxed text-muted-foreground">{value}</p></div></div>)}</div>
    <div className="divider my-6" />
    <div className="grid md:grid-cols-2 gap-5"><div><div className="flex items-center gap-2 mb-3"><Wrench className="w-4 h-4 text-[hsl(var(--primary))]" /><p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Tools</p></div><div className="flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="chip-muted">{tool}</span>)}</div></div><div><div className="flex items-center gap-2 mb-3"><Lightbulb className="w-4 h-4 text-[hsl(var(--primary))]" /><p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Insights</p></div><ul className="space-y-2">{project.insights.map((insight) => <li key={insight} className="flex items-start gap-2 text-sm text-muted-foreground"><ChevronRight className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />{insight}</li>)}</ul></div></div>
  </DialogShell>;
}

function ArtifactChooser({ project, onClose, onCaseStudy, onArtifact }: { project: Project; onClose: () => void; onCaseStudy: () => void; onArtifact: (artifact: ProjectArtifact) => void }) {
  const availableArtifacts = (project.artifacts ?? []).filter((artifact) => artifact.available);
  return <DialogShell title={project.title} onClose={onClose}><p className="text-sm text-muted-foreground leading-relaxed mb-6">Choose how you want to explore this project.</p><div className="grid gap-3">
    <button onClick={onCaseStudy} className="flex items-center gap-4 text-left glass rounded-2xl p-4 card-hover group"><span className="p-3 rounded-xl bg-[hsl(var(--primary)/0.1)]"><FileText className="w-5 h-5 text-[hsl(var(--primary))]" /></span><span className="flex-1"><span className="block font-semibold text-sm">Read Case Study</span><span className="block text-xs text-muted-foreground mt-1">Problem, approach, tools, and outcome</span></span><ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--primary))]" /></button>
    {availableArtifacts.map((artifact) => <button key={artifact.type} onClick={() => onArtifact(artifact)} className="flex items-center gap-4 text-left glass rounded-2xl p-4 card-hover group"><span className="p-3 rounded-xl bg-[hsl(var(--accent)/0.1)]"><Presentation className="w-5 h-5 text-[hsl(var(--accent))]" /></span><span className="flex-1"><span className="block font-semibold text-sm">{artifact.label}</span><span className="block text-xs text-muted-foreground mt-1">Open the project artifact</span></span><ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--primary))]" /></button>)}
  </div>{availableArtifacts.length === 0 && <p className="text-xs text-muted-foreground mt-5 text-center">Presentation and prototype files will be added here soon.</p>}</DialogShell>;
}

function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const artifactCount = (project.artifacts ?? []).filter((artifact) => artifact.available).length;
  return <button onClick={onClick} className="glass rounded-2xl card-hover relative overflow-hidden group h-full flex flex-col text-left w-full" aria-label={`Explore ${project.title}`} id={`project-card-${project.id}`}>
    <div className="h-28 w-full relative overflow-hidden flex items-center justify-center border-b border-[hsl(var(--border))]"><div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: index % 2 === 0 ? 'radial-gradient(circle at center, hsl(var(--primary)), transparent)' : 'radial-gradient(circle at center, hsl(var(--accent)), transparent)' }} /><span className="absolute top-4 left-4 chip-accent text-[10px]">{project.domain}</span><TrendingUp className="w-11 h-11 text-[hsl(var(--primary))] opacity-40 group-hover:scale-110 transition-transform" /><ExternalLink className="absolute top-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-[hsl(var(--primary))] transition-all" /></div>
    <div className="p-5 flex flex-col flex-1"><div className="flex items-start justify-between gap-3 mb-2"><h3 className="font-bold text-base leading-snug group-hover:text-[hsl(var(--primary))] transition-colors">{project.title}</h3><span className="text-[10px] text-muted-foreground shrink-0">{project.period}</span></div><p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">{project.summary}</p><div className="p-3 rounded-xl bg-[hsl(var(--primary)/0.06)] border border-[hsl(var(--primary)/0.12)] mb-4"><p className="text-xs font-semibold text-[hsl(var(--primary))]">{project.impact}</p></div><div className="flex flex-wrap gap-1.5 mb-4">{project.tags.slice(0, 3).map((tag) => <span key={tag} className="chip-muted text-[10px]">{tag}</span>)}{project.tags.length > 3 && <span className="chip-muted text-[10px]">+{project.tags.length - 3}</span>}</div><div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-[hsl(var(--primary))] pt-3 border-t border-[hsl(var(--border))] transition-colors"><span>Explore project{artifactCount > 0 ? ` · ${artifactCount} artifact${artifactCount > 1 ? 's' : ''}` : ''}</span><ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div></div>
  </button>;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudyProject, setCaseStudyProject] = useState<Project | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<{ project: Project; artifact: ProjectArtifact } | null>(null);
  return <section id="projects" className="relative"><div className="blob w-[400px] h-[400px] -left-32 top-1/2 -translate-y-1/2" style={{ background: 'hsl(238, 78%, 68%)' }} /><div className="section-container"><AnimatedSection><div className="mb-12"><p className="section-tag"><span className="glow-dot" />Selected work</p><h2 className="section-heading">Proof, not promises.</h2><p className="section-subheading">Five projects across operations, analytics, product, and technology. Choose a case study or open an artifact.</p></div></AnimatedSection><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{projects.map((project, index) => <AnimatedSection key={project.id} delay={index * 100} className="flex"><ProjectCard project={project} index={index} onClick={() => setSelectedProject(project)} /></AnimatedSection>)}</div></div>{selectedProject && <ArtifactChooser project={selectedProject} onClose={() => setSelectedProject(null)} onCaseStudy={() => { setCaseStudyProject(selectedProject); setSelectedProject(null); }} onArtifact={(artifact) => { setSelectedArtifact({ project: selectedProject, artifact }); setSelectedProject(null); }} />}{caseStudyProject && <CaseStudy project={caseStudyProject} onClose={() => setCaseStudyProject(null)} />}{selectedArtifact && <ArtifactViewer project={selectedArtifact.project} artifact={selectedArtifact.artifact} onClose={() => setSelectedArtifact(null)} />}</section>;
}
