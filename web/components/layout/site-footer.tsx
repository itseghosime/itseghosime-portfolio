import { Container } from "@/components/ui/container";
import {
  SITE_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
  SITE_WHATSAPP_URL,
} from "@/lib/site";

type SiteFooterProps = {
  footerText?: string;
  siteName: string;
};

export function SiteFooter({ footerText, siteName }: SiteFooterProps) {
  return (
    <footer className="text-ink-muted" data-site-footer>
      <Container className="grid gap-5 border-t border-black/8 py-12 text-xs md:grid-cols-[auto_1fr_auto] md:items-center">
        <p>
          © {new Date().getFullYear()} {siteName}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 md:justify-center">
          <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>
          <a href={SITE_PHONE_HREF}>{SITE_PHONE_DISPLAY}</a>
          <a href={SITE_WHATSAPP_URL} rel="noreferrer" target="_blank">
            WhatsApp
          </a>
          <a href="/cv">CV</a>
          <a href="/privacy">Privacy</a>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.06em] md:text-right">
          {footerText ?? "Built with intent · Accessible by default"}
        </p>
      </Container>
    </footer>
  );
}
