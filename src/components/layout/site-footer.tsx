import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { localizedHref, type Locale } from "@/i18n/config";

type NavLabels = Record<"live" | "music" | "band" | "media" | "news" | "contact", string>;

export function SiteFooter({ locale, labels, body }: { locale: Locale; labels: NavLabels; body: string }) {
  return (
    <footer className="border-t border-line bg-background py-12">
      <div className="site-container grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Image src={siteConfig.logo} width={2172} height={724} alt="Sky Hook" className="h-auto w-56" />
          <p className="mt-5 max-w-md text-sm text-muted">{body}</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Footer navigation">
          {siteConfig.navigation.filter((item) => item.showInNavigation).map((item) => (
            <Link key={item.href} href={localizedHref(locale, item.href)} className="kicker text-muted hover:text-ice">
              {labels[item.key]}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
