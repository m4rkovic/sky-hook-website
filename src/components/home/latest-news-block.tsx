import Link from "next/link";
import { newsItems, newsCategoryLabel } from "@/content/news";
import { NewsImage } from "@/components/news/news-image";
import { localizedHref, intlLocale, type Locale } from "@/i18n/config";
import { SectionTransition } from "@/components/layout/section-transition";

export function LatestNewsBlock({ locale, limit }: { locale: Locale; limit: number }) {
  const labels = locale === "sr"
    ? { eyebrow: "Vesti / press", title: "Poslednje", all: "Sve vesti", read: "Otvori" }
    : { eyebrow: "News / press", title: "Latest", all: "All news", read: "Read" };

  const items = [...newsItems]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);

  return (
    <section className="section-frame relative bg-background">
      <SectionTransition tone="background" direction="right" />
      <div className="site-container relative z-10">
        <div className="mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-ice">04 / {labels.eyebrow}</p>
            <h2 className="poster-heading mt-4">{labels.title}</h2>
          </div>
          <Link href={localizedHref(locale, "/news")} className="kicker text-muted hover:text-ice">{labels.all} →</Link>
        </div>

        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-3">
          {items.map((item) => {
            const date = new Intl.DateTimeFormat(intlLocale(locale), {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(`${item.publishedAt}T00:00:00Z`));

            return (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group min-w-0 border-t border-paper/15 pt-5">
                <div className="relative aspect-[3/2] overflow-hidden bg-surface">
                  <NewsImage item={item} sizes="(max-width: 1024px) 100vw, 33vw" />
                </div>
                <div className="pt-5">
                  <p className="kicker text-muted">{newsCategoryLabel(item.category, locale)} / {date}</p>
                  <h3 className="mt-3 text-pretty font-display text-2xl leading-[1.18] transition-colors group-hover:text-ice">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted">{item.summary[locale]}</p>
                  <span className="kicker mt-5 inline-block text-ice">{item.source} / {labels.read} ↗</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
