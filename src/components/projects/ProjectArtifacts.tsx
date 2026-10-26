import type { ProjectArtifact } from "@/data/content";
import { ArrowUpRight, AlertCircle, ExternalLink, Presentation } from "lucide-react";

export function ProjectArtifacts({ artifacts }: { artifacts: ProjectArtifact[] }) {
  if (artifacts.length === 0) return null;

  return (
    <section aria-labelledby="project-artifacts-heading" className="space-y-5">
      <div>
        <p className="section-tag"><span className="glow-dot" />Project materials</p>
        <h2 id="project-artifacts-heading" className="section-heading text-2xl">Artifacts</h2>
      </div>

      <div className="space-y-4">
        {artifacts.map((artifact) => {
          if (!artifact.available) {
            return (
              <div key={artifact.label} className="glass rounded-2xl p-5" aria-label={`${artifact.label}, unavailable`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm">{artifact.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {artifact.unavailableReason || "This item is not available for public viewing."}
                    </p>
                  </div>
                </div>
              </div>
            );
          }

          if (artifact.mode === "storage-pdf") {
            const pdfUrl = `/api/artifacts?project=${encodeURIComponent(artifact.storageKey)}&view=pdf`;
            return (
              <div key={artifact.label} className="glass rounded-2xl p-4 md:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <h3 className="flex items-center gap-2 font-semibold text-sm">
                    <Presentation className="w-4 h-4 text-[hsl(var(--primary))]" />
                    {artifact.label}
                  </h3>
                  <a className="btn-secondary text-xs" href={pdfUrl} target="_blank" rel="noopener noreferrer">
                    Open in new tab <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <iframe
                  src={pdfUrl}
                  title={`${artifact.label} PDF`}
                  className="w-full h-[70vh] min-h-[420px] rounded-xl border border-[hsl(var(--border))] bg-black/20"
                  loading="lazy"
                />
              </div>
            );
          }

          return (
            <a
              key={artifact.label}
              className="glass rounded-2xl p-5 flex items-center justify-between gap-4 card-hover"
              href={artifact.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-[hsl(var(--primary))]" />
                <span className="font-semibold text-sm">{artifact.label}</span>
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
