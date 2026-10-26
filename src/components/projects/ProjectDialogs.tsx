'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Project, ProjectArtifact } from '@/data/content';
import { trapDialogTabFocus } from '@/lib/dialog-focus';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileText,
  Lightbulb,
  Presentation,
  RefreshCw,
  Target,
  TrendingUp,
  Wrench,
  X,
} from 'lucide-react';

function useDialog(onClose: () => void, closeButtonRef: React.RefObject<HTMLButtonElement>, dialogRef: React.RefObject<HTMLDivElement>) {
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])',
      ));
      trapDialogTabFocus(event, focusable, document.activeElement as HTMLElement | null, () => dialogRef.current?.focus());
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [closeButtonRef, dialogRef]);
}

function DialogShell({
  title,
  children,
  onClose,
  maxWidth = 'max-w-2xl',
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  maxWidth?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = `dialog-title-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  useDialog(onClose, closeButtonRef, dialogRef);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-label="Close dialog" tabIndex={-1} onClick={onClose} />
      <div ref={dialogRef} tabIndex={-1} className={`relative z-10 w-full ${maxWidth} max-h-[90vh] overflow-y-auto glass-strong rounded-3xl p-5 md:p-7 animate-slide-up shadow-2xl`}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <h2 id={titleId} className="text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="p-2 rounded-xl glass hover:bg-[hsl(var(--muted))] transition-all shrink-0" aria-label="Close dialog">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ArtifactViewer({ project, artifact, onClose }: { project: Project; artifact: ProjectArtifact; onClose: () => void }) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(artifact.mode === 'storage-pdf');
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const loadSignedUrl = useCallback(async () => {
    if (artifact.mode !== 'storage-pdf') return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/artifacts?project=${encodeURIComponent(artifact.storageKey)}`, { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error || 'Unable to load this presentation.');
      setSignedUrl(payload.url);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load this presentation.');
    } finally {
      setLoading(false);
    }
  }, [artifact]);

  useEffect(() => {
    if (artifact.mode === 'storage-pdf') void loadSignedUrl();
  }, [artifact.mode, loadSignedUrl, attempt]);

  if (artifact.mode !== 'storage-pdf') {
    return (
      <DialogShell title={artifact.label} onClose={onClose}>
        <div className="glass rounded-2xl p-6 text-center">
          <ExternalLink className="w-8 h-8 text-[hsl(var(--primary))] mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-5">This prototype will open in a new tab.</p>
          <a className="btn-primary" href={artifact.url} target="_blank" rel="noopener noreferrer">
            Open Prototype <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </DialogShell>
    );
  }

  return (
    <DialogShell title={`${project.title} · ${artifact.label}`} onClose={onClose} maxWidth="max-w-5xl">
      {loading && <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground"><RefreshCw className="w-5 h-5 animate-spin mx-auto mb-3" />Loading presentation…</div>}
      {error && (
        <div className="glass rounded-2xl p-7 text-center">
          <AlertCircle className="w-7 h-7 text-red-400 mx-auto mb-3" />
          <p className="text-sm font-semibold mb-1">Presentation unavailable</p>
          <p className="text-xs text-muted-foreground mb-5">You can retry or open the project case study instead.</p>
          <div className="flex justify-center gap-2"><button type="button" onClick={() => setAttempt((value) => value + 1)} className="btn-primary"><RefreshCw className="w-4 h-4" />Retry</button><button type="button" onClick={onClose} className="btn-secondary">Close</button></div>
        </div>
      )}
      {!loading && !error && signedUrl && (
        <>
          <div className="rounded-2xl overflow-hidden border border-[hsl(var(--border))] bg-black/20"><iframe src={signedUrl} title={`${project.title} presentation`} className="w-full h-[65vh] min-h-[420px]" /></div>
          <div className="flex flex-wrap justify-end gap-2 mt-4"><a href={signedUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">Open in new tab <ArrowUpRight className="w-4 h-4" /></a><a href={signedUrl} download className="btn-primary">Download PDF</a></div>
        </>
      )}
    </DialogShell>
  );
}

export function CaseStudyDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections = [
    { label: 'Problem', icon: AlertCircle, value: project.problem },
    { label: 'Approach', icon: Target, value: project.approach },
    { label: 'Outcome', icon: TrendingUp, value: project.outcome },
  ];

  return (
    <DialogShell title={project.title} onClose={onClose}>
      <div className="flex flex-wrap gap-2 mb-4"><span className="chip-accent">{project.domain}</span><span className="chip-muted">{project.projectType}</span><span className="chip-muted">{project.period}</span>{project.teamContext && <span className="chip-muted">{project.teamContext}</span>}</div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.summary}</p>
      <div className="rounded-2xl p-4 bg-[hsl(var(--primary)/0.08)] border border-[hsl(var(--primary)/0.2)] mb-6"><p className="text-[10px] font-semibold tracking-widest uppercase text-[hsl(var(--primary))] mb-1">Project outcome</p><p className="font-bold">{project.impact}</p></div>
      <div className="space-y-5">{sections.map(({ label, icon: Icon, value }) => <div key={label} className="flex items-start gap-3"><Icon className="w-4 h-4 text-[hsl(var(--primary))] mt-0.5 shrink-0" /><div><p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground mb-1">{label}</p><p className="text-sm leading-relaxed text-muted-foreground">{value}</p></div></div>)}</div>
      <div className="divider my-6" />
      <div className="grid md:grid-cols-2 gap-5"><div><div className="flex items-center gap-2 mb-3"><Wrench className="w-4 h-4 text-[hsl(var(--primary))]" /><p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Tools</p></div><div className="flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="chip-muted">{tool}</span>)}</div></div><div><div className="flex items-center gap-2 mb-3"><Lightbulb className="w-4 h-4 text-[hsl(var(--primary))]" /><p className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Insights</p></div><ul className="space-y-2">{project.insights.map((insight) => <li key={insight} className="flex items-start gap-2 text-sm text-muted-foreground"><ChevronRight className="w-4 h-4 text-[hsl(var(--primary))] shrink-0 mt-0.5" />{insight}</li>)}</ul></div></div>
      <Link href={`/projects/${project.slug}`} className="btn-secondary mt-6">Open shareable case study <ArrowUpRight className="w-4 h-4" /></Link>
    </DialogShell>
  );
}

export function ArtifactChooser({ project, onClose, onCaseStudy, onArtifact }: { project: Project; onClose: () => void; onCaseStudy: () => void; onArtifact: (artifact: ProjectArtifact) => void }) {
  const artifacts = project.artifacts ?? [];
  const availableCount = artifacts.filter((artifact) => artifact.available).length;

  return (
    <DialogShell title={project.title} onClose={onClose}>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">Choose how you want to explore this project.</p>
      <div className="grid gap-3">
        <button type="button" onClick={onCaseStudy} className="flex items-center gap-4 text-left glass rounded-2xl p-4 card-hover group">
          <span className="p-3 rounded-xl bg-[hsl(var(--primary)/0.1)]"><FileText className="w-5 h-5 text-[hsl(var(--primary))]" /></span>
          <span className="flex-1"><span className="block font-semibold text-sm">Quick case study</span><span className="block text-xs text-muted-foreground mt-1">Problem, approach, tools, and outcome</span></span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        <Link href={`/projects/${project.slug}`} onClick={onClose} className="flex items-center gap-4 text-left glass rounded-2xl p-4 card-hover group">
          <span className="p-3 rounded-xl bg-[hsl(var(--primary)/0.1)]"><CheckCircle2 className="w-5 h-5 text-[hsl(var(--primary))]" /></span>
          <span className="flex-1"><span className="block font-semibold text-sm">Full case study page</span><span className="block text-xs text-muted-foreground mt-1">Open a shareable project page with its artifacts</span></span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Link>
        {artifacts.map((artifact) => (
          <button key={artifact.label} type="button" disabled={!artifact.available} onClick={() => artifact.available && onArtifact(artifact)} className={`flex items-center gap-4 text-left glass rounded-2xl p-4 ${artifact.available ? 'card-hover group' : 'opacity-60 cursor-not-allowed'}`}>
            <span className="p-3 rounded-xl bg-[hsl(var(--accent)/0.1)]">{artifact.type === 'prototype' ? <ExternalLink className="w-5 h-5 text-[hsl(var(--accent))]" /> : <Presentation className="w-5 h-5 text-[hsl(var(--accent))]" />}</span>
            <span className="flex-1"><span className="block font-semibold text-sm">{artifact.label}</span><span className="block text-xs text-muted-foreground mt-1">{artifact.available ? 'Open the project artifact' : artifact.unavailableReason || 'Not available for public viewing'}</span></span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>
      {availableCount === 0 && <p className="text-xs text-muted-foreground mt-5 text-center">No public artifacts are currently available.</p>}
    </DialogShell>
  );
}
