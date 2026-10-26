import type { Metadata } from "next";
import { Download, ExternalLink, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo";
import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  SITE_URL,
  SITE_WHATSAPP_URL,
} from "@/lib/site";
import { getHomePage } from "@/sanity/lib/home";
import { getStaticPageSeo } from "@/sanity/lib/seo";

const CV_PATH = "/Abdulrahman-Itseghosime-Bello-CV.pdf";

const experience = [
  {
    company: "Independent client work",
    period: "February 2023–Present · Remote",
    role: "Freelance Frontend Developer",
    points: [
      "Delivered more than 20 paid websites for remote clients, translating supplied designs into responsive, production-ready interfaces.",
      "Built with React, Next.js, TypeScript and Tailwind CSS; integrated Sanity, HubSpot, WordPress and multilingual content workflows.",
      "Handled testing, performance optimisation, deployment, DNS configuration and client handover.",
    ],
  },
  {
    company: "Lendasat",
    period: "October 2024–January 2025 · Remote · Part-time",
    role: "Frontend Developer",
    points: [
      "Resolved GitHub-assigned tickets across a React product and its user documentation.",
      "Contributed UI and UX decisions through pull requests, code review and dprint-based formatting.",
    ],
  },
  {
    company: "Genius Hub Global",
    period: "November 2021–January 2023 · Benin City",
    role: "Frontend Developer and Technical Facilitator",
    points: [
      "Designed lesson plans and taught HTML, CSS, JavaScript and React to more than 100 trainees in group and individual classes.",
      "Converted the organisation's website to WordPress so staff could manage content independently after handover.",
    ],
  },
];

const selectedWork = [
  {
    name: "Creele Studios",
    result:
      "Built and deployed the complete responsive Next.js website from a supplied design, including full-page navigation, motion, sliders, audio playback and a Formspree contact flow.",
    url: "https://creelestudios.com/",
  },
  {
    name: "RawLab Ventures",
    result:
      "Converted the complete Figma interface into responsive HubSpot CMS pages, reusable components and two Jotform lead flows.",
    url: "https://www.rawlab.ventures/",
  },
  {
    name: "Skinny Cans",
    result:
      "Built and launched the supplied interface with Next.js, multilingual routing, optimised media, deployment and DNS configuration.",
    url: "https://skinnycans.com/",
  },
  {
    name: "EnvGuard",
    result:
      "Created an open-source TypeScript CLI for validating environment configuration without exposing secret values, backed by 35 automated tests and GitHub Actions.",
    url: "https://github.com/itseghosime/envguard",
  },
];

const training = [
  "OpenAI Academy · AI Foundations · September 2026",
  "Tech4Youth · Artificial Intelligence Training · September–December 2026",
  "TS Academy · Full-Stack Software Development · June 2026–Expected February 2027",
  "EdoBits · Web Design, Development and Digital Skills · November 2020–September 2021",
];

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
                href={CV_PATH}
                download
              >
                <Download aria-hidden="true" size={16} />
                Download CV (PDF)
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

          <article className="mx-auto grid max-w-5xl gap-14 bg-surface p-6 shadow-[var(--shadow-raised)] sm:gap-16 sm:p-10 lg:p-16">
            <header className="grid gap-7 border-b border-black/10 pb-10">
              <div className="flex flex-wrap justify-between gap-5">
                <div>
                  <p className="text-2xl font-bold tracking-tight">
                    Abdulrahman Itseghosime Bello
                  </p>
                  <p className="mt-1 text-base font-semibold text-accent">
                    Software Developer · Frontend Engineering
                  </p>
                </div>
                <address className="grid gap-1 text-sm not-italic text-ink-muted sm:text-right">
                  <span>Abuja, Nigeria</span>
                  <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
                  <a href={SITE_PHONE_HREF}>{SITE_PHONE_DISPLAY}</a>
                </address>
              </div>
              <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="CV profiles">
                <a href={SITE_URL}>Portfolio</a>
                <a href="https://github.com/itseghosime">GitHub</a>
                <a href="https://www.linkedin.com/in/itseghosime">LinkedIn</a>
              </nav>
            </header>

            <section aria-labelledby="cv-profile">
              <h2 className="label-sm text-accent" id="cv-profile">
                Profile
              </h2>
              <p className="mt-5 max-w-4xl text-base leading-8 text-ink-soft">
                Software developer with a frontend engineering specialism and
                experience delivering responsive websites, CMS integrations and
                production deployments for remote clients. Builds accessible,
                maintainable interfaces with React, Next.js and TypeScript, using
                AI-assisted workflows to accelerate implementation while personally
                reviewing, testing and validating the resulting code.
              </p>
            </section>

            <section aria-labelledby="cv-skills">
              <h2 className="label-sm text-accent" id="cv-skills">
                Core skills
              </h2>
              <p className="mt-5 text-base leading-8 text-ink-soft">
                React · Next.js · TypeScript · JavaScript · HTML · CSS · Tailwind
                CSS · Node.js · Sanity · HubSpot CMS · WordPress · Git · GitHub
                Actions · Vitest · GSAP · Framer Motion · Jotform · Formspree
              </p>
            </section>

            <section aria-labelledby="cv-experience">
              <h2 className="label-sm text-accent" id="cv-experience">
                Experience
              </h2>
              <div className="mt-8 grid gap-11">
                {experience.map((entry) => (
                  <section className="grid gap-5" key={entry.company}>
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                      <div>
                        <h3 className="text-lg font-semibold">{entry.role}</h3>
                        <p className="text-sm font-semibold text-accent">
                          {entry.company}
                        </p>
                      </div>
                      <p className="text-sm text-ink-muted">{entry.period}</p>
                    </div>
                    <ul className="m-0 grid gap-3 pl-5 text-sm leading-7 text-ink-soft marker:text-accent">
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section className="cv-page-break" aria-labelledby="cv-work">
              <h2 className="label-sm text-accent" id="cv-work">
                Selected work
              </h2>
              <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {selectedWork.map((project) => (
                  <section className="border-t border-black/10 pt-6" key={project.name}>
                    <h3 className="text-base font-semibold">{project.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">
                      {project.result}
                    </p>
                    <a
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent no-underline"
                      href={project.url}
                    >
                      View project
                      <ExternalLink aria-hidden="true" size={13} />
                    </a>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="cv-education">
              <h2 className="label-sm text-accent" id="cv-education">
                Education
              </h2>
              <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-base font-semibold">
                    Bachelor of Engineering in Industrial Engineering
                  </h3>
                  <p className="text-sm text-ink-muted">University of Benin</p>
                </div>
                <p className="text-sm text-ink-muted">January 2023–August 2026</p>
              </div>
            </section>

            <section aria-labelledby="cv-training">
              <h2 className="label-sm text-accent" id="cv-training">
                Training and credentials
              </h2>
              <ul className="mt-6 grid gap-3 pl-5 text-sm leading-7 text-ink-soft marker:text-accent">
                {training.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-semibold leading-7 text-ink">
                Recognition: Best Web Graduating Student, EdoBits, 2021.
              </p>
            </section>
          </article>
        </Container>
      </main>
      <SiteFooter footerText={page.footerText} siteName={page.siteName} />
    </>
  );
}
