import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { bandCopy } from "@/content/band";
import { mediaItems } from "@/content/media";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return { title: "Band" };
  const locale = rawLocale as Locale;
  const copy = bandCopy[locale];
  const description = copy.intro;

  return {
    title: "Sky Hook",
    description,
    alternates: {
      canonical: `/${locale}/band`,
      languages: { en: "/en/band", sr: "/sr/band", "x-default": "/en/band" },
    },
  };
}

export default async function BandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const copy = bandCopy[locale];
  const primaryImage = mediaItems.find((item) => item.id === "live-01") ?? mediaItems[0];
  const secondaryImage = mediaItems.find((item) => item.id === "live-02") ?? mediaItems[1] ?? mediaItems[0];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: "Sky Hook",
    foundingLocation: { "@type": "Place", name: "Niš, Serbia" },
    foundingDate: "2023",
    genre: ["Alternative rock", "Post-punk"],
    ...(siteUrl ? { url: `${siteUrl}/${locale}/band` } : {}),
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
  };

  return (
    <PageShell eyebrow={dict.band.eyebrow} title={dict.band.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-t border-line">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[34rem] border-b border-line lg:min-h-[44rem] lg:border-b-0 lg:border-r">
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              priority
              className="media-cover"
              style={{ objectPosition: primaryImage.focalPoint }}
            />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/70 to-transparent" />
            <span className="absolute bottom-5 left-5 kicker text-paper/70">2023 → NOW</span>
          </div>

          <div className="flex flex-col justify-between p-[var(--sh-gutter)] py-[var(--sh-section-y)]">
            <div>
              <p className="max-w-xl text-xl leading-9 text-ice-light/90 md:text-2xl md:leading-10">
                {copy.intro}
              </p>
              <p className="mt-8 max-w-xl text-base leading-8 text-muted">
                {copy.secondary}
              </p>
            </div>

            <div className="mt-12 grid grid-cols-3 border-y border-line md:mt-16">
              <div className="py-5 pr-4">
                <div className="font-display text-4xl text-ice">2023</div>
                <div className="kicker mt-1 text-muted">formed</div>
              </div>
              <div className="border-x border-line px-4 py-5">
                <div className="font-display text-4xl text-ice">13</div>
                <div className="kicker mt-1 text-muted">album tracks</div>
              </div>
              <div className="py-5 pl-4">
                <div className="font-display text-4xl text-ice">2025</div>
                <div className="kicker mt-1 text-muted">debut LP</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame bg-surface">
        <div className="site-container section-grid items-start">
          <div className="col-span-12 md:col-span-4">
            <p className="kicker text-ice">01 / SOUND</p>
            <h2 className="mt-4 font-display text-4xl uppercase md:text-7xl">
              {copy.soundTitle}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="max-w-3xl text-lg leading-9 text-ice-light/80">{copy.soundBody}</p>
          </div>
        </div>
      </section>

      <section className="section-frame overflow-hidden">
        <div className="site-container">
          <div className="mb-10 grid gap-4 md:mb-14 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="kicker text-ice">02 / TIMELINE</p>
              <h2 className="mt-4 font-display text-4xl uppercase md:text-7xl">
                {copy.timelineTitle}
              </h2>
            </div>
            <span className="kicker text-muted">2022 → 2026</span>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-[1.55rem] top-0 w-px bg-line md:left-1/2" aria-hidden="true" />

            <div className="space-y-10 md:space-y-0">
              {copy.timeline.map((item, index) => {
                const left = index % 2 === 0;
                return (
                  <article
                    key={item.year}
                    className="relative grid grid-cols-[3.1rem_1fr] gap-5 md:grid-cols-2 md:gap-16 md:py-12"
                  >
                    <div className="absolute left-[1.15rem] top-2 h-3 w-3 rounded-full border border-ice bg-background md:left-1/2 md:-translate-x-1/2 md:top-[3.4rem]" />

                    <div className={left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"}>
                      <div className="font-display text-4xl text-ice md:text-5xl">{item.year}</div>
                      <h3 className="mt-2 font-display text-2xl uppercase md:text-3xl">{item.title}</h3>
                      <p className="mt-4 max-w-xl text-base leading-8 text-muted md:ml-auto">{item.body}</p>
                    </div>

                    <div className="hidden md:block" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-[var(--sh-gutter)] py-[var(--sh-section-y)]">
            <p className="kicker text-ice">03 / NOW</p>
            <h2 className="mt-4 font-display text-4xl uppercase md:text-7xl">
              {copy.nowTitle}
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-9 text-ice-light/80">{copy.nowBody}</p>
          </div>

          <div className="relative min-h-[30rem] border-t border-line lg:min-h-[40rem] lg:border-l lg:border-t-0">
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              fill
              className="media-cover"
              style={{ objectPosition: secondaryImage.focalPoint }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-surface-strong/30 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
