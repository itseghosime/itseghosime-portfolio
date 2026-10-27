import { SITE_EMAIL, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const content = `# Abdulrahman Itseghosime Bello

> Software Developer in Abuja, Nigeria, specialising in frontend engineering, responsive web products, CMS integrations and production delivery.

## Identity

- Full name: Abdulrahman Itseghosime Bello
- Also known as: ITSEGHOSIME, Abdulrahman Bello, Itseghosime Bello, Osi
- Role: Software Developer
- Specialism: Frontend engineering
- Location: Abuja, Nigeria
- Portfolio: [itseghosime.com](${SITE_URL})
- Email: [${SITE_EMAIL}](mailto:${SITE_EMAIL})
- GitHub: [github.com/itseghosime](https://github.com/itseghosime)
- LinkedIn: [linkedin.com/in/itseghosime](https://www.linkedin.com/in/itseghosime)

## Work

Abdulrahman has delivered more than 20 paid websites for remote clients. His work includes responsive interface development, design implementation, CMS integration, multilingual websites, testing, performance optimisation, deployment, DNS configuration and client handover.

Core technologies include React, Next.js, TypeScript, JavaScript, Tailwind CSS, Node.js, Sanity, HubSpot CMS, WordPress, Git, GitHub Actions, Vitest, GSAP and Framer Motion.

## Selected projects

- [Creele Studios](${SITE_URL}/work/creele-studios): Complete responsive Next.js website built from a supplied design with fullPage.js, Swiper, GSAP, audio playback, Formspree, deployment and DNS configuration.
- [RawLab Ventures](${SITE_URL}/work/rawlab-ventures): Responsive HubSpot CMS implementation from Figma with reusable components and two Jotform lead flows.
- [Skinny Cans](${SITE_URL}/work/skinny-cans): Responsive Next.js website with multilingual routing, optimised media, deployment and DNS configuration.
- [EnvGuard](${SITE_URL}/lab/envguard): Open-source TypeScript CLI for checking environment configuration without exposing secret values, backed by 35 automated tests and GitHub Actions.
- [Lumina Web3](https://www.luminaweb3.io/): React website later migrated to WordPress so the client could manage content independently.

## Experience and education

- Freelance Frontend Developer, remote, February 2023 to present.
- Frontend Developer at Lendasat, remote and part-time, October 2024 to January 2025.
- Frontend Developer and Technical Facilitator at Genius Hub Global, November 2021 to January 2023; designed lesson plans and taught more than 100 trainees.
- Bachelor of Engineering in Industrial Engineering, University of Benin, completed August 2026.
- Best Web Graduating Student, EdoBits, 2021.
- OpenAI Academy AI Foundations credential, September 2026.

## Canonical pages

- [About](${SITE_URL}/about)
- [Work](${SITE_URL}/work)
- [CV](${SITE_URL}/cv)
- [Lab](${SITE_URL}/lab)
- [Notes](${SITE_URL}/notes)
- [Contact](${SITE_URL}/contact)
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
