import Link from "next/link";

import type { NavigationItem } from "@/types/home";

import { BrandMark } from "@/components/ui/brand-mark";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";

import { MobileNavigation } from "./mobile-navigation";

type SiteHeaderProps = {
  contactHref?: string;
  navigation: NavigationItem[];
  siteName: string;
};

export function SiteHeader({
  contactHref = "/contact",
  navigation,
  siteName,
}: SiteHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 h-20 border-b border-black/[0.06] bg-background/90 opacity-100 backdrop-blur-md transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[sandbox-active=true]:pointer-events-none data-[sandbox-active=true]:-translate-y-full data-[sandbox-active=true]:opacity-0 motion-reduce:transition-none"
      data-site-header
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link
          className="inline-flex min-h-11 items-center gap-3 text-base font-bold tracking-[-0.02em] no-underline"
          href="/"
          aria-label={`${siteName}, home`}
        >
          <BrandMark className="w-[1.125rem] shrink-0" />
          <span>{siteName}</span>
        </Link>

        <nav
          className="mx-auto hidden lg:block"
          aria-label="Primary navigation"
        >
          <ul className="m-0 flex list-none items-center gap-8 p-0">
            {navigation.map((item) => {
              const isExternal = item.href.startsWith("http");

              return (
                <li key={`${item.label}-${item.href}`}>
                  <a
                    className="inline-flex min-h-11 items-center text-sm font-medium text-ink-muted no-underline transition-colors duration-150 hover:text-ink"
                    href={item.href}
                    rel={isExternal ? "noreferrer" : undefined}
                    target={isExternal ? "_blank" : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            className="hidden min-h-11 items-center text-xs font-semibold tracking-[0.02em] text-ink-muted no-underline transition-colors hover:text-ink xl:inline-flex"
            href={SITE_PHONE_HREF}
          >
            {SITE_PHONE_DISPLAY}
          </a>
          <Link
            className="hidden min-h-11 items-center text-sm font-semibold no-underline transition-colors hover:text-accent lg:inline-flex"
            href="/cv"
          >
            CV
          </Link>
          <div className="hidden lg:block">
            <ButtonLink href={contactHref}>Get in touch</ButtonLink>
          </div>
          <MobileNavigation navigation={navigation} siteName={siteName} />
        </div>
      </Container>
    </header>
  );
}
