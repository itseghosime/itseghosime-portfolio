import type { Metadata } from "next";

import type { ImageAsset } from "@/types/home";

import { absoluteUrl, SITE_NAME } from "./site";

type SocialImageLike = {
  alt?: string | null;
  height?: number | null;
  url?: string | null;
  width?: number | null;
};

type ShareReadyImage = SocialImageLike & {
  height: number;
  url: string;
  width: number;
};

type PageMetadataInput = {
  defaultImage?: SocialImageLike | null;
  description: string;
  image?: SocialImageLike | null;
  noIndex?: boolean;
  path: `/${string}` | "/";
  title: string;
};

export const OPEN_GRAPH_LOCALE = "en_NG";
export const TWITTER_HANDLE = "@itseghosime";

export const DEFAULT_SOCIAL_IMAGE: ImageAsset = {
  alt: "ITSEGHOSIME — Abdulrahman Itseghosime Bello, Software Developer",
  height: 630,
  url: absoluteUrl("/opengraph-image"),
  width: 1200,
};

export function formatPageTitle(title: string): string {
  let baseTitle = title.trim();
  const siteSuffix = /\s*(?:\||—|-)\s*ITSEGHOSIME\s*$/i;

  while (siteSuffix.test(baseTitle)) {
    baseTitle = baseTitle.replace(siteSuffix, "").trim();
  }

  return baseTitle.toUpperCase() === SITE_NAME
    ? SITE_NAME
    : `${baseTitle} — ${SITE_NAME}`;
}

export function resolveSocialImage(
  image?: SocialImageLike | null,
  defaultImage?: SocialImageLike | null,
): ImageAsset {
  const isShareReady = (
    candidate?: SocialImageLike | null,
  ): candidate is ShareReadyImage =>
    Boolean(
      candidate?.url &&
      candidate.width &&
      candidate.height &&
      candidate.width >= 1200 &&
      candidate.height >= 630,
    );

  if (isShareReady(image)) {
    return {
      alt: image.alt || DEFAULT_SOCIAL_IMAGE.alt,
      height: image.height,
      url: image.url,
      width: image.width,
    };
  }
  if (isShareReady(defaultImage)) {
    return {
      alt: defaultImage.alt || DEFAULT_SOCIAL_IMAGE.alt,
      height: defaultImage.height,
      url: defaultImage.url,
      width: defaultImage.width,
    };
  }
  return DEFAULT_SOCIAL_IMAGE;
}

export function createPageMetadata({
  defaultImage,
  description,
  image,
  noIndex = false,
  path,
  title,
}: PageMetadataInput): Metadata {
  const socialImage = resolveSocialImage(image, defaultImage);
  const shouldIndex = !noIndex;
  const pageTitle = formatPageTitle(title);

  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: pageTitle,
      description,
      locale: OPEN_GRAPH_LOCALE,
      images: [
        {
          alt: socialImage.alt,
          height: socialImage.height,
          url: socialImage.url,
          width: socialImage.width,
        },
      ],
      siteName: SITE_NAME,
      url: path,
    },
    robots: {
      follow: shouldIndex,
      index: shouldIndex,
      googleBot: {
        follow: shouldIndex,
        index: shouldIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      creator: TWITTER_HANDLE,
      title: pageTitle,
      description,
      images: [{ alt: socialImage.alt, url: socialImage.url }],
      site: TWITTER_HANDLE,
    },
  };
}
