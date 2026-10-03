import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SectionTransition } from "@/components/layout/section-transition";
import { ListenLinks } from "@/components/music/listen-links";
import { ArtworkFrame } from "@/components/music/artwork-frame";
import { mediaVideos, youtubeWatchUrl } from "@/content/media-videos";
import { featuredRelease } from "@/content/releases";
import { bookingHref, pressCopy, pressHighlights, pressKitUrl, pressPhotos } from "@/content/press";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localizedHref } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return { title: "Press kit" };
  return {
    title: "Press kit / Booking", description: pressCopy[locale].bio,
    alternates: { canonical: `/${locale}/epk`, languages: { en: "/en/epk", sr: "/sr/epk", "x-default": "/en/epk" } },
    openGraph: { title: "Sky Hook / Press kit", description: pressCopy[locale].intro, images: [pressPhotos[0].src] },
  };
}

export default async function EpkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = pressCopy[locale];
  const dict = getDictionary(locale);
  const featuredLive = mediaVideos.find((video) => video.id === "live-cx2pbneaco4");
  const album = featuredRelease;

  return (
    <PageShell eyebrow={t.eyebrow} title={t.title}>
      <section className="pb-[var(--sh-section-y)]">
        <div className="site-container grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="max-w-xl text-xl leading-8 text-paper/80">{t.intro}</p>
            <div className="mt-8 flex flex-wrap gap-5">
              <a className="brutal-button brutal-button-primary" href={pressKitUrl} download>{t.downloadKit} ↓</a>
              <a className="brutal-button" href={bookingHref(locale)}>{t.email} ↗</a>
            </div>
            <p className="kicker mt-5 text-muted">{t.kitDetail}</p>
            <div className="mt-10 border-t-2 border-paper/40 pt-6">
              <h2 className="kicker text-ice">01 / {t.bioLabel}</h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-paper/80">{t.bio}</p>
              <a href={`/press/sky-hook-bio-${locale}.txt`} download className="kicker mt-5 inline-block border-b border-ice pb-2 text-ice">{t.downloadBio} / TXT ↓</a>
            </div>
          </div>
          <figure>
            <Image src={pressPhotos[0].src} alt={`Sky Hook / ${t.portrait}`} width={pressPhotos[0].width} height={pressPhotos[0].height} priority sizes="(min-width: 1024px) 50vw, 92vw" className="h-auto w-full border-t-2 border-paper/40" />
            <figcaption className="kicker border-b border-line py-4 text-muted">Niš / Alternative rock / 2023</figcaption>
            <a href={`mailto:${siteConfig.contact.bookingEmail}`} className="mt-6 block break-all text-lg font-bold text-ice hover:underline">{siteConfig.contact.bookingEmail}</a>
          </figure>
        </div>
      </section>

      <section className="section-frame relative bg-surface">
        <SectionTransition tone="surface" direction="left" />
        <div className="site-container relative z-10">
          <p className="kicker text-ice">02 / {t.highlights}</p>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {pressHighlights.map((show) => (
              <div key={show.title} className="border-t-2 border-paper/35 pt-4">
                <span className="kicker text-muted">{show.year} / {show.city}</span>
                <h3 className="mt-5 font-display text-3xl uppercase">{show.title}</h3>
              </div>
            ))}
          </div>
          {featuredLive ? (
            <div className="mt-14 grid items-start gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div><h2 className="archive-heading">{t.liveVideo}</h2><p className="kicker mt-6 text-muted">{featuredLive.title[locale]}</p></div>
              <a href={youtubeWatchUrl(featuredLive.youtubeId)} target="_blank" rel="noreferrer" className="group block" aria-label={`${t.watch}: ${featuredLive.title[locale]}`}>
                <div className="relative aspect-video overflow-hidden border-2 border-paper/40">
                  <Image src="/media/photos/live-wide.webp" alt="Sky Hook live" fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-background/25" />
                  <span aria-hidden="true" className="absolute bottom-5 right-5 flex h-16 w-16 items-center justify-center border-2 border-paper bg-paper text-xl text-background">▶</span>
                </div>
                <span className="kicker mt-4 block text-ice">{t.watch} ↗</span>
              </a>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-frame relative bg-paper text-background">
        <SectionTransition tone="paper" direction="right" />
        <div className="site-container relative z-10">
          <div className="grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-end">
            <div><p className="kicker">03 / PRESS</p><h2 className="poster-heading mt-5">{t.photos}</h2></div>
            <p className="max-w-md text-base leading-7 text-background/65">{t.photoNote}</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pressPhotos.map((photo, index) => (
              <figure key={photo.src}>
                <div className="relative aspect-[3/2] overflow-hidden border-t-2 border-background"><Image src={photo.src} alt={`Sky Hook / ${t[photo.kind]} ${index + 1}`} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" /></div>
                <figcaption className="border-b border-background/30 py-5">
                  <p className="kicker">0{index + 1} / {t[photo.kind]}</p>
                  <a className="mt-4 inline-block text-sm font-bold underline underline-offset-4" href={photo.src} download={`sky-hook-${photo.kind}-${index + 1}.jpg`}>{t.download} JPEG ↓</a>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 grid gap-6 border-y-2 border-background py-7 md:grid-cols-[1fr_1fr] md:items-center">
            <div><h3 className="font-display text-3xl uppercase">{t.logo}</h3><a href={siteConfig.logo} download="sky-hook-logo.png" className="kicker mt-4 inline-block underline underline-offset-4">{t.download} PNG ↓</a></div>
            <div className="bg-background p-6"><Image src={siteConfig.logo} alt="Sky Hook" width={2172} height={724} className="mx-auto h-auto w-full max-w-sm" /></div>
          </div>
        </div>
      </section>

      {album ? (
        <section className="section-frame">
          <div className="site-container grid gap-10 md:grid-cols-[0.65fr_1.35fr] md:gap-16">
            <Link href={localizedHref(locale, `/music/${album.slug}`)} className="block max-w-sm" aria-label={album.title}><ArtworkFrame artwork={album.artwork} title={album.title} placeholderLabel={dict.music.artworkTbd} /></Link>
            <div><p className="kicker text-ice">04 / {t.music}</p><h2 className="archive-heading mt-5">{album.title}</h2><p className="mt-5 text-base leading-8 text-muted">{t.musicBody}</p><div className="mt-7"><ListenLinks compact streaming={album.streaming} labels={{ play: dict.music.play, watch: dict.music.watch, open: dict.music.open, noLinks: dict.music.noLinks }} /></div></div>
          </div>
        </section>
      ) : null}

      <section className="section-frame relative bg-surface-strong">
        <SectionTransition tone="surface-strong" direction="left" />
        <div className="site-container relative z-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <div><p className="kicker text-ice">05 / BOOKING</p><h2 className="poster-heading mt-5 max-w-[14ch]">{t.booking}</h2><p className="mt-6 max-w-lg text-base leading-8 text-paper/70">{t.bookingBody}</p><a href={`mailto:${siteConfig.contact.bookingEmail}`} className="mt-6 block break-all text-xl font-bold text-ice hover:underline">{siteConfig.contact.bookingEmail}</a><Link href={localizedHref(locale, "/contact")} className="brutal-button mt-7">{dict.nav.contact} ↗</Link></div>
          <div className="border-t-2 border-paper/40 pt-6"><h3 className="font-display text-3xl uppercase">{t.technicalTitle}</h3><p className="mt-5 max-w-lg text-base leading-8 text-paper/70">{t.technicalBody}</p><a href={bookingHref(locale, "technical")} className="brutal-button mt-7">{t.technicalEmail} ↗</a></div>
        </div>
      </section>
    </PageShell>
  );
}
