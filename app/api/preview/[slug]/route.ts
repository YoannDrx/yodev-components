import { NextResponse } from "next/server";
import { getCatalog, getComponent } from "@/lib/catalog";

const maxFileSize = 1_000_000;
const allowedPath = /^[a-zA-Z0-9_./@+ ()-]+\.(html|css|js)$/;

function rawUrl(repo: string, sha: string, file: string) {
  if (!allowedPath.test(file) || file.includes("..")) {
    throw new Error("Chemin amont refusé");
  }
  return `https://raw.githubusercontent.com/frontend-joe/${repo}/${sha}/${file
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

async function fetchText(url: string) {
  const response = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 86_400 },
  });
  if (!response.ok) throw new Error(`Source indisponible (${response.status})`);
  const length = Number(response.headers.get("content-length") || 0);
  if (length > maxFileSize) throw new Error("Fichier amont trop volumineux");
  const text = await response.text();
  if (text.length > maxFileSize)
    throw new Error("Fichier amont trop volumineux");
  return text;
}

function isRelative(value: string) {
  return !/^(?:[a-z]+:|\/\/|#|\/)/i.test(value);
}

function rewriteHtmlAssets(html: string, base: string) {
  return html.replace(
    /\b(src|href|poster)=(['"])([^'"]+)\2/gi,
    (match, attribute: string, quote: string, value: string) =>
      isRelative(value)
        ? `${attribute}=${quote}${new URL(value, base).toString()}${quote}`
        : match,
  );
}

function rewriteCssAssets(css: string, base: string) {
  return css.replace(
    /url\(\s*(['"]?)([^)'"\s]+)\1\s*\)/gi,
    (match, _quote: string, value: string) =>
      isRelative(value) ? `url("${new URL(value, base).toString()}")` : match,
  );
}

const previewCsp = [
  "default-src 'none'",
  "img-src 'self' https: data: blob:",
  "media-src 'self' https: data: blob:",
  "style-src 'self' 'unsafe-inline' https:",
  "font-src 'self' https: data:",
  "script-src 'self' 'unsafe-inline' https:",
  "connect-src 'self' https:",
  "frame-src 'none'",
  "form-action 'none'",
  "base-uri 'none'",
].join("; ");

const accessibilityPatch = `<script>(()=>{const patch=()=>document.querySelectorAll("img:not([alt])").forEach((image)=>image.setAttribute("alt",""));new MutationObserver(patch).observe(document.documentElement,{childList:true,subtree:true});document.addEventListener("DOMContentLoaded",patch);patch()})()</script>`;

function injectAccessibilityPatch(html: string) {
  return html.includes("</body>")
    ? html.replace("</body>", `${accessibilityPatch}</body>`)
    : `${html}${accessibilityPatch}`;
}

async function staticPreview(slug: string) {
  const component = getComponent(slug);
  if (!component || component.preview.type !== "static") return null;
  const preview = component.preview;
  const sha = getCatalog().repositoryShas[component.sourceRepository];
  if (preview.cssPaths.length + preview.scriptPaths.length > 16) {
    throw new Error("Trop de fichiers pour cet aperçu");
  }
  const [html, styles, scripts] = await Promise.all([
    fetchText(rawUrl(component.sourceRepository, sha, preview.htmlPath)),
    Promise.all(
      preview.cssPaths.map(async (file) => ({
        file,
        content: await fetchText(rawUrl(component.sourceRepository, sha, file)),
      })),
    ),
    Promise.all(
      preview.scriptPaths.map((file) =>
        fetchText(rawUrl(component.sourceRepository, sha, file)),
      ),
    ),
  ]);
  const clean = html
    .replace(/<meta[^>]+http-equiv=['"]refresh['"][^>]*>/gi, "")
    .replace(
      /<link[^>]+rel=['"]stylesheet['"][^>]+href=['"](?!https?:)[^'"]+['"][^>]*>/gi,
      "",
    )
    .replace(
      /<script[^>]+src=['"](?!https?:|\/\/)[^'"]+['"][^>]*><\/script>/gi,
      "",
    );
  const css = styles
    .map(({ file, content }) => {
      const directory = file.slice(0, file.lastIndexOf("/") + 1);
      return rewriteCssAssets(
        content,
        `https://raw.githubusercontent.com/frontend-joe/${component.sourceRepository}/${sha}/${directory}`,
      );
    })
    .join("\n");
  const head = `<meta name="referrer" content="no-referrer"><style>${css.replace(/<\/style/gi, "<\\/style")}</style>`;
  const body = `<script>${scripts.join("\n").replace(/<\/script/gi, "<\\/script")}</script>`;
  let assembled = rewriteHtmlAssets(clean, preview.assetBaseUrl);
  assembled = assembled.includes("</head>")
    ? assembled.replace("</head>", `${head}</head>`)
    : `${head}${assembled}`;
  assembled = assembled.includes("</body>")
    ? assembled.replace("</body>", `${body}</body>`)
    : `${assembled}${body}`;
  return assembled;
}

async function reactPreview(slug: string) {
  const component = getComponent(slug);
  if (!component || component.preview.type !== "react") return null;
  const response = await fetch(component.preview.deploymentUrl, {
    cache: "force-cache",
    next: { revalidate: 3_600 },
  });
  if (!response.ok)
    throw new Error(`Démo React indisponible (${response.status})`);
  const html = await response.text();
  const routeScript = `<script>history.replaceState(null,"",${JSON.stringify(component.preview.route)})</script>`;
  return html.includes("<head>")
    ? html.replace("<head>", `<head>${routeScript}`)
    : `${routeScript}${html}`;
}

function fallback(message: string) {
  return `<!doctype html><html lang="fr"><body style="font-family:system-ui;display:grid;place-items:center;min-height:100vh;margin:0;background:#f4f1ec;color:#5e594f;text-align:center"><main><strong>Aperçu indisponible</strong><p>${message.replace(/[<>&]/g, "")}</p></main></body></html>`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!getComponent(slug)) {
    return NextResponse.json({ error: "Preview not found" }, { status: 404 });
  }
  try {
    const previewHtml =
      (await staticPreview(slug)) ?? (await reactPreview(slug));
    const html = previewHtml && injectAccessibilityPatch(previewHtml);
    if (!html) throw new Error("Type d’aperçu inconnu");
    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "Content-Security-Policy": previewCsp,
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return new NextResponse(fallback(message), {
      status: 502,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
}
