import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const artifactPaths: Record<string, string> = {
  qsr: "qsr_presentation.pdf",
  gifting: "gifting_presentation.pdf",
  traceCarbon: "trace_presentation.pdf",
};

export async function GET(request: NextRequest) {
  const project = request.nextUrl.searchParams.get("project");
  const path = project ? artifactPaths[project] : undefined;

  if (!path) {
    return NextResponse.json({ error: "Unknown artifact." }, { status: 404 });
  }

  let data: { signedUrl: string } | null = null;
  let error: { message: string } | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const result = await supabaseAdmin.storage
      .from("portfolio-presentations")
      .createSignedUrl(path, 60 * 30);
    data = result.data;
    error = result.error;
    if (data?.signedUrl) break;
    if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 250));
  }

  if (error || !data?.signedUrl) {
    console.error("Artifact signing failed", { project, path, error: error?.message });
    return NextResponse.json(
      { error: "Could not create artifact URL. Please retry or use the case study." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json({
    url: data.signedUrl,
    expiresIn: 1800,
  }, { headers: { "Cache-Control": "no-store" } });
}
