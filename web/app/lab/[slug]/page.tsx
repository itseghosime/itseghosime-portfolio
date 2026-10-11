import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { LabExperimentDetail } from "@/components/lab/lab-experiment-detail";
import { createPageMetadata } from "@/lib/seo";
import { getHomePage } from "@/sanity/lib/home";
import { getLabExperiment, getLabExperimentSlugs } from "@/sanity/lib/lab";
import { getStaticPageSeo } from "@/sanity/lib/seo";
import type { ImageAsset } from "@/types/home";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getLabExperimentSlugs();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [data, siteSeo] = await Promise.all([
    getLabExperiment(slug),
    getStaticPageSeo(),
  ]);
  if (!data) notFound();
  return createPageMetadata({
    title: (
      data.content.seo?.title || `${data.experiment.title} — Lab`
    ).replace(/\s*\|\s*ITSEGHOSIME$/i, ""),
    description: data.content.seo?.description || data.experiment.summary,
    path: `/lab/${slug}`,
    image: data.content.seo?.image?.url
      ? (data.content.seo.image as ImageAsset)
      : data.experiment.coverImage,
    defaultImage: siteSeo.settings?.defaultSeo?.image,
    noIndex:
      siteSeo.settings?.indexing !== "allow" ||
      data.content.seo?.noIndex === true,
  });
}

export default async function LabExperimentPage({ params }: Props) {
  const { slug } = await params;
  const [home, data] = await Promise.all([
    getHomePage(),
    getLabExperiment(slug),
  ]);
  if (!home || !data) notFound();
  return (
    <>
      <SiteHeader navigation={home.navigation} siteName={home.siteName} />
      <main id="main-content" className="py-10 sm:py-14 md:py-16">
        <Container>
          <LabExperimentDetail {...data} />
        </Container>
      </main>
      <SiteFooter footerText={home.footerText} siteName={home.siteName} />
    </>
  );
}
