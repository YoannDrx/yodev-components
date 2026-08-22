const upstream = "https://react-components-nu-lake.vercel.app";
const allowed = /^[a-zA-Z0-9._/-]+$/;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const pathname = path.join("/");
  if (!allowed.test(pathname) || pathname.includes("..")) {
    return new Response("Not found", { status: 404 });
  }
  const response = await fetch(`${upstream}/assets/${pathname}`, {
    cache: "no-store",
  });
  if (!response.ok) return new Response("Not found", { status: 404 });
  return new Response(response.body, {
    headers: {
      "Content-Type":
        response.headers.get("content-type") ?? "application/octet-stream",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
