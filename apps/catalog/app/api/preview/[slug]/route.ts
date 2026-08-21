import { NextResponse } from "next/server";
import { getItemBySlug } from "@/lib/catalog";

const maxFileSize = 750_000;
const allowedPath = /^[a-zA-Z0-9_./@+ -]+\.(html|css|js)$/;

function rawUrl(repo: string, sha: string, path: string) {
  if (!allowedPath.test(path) || path.includes(".."))
    throw new Error("Unsafe upstream path");
  return `https://raw.githubusercontent.com/frontend-joe/${repo}/${sha}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 86_400 },
  });
  if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
  const length = Number(response.headers.get("content-length") || 0);
  if (length > maxFileSize) throw new Error("Upstream file is too large");
  const text = await response.text();
  if (text.length > maxFileSize) throw new Error("Upstream file is too large");
  return text;
}

function rewriteRelativeAssets(html: string, base: string) {
  return html.replace(
    /\b(src|href)=(['"])(?!https?:|data:|#|\/)([^'"]+)\2/gi,
    (_match, attribute: string, quote: string, value: string) =>
      `${attribute}=${quote}${new URL(value, base).toString()}${quote}`,
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (
    !item ||
    item.preview.type !== "static-srcdoc" ||
    !item.repositoryId.startsWith("github:frontend-joe/")
  ) {
    return NextResponse.json({ error: "Preview not found" }, { status: 404 });
  }
  try {
    const repo = item.repositoryId.replace("github:frontend-joe/", "");
    const preview = item.preview;
    if (preview.cssPaths.length + preview.scriptPaths.length > 12)
      throw new Error("Too many preview files");
    const [html, styles, scripts] = await Promise.all([
      fetchText(rawUrl(repo, item.sourceSha, preview.htmlPath)),
      Promise.all(
        preview.cssPaths.map((path) =>
          fetchText(rawUrl(repo, item.sourceSha, path)),
        ),
      ),
      Promise.all(
        preview.scriptPaths.map((path) =>
          fetchText(rawUrl(repo, item.sourceSha, path)),
        ),
      ),
    ]);
    const csp =
      "default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src https: data:; script-src 'unsafe-inline' https://cdn.tailwindcss.com; connect-src 'none'; frame-src 'none'; form-action 'none'; base-uri 'none'";
    const cleanHtml = html
      .replace(/<meta[^>]+http-equiv=['"]refresh['"][^>]*>/gi, "")
      .replace(
        /<link[^>]+rel=['"]stylesheet['"][^>]+href=['"](?!https?:)[^'"]+['"][^>]*>/gi,
        "",
      )
      .replace(
        /<script[^>]+src=['"](?!https?:)[^'"]+['"][^>]*><\/script>/gi,
        "",
      );
    const head = `<meta http-equiv="Content-Security-Policy" content="${csp}"><meta name="referrer" content="no-referrer"><style>${styles.join("\n")}</style>`;
    const body = `<script>${scripts.join("\n").replace(/<\/script/gi, "<\\/script")}</script>`;
    let assembled = rewriteRelativeAssets(cleanHtml, preview.assetBaseUrl);
    assembled = assembled.includes("</head>")
      ? assembled.replace("</head>", `${head}</head>`)
      : `${head}${assembled}`;
    assembled = assembled.includes("</body>")
      ? assembled.replace("</body>", `${body}</body>`)
      : `${assembled}${body}`;
    return new NextResponse(assembled, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Content-Security-Policy": "sandbox allow-scripts",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown preview error";
    return new NextResponse(
      `<!doctype html><html lang="fr"><body style="font-family:system-ui;display:grid;place-items:center;height:100vh;margin:0;background:#f4f3f8;color:#655f70;text-align:center"><main><strong>Aperçu indisponible</strong><p>${message.replace(/[<>&]/g, "")}</p></main></body></html>`,
      { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }
}
