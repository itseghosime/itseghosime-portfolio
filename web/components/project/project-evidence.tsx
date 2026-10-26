import type { ProjectPageData } from "@/types/project";

import { Container } from "@/components/ui/container";

type Evidence = {
  detail: string;
  label: string;
  value: string;
};

const evidenceBySlug: Record<string, Evidence> = {
  "creele-studios": {
    value: "3 device classes",
    label: "Responsive delivery",
    detail:
      "The supplied design was adapted for mobile, tablet and desktop without separate responsive specifications.",
  },
  "rawlab-ventures": {
    value: "2 forms",
    label: "Lead capture",
    detail:
      "Contact and lead-generation flows were connected to the published HubSpot experience through Jotform.",
  },
  "skinny-cans": {
    value: "30 pages",
    label: "Revised build",
    detail:
      "Static output spans three locale structures and two product pages, supported by 34 passing automated tests.",
  },
};

export function ProjectEvidence({ project }: { project: ProjectPageData }) {
  const slug = project.slug ?? "";
  const evidence = evidenceBySlug[slug];

  if (!evidence) {
    return null;
  }

  return (
    <section
      aria-label={`Verified result for ${project.title}`}
      className="border-b border-black/[0.08] bg-surface"
    >
      <Container className="grid gap-5 py-8 sm:grid-cols-[minmax(10rem,0.45fr)_minmax(0,1fr)] sm:items-center sm:py-10">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.09em] text-accent">
            Verified project proof
          </p>
          <p className="mt-2 font-serif text-3xl leading-none tracking-[-0.02em] sm:text-4xl">
            {evidence.value}
          </p>
        </div>
        <div className="border-black/[0.08] sm:border-l sm:pl-8">
          <h2 className="text-base font-semibold">{evidence.label}</h2>
          <p className="mt-2 max-w-3xl text-base leading-7 text-ink-soft">
            {evidence.detail}
          </p>
        </div>
      </Container>
    </section>
  );
}
