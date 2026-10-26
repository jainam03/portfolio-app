const artifactPaths: Record<string, string> = {
  qsr: "qsr_presentation.pdf",
  gifting: "gifting_presentation.pdf",
  traceCarbon: "trace_presentation.pdf",
  digiyatra: "digiyatra_presentation.pdf",
};

export function getArtifactPath(project: string | null) {
  return project ? artifactPaths[project] : undefined;
}
