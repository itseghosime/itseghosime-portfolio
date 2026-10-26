import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo";
import { SITE_EMAIL } from "@/lib/site";
import { getHomePage } from "@/sanity/lib/home";
import { getStaticPageSeo } from "@/sanity/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getStaticPageSeo();

  return createPageMetadata({
    defaultImage: data.settings?.defaultSeo?.image,
    description:
      "Privacy information for contact enquiries submitted through the ITSEGHOSIME portfolio website.",
    noIndex: data.settings?.indexing !== "allow",
    path: "/privacy",
    title: "Privacy",
  });
}

export default async function PrivacyPage() {
  const page = await getHomePage();

  if (!page) {
    notFound();
  }

  return (
    <>
      <SiteHeader navigation={page.navigation} siteName={page.siteName} />
      <main id="main-content">
        <Container className="py-16 sm:py-20 lg:py-28">
          <article className="mx-auto grid max-w-3xl gap-10">
            <header className="grid gap-4 border-b border-black/[0.08] pb-8">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.09em] text-accent">
                Privacy
              </p>
              <h1 className="font-serif text-[clamp(2.75rem,7vw,5rem)] leading-none tracking-[-0.035em]">
                Your enquiry stays yours.
              </h1>
              <p className="text-base leading-7 text-ink-soft">
                This page explains what happens when you contact me through this
                website. Last updated 26 October 2026.
              </p>
            </header>

            <div className="grid gap-9 text-base leading-7 text-ink-soft">
              <section className="grid gap-3">
                <h2 className="font-serif text-3xl text-ink">Information collected</h2>
                <p>
                  The contact form asks for your name, email address, enquiry
                  category and message. You may also provide a company name.
                </p>
              </section>
              <section className="grid gap-3">
                <h2 className="font-serif text-3xl text-ink">How it is used</h2>
                <p>
                  Your information is used only to deliver the enquiry, send a
                  confirmation and respond to your message. It is not sold or
                  used for unrelated marketing.
                </p>
              </section>
              <section className="grid gap-3">
                <h2 className="font-serif text-3xl text-ink">Service provider</h2>
                <p>
                  Form emails are delivered through Resend, which processes the
                  submission as an email delivery provider. External links on
                  this site are governed by their own privacy practices.
                </p>
              </section>
              <section className="grid gap-3">
                <h2 className="font-serif text-3xl text-ink">Retention and contact</h2>
                <p>
                  Correspondence is kept only as long as reasonably necessary to
                  respond and maintain the resulting professional conversation.
                  To ask about or request deletion of an enquiry, email{" "}
                  <a className="font-semibold text-ink" href={`mailto:${SITE_EMAIL}`}>
                    {SITE_EMAIL}
                  </a>
                  .
                </p>
              </section>
            </div>
          </article>
        </Container>
      </main>
      <SiteFooter footerText={page.footerText} siteName={page.siteName} />
    </>
  );
}
