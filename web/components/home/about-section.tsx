import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SITE_WHATSAPP_URL } from "@/lib/site";

export function AboutSection() {
  return (
    <section
      className="border-t border-black/8 py-16 md:py-24"
      id="about"
      aria-labelledby="about-title"
      data-reveal
    >
      <Container>
        <div className="grid max-w-4xl mx-auto gap-6">
          <p className="label-sm text-accent">Profile</p>
          <h2 className="headline-lg" id="about-title">
            I&apos;m Osi.
          </h2>
          <p className="text-xl leading-relaxed text-ink-soft md:text-2xl">
            I specialize in the space between design systems and frontend
            architecture, crafting software that feels natural, fast, and
            considered down to the sub-pixel.
          </p>
          <p className="max-w-2xl text-base leading-7 text-ink-soft">
            Available for frontend roles and project work in Abuja;
            remote-friendly.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link
              className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold no-underline"
              href="/about"
            >
              <span>More about me</span>
              <ArrowRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
                size={16}
                strokeWidth={1.8}
              />
            </Link>
            <a
              className="group inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-accent no-underline"
              href={SITE_WHATSAPP_URL}
              rel="noreferrer"
              target="_blank"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                size={16}
                strokeWidth={1.8}
              />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
