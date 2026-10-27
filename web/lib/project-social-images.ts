import type { ImageAsset } from "@/types/home";

import { absoluteUrl } from "./site";

const PROJECT_SOCIAL_IMAGES: Record<string, ImageAsset> = {
  "creele-studios": {
    alt: "Creele Studios frontend case study by ITSEGHOSIME",
    height: 630,
    url: absoluteUrl("/og/creele-studios.png"),
    width: 1200,
  },
  "rawlab-ventures": {
    alt: "RawLab Ventures HubSpot CMS case study by ITSEGHOSIME",
    height: 630,
    url: absoluteUrl("/og/rawlab-ventures.png"),
    width: 1200,
  },
  "skinny-cans": {
    alt: "Skinny Cans multilingual Next.js case study by ITSEGHOSIME",
    height: 630,
    url: absoluteUrl("/og/skinny-cans.png"),
    width: 1200,
  },
};

export function getProjectSocialImage(slug: string): ImageAsset | undefined {
  return PROJECT_SOCIAL_IMAGES[slug];
}
