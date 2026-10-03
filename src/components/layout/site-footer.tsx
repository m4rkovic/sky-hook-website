import Link from "next/link";
import { SkyHookLogo } from "@/components/brand/sky-hook-logo";
import { siteConfig } from "@/content/site";
import { localizedHref, type Locale } from "@/i18n/config";

type NavLabels = Record<"live" | "music" | "band" | "media" | "news" | "contact", string>;

export function SiteFooter({ locale, labels, body }: { locale: Locale; labels: NavLabels; body: string }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-paper/35 bg-background">
      <div className="site-container py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <SkyHookLogo variant="full" className="h-auto w-64 max-w-full md:w-80" />
            <p className="mt-5 max-w-md text-sm leading-6 text-muted">{body}</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-4 md:max-w-xl md:justify-end" aria-label="Footer navigation">
            {siteConfig.navigation.filter((item) => item.showInNavigation).map((item) => (
              <Link key={item.href} href={localizedHref(locale, item.href)} className="kicker flex min-h-11 items-center text-muted hover:text-ice">
                {labels[item.key]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Sky Hook</span>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <Link href={localizedHref(locale, "/epk")} className="flex min-h-11 items-center hover:text-ice">
              EPK
            </Link>
            {Object.entries(siteConfig.socials)
              .filter(([, url]) => Boolean(url))
              .map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" className="flex min-h-11 items-center hover:text-ice">
                  {name}
                </a>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
