import type { Metadata } from "next";
import { Download, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo";
import {
  SITE_URL,
  SITE_WHATSAPP_URL,
} from "@/lib/site";
import { getHomePage } from "@/sanity/lib/home";
import { getStaticPageSeo } from "@/sanity/lib/seo";

const CV_PATH = "/Abdulrahman-Itseghosime-Bello-CV.pdf";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStaticPageSeo();

  return createPageMetadata({
    defaultImage: data.settings?.defaultSeo?.image,
    description:
      "Read or download the CV of Abdulrahman Itseghosime Bello, a software developer in Abuja specialising in frontend engineering.",
    noIndex: data.settings?.indexing !== "allow",
    path: "/cv",
    title: "CV of Abdulrahman Itseghosime Bello",
  });
}

export default async function CvPage() {
  const page = await getHomePage();

  if (!page) {
    notFound();
  }

  const navigation = page.navigation.map((item) =>
    item.href === "/#contact" ? { ...item, href: "/contact" } : item,
  );
  const cvUrl = page.contact.resume?.url ?? CV_PATH;
  const downloadLabel = page.contact.resume?.label ?? "Download CV";
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "CV of Abdulrahman Itseghosime Bello",
    description:
      "Professional experience, selected work, education and training for Abdulrahman Itseghosime Bello.",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    url: `${SITE_URL}/cv`,
  };

  return (
    <>
      <SiteHeader navigation={navigation} siteName={page.siteName} />
      <main className="cv-document" id="main-content">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />

        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="cv-actions mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-8">
            <div>
              <p className="label-sm text-accent">Curriculum vitae</p>
              <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
                Abdulrahman Itseghosime Bello
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex min-h-11 items-center gap-2 border border-black/15 bg-surface px-4 py-2 text-sm font-semibold no-underline hover:border-ink"
                href="/cv/download"
                download
              >
                <Download aria-hidden="true" size={16} />
                {downloadLabel} (PDF)
              </a>
              <a
                className="inline-flex min-h-11 items-center gap-2 bg-ink px-4 py-2 text-sm font-semibold text-white no-underline hover:bg-accent"
                href={SITE_WHATSAPP_URL}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <section aria-labelledby="cv-preview-title">
            <h2 className="sr-only" id="cv-preview-title">
              CV preview
            </h2>
            <iframe
              className="h-[72rem] w-full border border-black/10 bg-surface shadow-[var(--shadow-raised)]"
              src={`${cvUrl}#view=FitH`}
              title="Abdulrahman Itseghosime Bello CV preview"
            />
            <p className="mt-4 text-sm leading-6 text-ink-muted">
              If the preview does not load, use the download button above to
              open the same CV uploaded in Sanity.
            </p>
          </section>
        </Container>
      </main>
      <SiteFooter footerText={page.footerText} siteName={page.siteName} />
    </>
  );
}
