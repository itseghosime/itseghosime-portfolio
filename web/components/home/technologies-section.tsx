import type { TechnologySummary } from "@/types/home";

import { Container } from "@/components/ui/container";

type TechnologiesSectionProps = {
  technologies: TechnologySummary[];
};

export function TechnologiesSection({
  technologies,
}: TechnologiesSectionProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-black/8 py-16 md:py-20"
      aria-labelledby="technologies-title"
      data-reveal
    >
      <Container>
        <div className="grid gap-6">
          <h2 className="label-sm text-ink-muted" id="technologies-title">
            Core stack
          </h2>
          <p className="max-w-4xl text-2xl leading-relaxed tracking-tight text-ink md:text-4xl">
            I ship responsive Next.js and TypeScript products, including
            multilingual sites with Sanity and Tailwind CSS.
          </p>
        </div>
      </Container>
    </section>
  );
}
