import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { mediaItems } from "@/content/media";
import { mediaVideos, youtubeThumbnailUrl, youtubeWatchUrl } from "@/content/media-videos";
import { siteConfig } from "@/content/site";
import { hasLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = { title: "EPK", robots: { index: false, follow: false } };

const copy = {
  en: {
    eyebrow: "Press / Booking",
    title: "Electronic press kit",
    intro: "A compact promoter and press resource for Sky Hook. Final downloadable assets can be dropped into this structure without rebuilding the page.",
    bioLabel: "Short bio",
    bio: "Sky Hook is a guitar band from Niš, Serbia, built around contrast: direct songs, restless arrangements, two vocal perspectives and a live set that moves between atmosphere and impact. The debut album Gde ptice lete arrived in 2025 and became the centre of the band's current live chapter.",
    highlights: "Selected live",
    assets: "Press assets",
    photos: "Press photos",
    logos: "Logos",
    rider: "Tech rider / stage plot",
    coming: "Download pack coming soon",
    download: "Download",
    openMedia: "Open media archive",
    contact: "Booking / press",
    contactBody: "Shows, festivals, support slots, interviews and press enquiries.",
    music: "Listen",
    socials: "Official links",
  },
  sr: {
    eyebrow: "Press / Booking",
    title: "Electronic press kit",
    intro: "Kompaktan resurs za promotere i medije. Finalne fotografije, rider i download fajlovi mogu kasnije da se ubace bez menjanja strukture stranice.",
    bioLabel: "Kratka biografija",
    bio: "Sky Hook je gitarski bend iz Niša izgrađen na kontrastu: direktne pesme, nemirni aranžmani, dva vokalna ugla i live set koji se kreće između atmosfere i udara. Debitantski album Gde ptice lete objavljen je 2025. i postao je osnova aktuelnog koncertnog poglavlja benda.",
    highlights: "Odabrani nastupi",
    assets: "Press materijal",
    photos: "Press fotografije",
    logos: "Logotipi",
    rider: "Tech rider / stage plot",
    coming: "Download paket uskoro",
    download: "Preuzmi",
    openMedia: "Otvori media arhivu",
    contact: "Booking / press",
    contactBody: "Nastupi, festivali, support slotovi, intervjui i press upiti.",
    music: "Slušaj",
    socials: "Zvanični linkovi",
  },
} as const;

export default async function EpkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const t = copy[locale];
  const heroImage = mediaItems.find((item) => item.id === "live-02");
  const bookingEmail = siteConfig.contact.bookingEmail;
  const featuredLive = mediaVideos.find((video) => video.category === "live");

  return (
    <PageShell eyebrow={t.eyebrow} title={t.title}>
      <section className="border-b border-line">
        <div className="site-container section-grid py-[var(--sh-section-y)]">
          <div className="col-span-12 lg:col-span-5">
            <p className="max-w-xl text-lg leading-8 text-muted">{t.intro}</p>
            <div className="mt-10 border-t border-line pt-5">
              <p className="kicker text-ice">{t.bioLabel}</p>
              <p className="mt-5 max-w-xl text-base leading-8 text-paper/80">{t.bio}</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface">
              {heroImage ? (
                <Image src={heroImage.src} alt={heroImage.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="media-cover" style={{ objectPosition: heroImage.focalPoint }} />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="site-container py-[var(--sh-section-y)]">
          <p className="kicker text-ice">01 / {t.highlights}</p>
          <div className="mt-6 grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-4">
            {[
              ["2026", "Nišville Open Stage"],
              ["2026", "Čupin Rock Memorijal"],
              ["2026", "Skopje / Pub Dže"],
              ["2025", "Nišville"],
            ].map(([year, show]) => (
              <div key={show} className="min-h-44 border-b border-r border-line p-5">
                <span className="kicker text-muted">{year}</span>
                <p className="mt-10 font-display text-2xl font-black uppercase tracking-[-0.03em]">{show}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featuredLive ? (
        <section className="border-b border-line">
          <div className="site-container py-[var(--sh-section-y)]">
            <p className="kicker text-ice">02 / Live video</p>
            <a href={youtubeWatchUrl(featuredLive.youtubeId)} target="_blank" rel="noreferrer" className="group mt-6 block border border-line bg-surface">
              <div className="relative aspect-video overflow-hidden">
                <img src={youtubeThumbnailUrl(featuredLive.youtubeId)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]" />
                <div className="absolute inset-0 bg-black/20" />
                <span className="absolute bottom-5 right-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/60 bg-black/35 text-xl">▶</span>
              </div>
              <div className="flex items-end justify-between gap-5 p-5">
                <p className="font-display text-3xl font-black uppercase">{featuredLive.title[locale]}</p>
                <span className="kicker text-muted">YouTube ↗</span>
              </div>
            </a>
          </div>
        </section>
      ) : null}

      <section className="border-b border-line">
        <div className="site-container py-[var(--sh-section-y)]">
          <p className="kicker text-ice">03 / {t.assets}</p>
          <div className="mt-6 grid border-l border-t border-line md:grid-cols-3">
            <div className="flex min-h-56 flex-col justify-between border-b border-r border-line p-5">
              <span className="kicker text-muted">01</span>
              <div>
                <p className="font-display text-3xl uppercase">{t.photos}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href="/media/photos/skyhook-live-01.jpg" download className="kicker text-ice hover:text-paper">{t.download} 01 ↓</a>
                  <a href="/media/photos/skyhook-live-02.jpg" download className="kicker text-ice hover:text-paper">{t.download} 02 ↓</a>
                </div>
              </div>
            </div>
            <div className="flex min-h-56 flex-col justify-between border-b border-r border-line p-5">
              <span className="kicker text-muted">02</span>
              <div>
                <p className="font-display text-3xl uppercase">{t.logos}</p>
                <a href="/brand/sky-hook-wordmark.png" download className="kicker mt-4 inline-block text-ice hover:text-paper">{t.download} PNG ↓</a>
              </div>
            </div>
            <div className="flex min-h-56 flex-col justify-between border-b border-r border-line p-5">
              <span className="kicker text-muted">03</span>
              <div>
                <p className="font-display text-3xl uppercase">{t.rider}</p>
                <p className="kicker mt-3 text-muted">{t.coming}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper text-background">
        <div className="site-container section-grid py-[var(--sh-section-y)]">
          <div className="col-span-12 lg:col-span-5">
            <p className="kicker text-background/50">04 / {t.contact}</p>
            <h2 className="mt-4 font-display text-5xl font-black uppercase tracking-[-0.045em] md:text-7xl">{t.contact}</h2>
            <p className="mt-5 max-w-lg text-background/65">{t.contactBody}</p>
          </div>
          <div className="col-span-12 flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <a href={`mailto:${bookingEmail}`} className="break-all border-y border-background/20 py-6 font-display text-2xl font-black uppercase transition-colors hover:text-[#151c47] md:text-4xl">
              {bookingEmail}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={siteConfig.socials.spotify} target="_blank" rel="noreferrer" className="brutal-button border-background">{t.music} / Spotify ↗</a>
              <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="brutal-button border-background">Instagram ↗</a>
              <a href={siteConfig.socials.youtube} target="_blank" rel="noreferrer" className="brutal-button border-background">YouTube ↗</a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
