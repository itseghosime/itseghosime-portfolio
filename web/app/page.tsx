import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AboutSection } from "@/components/home/about-section";
import { CapabilitiesSection } from "@/components/home/capabilities-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
import { HomeMotion } from "@/components/home/home-motion";
import { LabSection } from "@/components/home/lab-section";
import { TechnologiesSection } from "@/components/home/technologies-section";
import { WorkSection } from "@/components/home/work-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getHomePage } from "@/sanity/lib/home";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_METADATA_QUERY } from "@/sanity/lib/queries";
import {
  DEFAULT_SOCIAL_IMAGE,
  OPEN_GRAPH_LOCALE,
  TWITTER_HANDLE,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import {
  createPersonStructuredData,
  PROFESSIONAL_IDENTITY,
} from "@/lib/professional-identity";

function safeUrl(value: string | null | undefined): URL | undefined {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: HOME_METADATA_QUERY,
    perspective: "published",
    stega: false,
  });

  const { settings } = data;
  const title = `${PROFESSIONAL_IDENTITY.fullName} (Osi) — ${PROFESSIONAL_IDENTITY.role}, Abuja`;
  const description = PROFESSIONAL_IDENTITY.description;
  const metadataBase = safeUrl(settings?.canonicalUrl) ?? new URL(SITE_URL);
  const shouldIndex =
    settings?.indexing === "allow" && settings.defaultSeo?.noIndex !== true;
  const socialImage = DEFAULT_SOCIAL_IMAGE;

  return {
    metadataBase,
    title: title ? { absolute: title } : undefined,
    description: description ?? undefined,
    alternates: metadataBase ? { canonical: "/" } : undefined,
    openGraph: {
      type: "website",
      title: title ?? undefined,
      description: description ?? undefined,
      locale: OPEN_GRAPH_LOCALE,
      siteName: settings?.siteName ?? undefined,
      url: metadataBase,
      images: [
        {
          alt: socialImage.alt,
          height: socialImage.height,
          url: socialImage.url,
          width: socialImage.width,
        },
      ],
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      creator: TWITTER_HANDLE,
      title: title ?? undefined,
      description: description ?? undefined,
      images: [{ alt: socialImage.alt, url: socialImage.url }],
      site: TWITTER_HANDLE,
    },
    verification: settings?.googleSiteVerification
      ? { google: settings.googleSiteVerification }
      : undefined,
  };
}

export default async function Home() {
  const page = await getHomePage();

  if (!page) {
    notFound();
  }

  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const profilePageId = `${SITE_URL}/#profile-page`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...createPersonStructuredData({
          image: page.hero.portrait?.url,
          knowsAbout: page.technologies.map((technology) => technology.name),
          sameAs: page.contact.socialLinks.map((link) => link.url),
        }),
      },
      {
        "@id": websiteId,
        "@type": "WebSite",
        name: page.siteName,
        alternateName: [
          "ITSEGHOSIME Portfolio",
          PROFESSIONAL_IDENTITY.fullName,
          "Osi",
        ],
        description: PROFESSIONAL_IDENTITY.description,
        inLanguage: "en",
        about: {
          "@id": personId,
        },
        publisher: {
          "@id": personId,
        },
        url: SITE_URL,
      },
      {
        "@id": profilePageId,
        "@type": "ProfilePage",
        name: `${PROFESSIONAL_IDENTITY.fullName} (Osi) — ${PROFESSIONAL_IDENTITY.role}, Abuja`,
        description: PROFESSIONAL_IDENTITY.description,
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": personId,
        },
        about: {
          "@id": personId,
        },
        url: SITE_URL,
      },
    ],
  };

  return (
    <>
      <SiteHeader navigation={page.navigation} siteName={page.siteName} />
      <main id="main-content">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
        <HeroSection
          project={
            page.projects.find((project) => project.slug === "creele-studios") ??
            page.projects[0]
          }
        />
        <WorkSection projects={page.projects} />
        <CapabilitiesSection capabilities={page.capabilities} />
        <TechnologiesSection technologies={page.technologies} />
        <LabSection experiments={page.labExperiments} />
        <AboutSection />
        <ContactSection contact={page.contact} />
      </main>
      <SiteFooter footerText={page.footerText} siteName={page.siteName} />
      <HomeMotion />
    </>
  );
}
