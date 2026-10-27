import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { NoteBody } from "@/components/notes/note-body";
import { NoteImage } from "@/components/notes/note-image";
import type { NoteBodyBlock } from "@/types/notes";
import type { getLabExperiment } from "@/sanity/lib/lab";
import { LabPresentation } from "./lab-presentation";

type Props = NonNullable<Awaited<ReturnType<typeof getLabExperiment>>>;

export function LabExperimentDetail({ experiment, content }: Props) {
  const body = (content.body ?? []) as unknown as NoteBodyBlock[];
  const facts = [
    ["Category", experiment.categoryLabel],
    ["Status", experiment.status],
    ["Version", experiment.version],
    ["Year", experiment.year],
  ].filter(([, value]) => Boolean(value));
  const headings = body.flatMap((block) => {
    if (
      block._type !== "block" ||
      (block.style !== "h2" && block.style !== "h3")
    )
      return [];
    return [
      {
        id: `log-${block._key}`,
        level: block.style === "h2" ? (2 as const) : (3 as const),
        title: block.children?.map((child) => child.text).join("") ?? "",
      },
    ];
  });
  const findings =
    content.findings?.filter(
      (finding) => finding.title && finding.description,
    ) ?? [];
  const actionClass =
    "inline-flex min-h-11 items-center gap-2 border border-black/15 bg-surface px-4 font-mono text-xs font-semibold text-ink no-underline hover:border-ink hover:bg-ink hover:text-white";

  return (
    <article className="mx-auto max-w-[70rem]">
      <header className="border-b border-black/[0.08] pb-10 sm:pb-14">
        <Link
          className="inline-flex min-h-11 items-center gap-2 font-mono text-xs text-ink-muted no-underline hover:text-ink"
          href="/lab"
        >
          <ArrowLeft aria-hidden="true" size={14} /> Back to the lab
        </Link>
        <p className="mt-8 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent-text">
          {experiment.number} {"//"} {experiment.categoryLabel}
        </p>
        <h1 className="mt-5 max-w-[56rem] break-words font-serif text-[clamp(3rem,6.5vw,5.25rem)] leading-[0.98] tracking-[-0.05em] text-ink">
          {experiment.title}
        </h1>
        <p className="mt-6 max-w-[44rem] text-lg leading-8 text-ink-soft sm:text-xl sm:leading-9">
          {experiment.summary}
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-black/[0.08] pt-6 sm:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                {label}
              </dt>
              <dd className="mt-2 text-sm text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        {(experiment.demoUrl || experiment.sourceUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {experiment.demoUrl && (
              <a
                className={actionClass}
                href={experiment.demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                Live demonstration <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            )}
            {experiment.sourceUrl && (
              <a
                className={actionClass}
                href={experiment.sourceUrl}
                target="_blank"
                rel="noreferrer"
              >
                View source <ArrowUpRight aria-hidden="true" size={14} />
              </a>
            )}
          </div>
        )}
      </header>

      <div className="grid gap-10 py-10 sm:gap-14 sm:py-14 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
        <div className="min-w-0 space-y-12">
          {content.question && (
            <section
              aria-labelledby="experiment-question"
              className="border-l-2 border-accent bg-surface p-6 sm:p-8"
            >
              <h2
                id="experiment-question"
                className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent-text"
              >
                The question
              </h2>
              <p className="mt-4 text-2xl leading-relaxed tracking-[-0.02em] text-ink">
                {content.question}
              </p>
            </section>
          )}
          {experiment.presentation !== "none" ? (
            <section
              aria-label="Interactive experiment"
              className="border border-black/[0.08] bg-surface p-4 sm:p-6"
            >
              <LabPresentation experiment={experiment} />
            </section>
          ) : experiment.coverImage ? (
            <NoteImage image={experiment.coverImage} />
          ) : null}
          {body.length > 0 && (
            <section aria-labelledby="experiment-log">
              <h2
                id="experiment-log"
                className="mb-8 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent-text"
              >
                Experiment log
              </h2>
              <NoteBody body={body} headings={headings} />
            </section>
          )}
          {findings.length > 0 && (
            <section
              aria-labelledby="experiment-findings"
              className="border-t border-black/[0.08] pt-10"
            >
              <h2
                id="experiment-findings"
                className="font-serif text-3xl tracking-[-0.03em] text-ink sm:text-4xl"
              >
                Findings &amp; lessons
              </h2>
              <ol className="mt-8 divide-y divide-black/[0.08]">
                {findings.map((finding, index) => (
                  <li
                    className="grid grid-cols-[2rem_1fr] gap-4 py-6 first:pt-0"
                    key={finding._key}
                  >
                    <span className="pt-1 font-mono text-xs text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">
                        {finding.title}
                      </h3>
                      <p className="mt-3 leading-7 text-ink-soft">
                        {finding.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>
        <aside
          className="border-t border-black/[0.08] pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          aria-label="Experiment details"
        >
          <div
            className="space-y-8 lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto"
            data-lab-sidebar
          >
            <div>
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                Architecture &amp; stack
              </h2>
              <p className="mt-4 font-mono text-sm leading-7 text-ink">
                {experiment.stack}
              </p>
            </div>
            {headings.length > 0 && (
              <nav aria-label="Experiment contents">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  In this log
                </h2>
                <ul className="mt-3 space-y-1">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        className="inline-flex min-h-11 items-center text-sm text-ink-soft no-underline hover:text-accent-text"
                        href={`#${heading.id}`}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {content.relatedProject?.slug && (
              <div>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Related project
                </h2>
                <Link
                  className="mt-3 inline-flex min-h-11 items-center text-sm text-ink no-underline hover:text-accent-text"
                  href={`/work/${content.relatedProject.slug}`}
                >
                  {content.relatedProject.title} →
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
      <footer className="flex flex-wrap justify-between gap-4 border-t border-black/[0.08] py-8 font-mono text-xs">
        <Link
          className="inline-flex min-h-11 items-center gap-2 no-underline hover:text-accent-text"
          href="/lab"
        >
          <ArrowLeft aria-hidden="true" size={14} /> All experiments
        </Link>
        <Link
          className="inline-flex min-h-11 items-center no-underline hover:text-accent-text"
          href="/contact"
        >
          Discuss an idea ↗
        </Link>
      </footer>
    </article>
  );
}
