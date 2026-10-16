import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#f5f4ef",
    categories: ["portfolio", "business", "technology"],
    description:
      "The portfolio of Abdulrahman Itseghosime Bello, a software developer building accessible digital products.",
    display: "standalone",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    id: "/",
    lang: "en-NG",
    name: "ITSEGHOSIME — Abdulrahman Itseghosime Bello",
    orientation: "portrait-primary",
    scope: "/",
    short_name: "ITSEGHOSIME",
    start_url: "/",
    theme_color: "#f5f4ef",
  };
}
