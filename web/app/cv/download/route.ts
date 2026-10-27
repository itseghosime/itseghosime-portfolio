import { getHomePage } from "@/sanity/lib/home";

export const dynamic = "force-dynamic";

const fallbackPath = "/Abdulrahman-Itseghosime-Bello-CV.pdf";
const filename = "Abdulrahman-Itseghosime-Bello-CV.pdf";

export async function GET(request: Request) {
  const page = await getHomePage();
  const resumeUrl = page?.contact.resume?.url;

  if (!resumeUrl) {
    return Response.redirect(new URL(fallbackPath, request.url));
  }

  const resumeResponse = await fetch(resumeUrl, { cache: "no-store" });

  if (!resumeResponse.ok || !resumeResponse.body) {
    return Response.redirect(resumeUrl);
  }

  return new Response(resumeResponse.body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type":
        resumeResponse.headers.get("content-type") ?? "application/pdf",
    },
  });
}
