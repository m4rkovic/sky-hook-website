import Image from "next/image";
import Link from "next/link";
import { newsItems, newsCategoryLabel } from "@/content/news";
import { mediaItems } from "@/content/media";
import { localizedHref, intlLocale, type Locale } from "@/i18n/config";

export function LatestNewsBlock({ locale, limit }: { locale: Locale; limit: number }) {
  const labels = locale === "sr"
    ? { eyebrow: "Vesti / press", title: "Poslednje", all: "Sve vesti", read: "Otvori" }
    : { eyebrow: "News / press", title: "Latest", all: "All news", read: "Read" };

  const items = [...newsItems]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);

  return (
    <section className="section-frame bg-background">
      <div className="site-container">
        <div className="mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-ice">04 / {labels.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl uppercase md:text-7xl">{labels.title}</h2>
          </div>
          <Link href={localizedHref(locale, "/news")} className="kicker text-muted hover:text-ice">{labels.all} →</Link>
        </div>

        <div className="grid border-l border-t border-line lg:grid-cols-3">
          {items.map((item) => {
            const image = item.imageId ? mediaItems.find((media) => media.id === item.imageId) : undefined;
            const date = new Intl.DateTimeFormat(intlLocale(locale), {
              day: "2-digit",
              month: "short",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(`${item.publishedAt}T00:00:00Z`));

            return (
              <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group border-b border-r border-line bg-surface">
                {item.imageUrl ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                    />
                  </div>
                ) : image ? (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="media-cover transition-transform duration-300 group-hover:scale-[1.015]"
                      style={{ objectPosition: image.focalPoint }}
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="kicker text-muted">{newsCategoryLabel(item.category, locale)} / {date}</p>
                  <h3 className="mt-4 font-display text-2xl uppercase leading-[1.08]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted">{item.summary[locale]}</p>
                  <span className="kicker mt-6 inline-block text-ice">{item.source} / {labels.read} ↗</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
