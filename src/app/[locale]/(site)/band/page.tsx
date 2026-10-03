import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SectionTransition } from "@/components/layout/section-transition";
import { ArtworkFrame } from "@/components/music/artwork-frame";
import { bandCopy } from "@/content/band";
import { mediaItems } from "@/content/media";
import { featuredRelease } from "@/content/releases";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localizedHref } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return { title: "Band" };
  return {
    title: getDictionary(locale).band.title,
    description: bandCopy[locale].intro,
    alternates: {
      canonical: `/${locale}/band`,
      languages: { en: "/en/band", sr: "/sr/band", "x-default": "/en/band" },
    },
    openGraph: {
      title: `Sky Hook / ${getDictionary(locale).band.title}`,
      description: bandCopy[locale].intro,
      images: [{ url: "/media/photos/skyhook-live-02.jpg", width: 1200, height: 800 }],
    },
  };
}

export default async function BandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const copy = bandCopy[locale];
  const primaryImage = mediaItems.find((item) => item.id === "live-02")!;
  const portrait = mediaItems.find((item) => item.id === "press-rehearsal")!;
  const livePhotos = ["live-guitar", "live-vocals"].map((id) => mediaItems.find((item) => item.id === id)!);
  const album = featuredRelease;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org", "@type": "MusicGroup", name: "Sky Hook",
    foundingLocation: { "@type": "Place", name: "Niš, Serbia" }, foundingDate: "2023",
    genre: ["Alternative rock", "Post-punk"],
    ...(siteUrl ? { url: `${siteUrl}/${locale}/band` } : {}),
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
  };
  const facts = [
    ["2023", copy.facts.formed],
    [String(album?.tracks.length ?? 13), copy.facts.tracks],
    [String(album?.year ?? 2025), copy.facts.debut],
  ];

  return (
    <PageShell eyebrow={dict.band.eyebrow} title={dict.band.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section id="band-story" className="scroll-mt-28 pb-[var(--sh-section-y)]">
        <div className="site-container">
          <nav aria-label={dict.band.title} className="mb-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-line pb-5">
            {Object.entries(copy.navigation).map(([key, label], index) => (
              <a key={key} href={`#band-${key}`} className="kicker text-muted transition-colors hover:text-ice">
                <span className="mr-2 text-ice">0{index + 1}</span>{label} ↓
              </a>
            ))}
          </nav>
          <div className="grid items-end gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <h2 className="poster-heading max-w-[12ch]">{copy.headline}</h2>
            <div className="lg:pb-2">
              <p className="editorial-stamp text-ice">{copy.location}</p>
              <p className="mt-5 max-w-xl text-lg leading-8 text-paper/80">{copy.intro}</p>
            </div>
          </div>
          <figure className="mt-10 md:mt-14">
            <div className="relative aspect-[3/2] overflow-hidden border-t-2 border-paper/50">
              <Image src={primaryImage.src} alt={primaryImage.alt} fill priority sizes="(min-width: 1440px) 1352px, 94vw" className="object-cover" style={{ objectPosition: primaryImage.focalPoint }} />
            </div>
            <figcaption className="flex flex-wrap justify-between gap-3 border-b border-line py-4">
              <span className="kicker text-muted">{copy.photoCaption}</span>
              <span className="kicker text-ice">Niš / Sky Hook</span>
            </figcaption>
          </figure>
          <dl className="grid grid-cols-3 border-b-2 border-paper/40">
            {facts.map(([value, label], index) => (
              <div key={label} className={`min-w-0 py-6 sm:py-8 ${index ? "border-l border-line pl-4 sm:pl-8" : "pr-4"}`}>
                <dt className="kicker text-muted">{label}</dt>
                <dd className="mt-3 font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-paper">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="band-sound" className="section-frame relative scroll-mt-28 bg-paper text-background">
        <SectionTransition tone="paper" direction="left" />
        <div className="site-container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div><p className="kicker">02 / {copy.navigation.sound}</p><h2 className="poster-heading mt-5 max-w-[13ch]">{copy.soundTitle}</h2></div>
            <div className="lg:pt-9"><p className="text-xl leading-9">{copy.secondary}</p><p className="mt-6 text-base leading-8 text-background/65">{copy.soundBody}</p></div>
          </div>
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-3">
            {copy.soundNotes.map((note, index) => (
              <article key={note.title} className="border-t-2 border-background pt-4">
                <p className="kicker text-background/55">0{index + 1} / SH</p>
                <h3 className="mt-5 font-display text-3xl uppercase">{note.title}</h3>
                <p className="mt-4 max-w-md text-base leading-7 text-background/70">{note.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {album ? (
        <section className="section-frame relative bg-surface">
          <SectionTransition tone="surface" direction="right" />
          <div className="site-container relative z-10 grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
            <Link href={localizedHref(locale, `/music/${album.slug}`)} aria-label={`${dict.common.openRelease}: ${album.title}`} className="block w-full max-w-lg border-2 border-paper/50 shadow-[8px_8px_0_var(--sh-ice)]">
              <ArtworkFrame artwork={album.artwork} title={album.title} placeholderLabel={dict.music.artworkTbd} />
            </Link>
            <div>
              <p className="kicker text-ice">{dict.music.album} / {album.year}</p>
              <h2 className="poster-heading mt-5 max-w-[13ch]">{copy.albumTitle}</h2>
              <p className="mt-7 max-w-xl text-lg leading-9 text-paper/80">{copy.albumBody}</p>
              <p className="kicker mt-7 border-t border-line pt-5 text-muted">{album.title} / {album.label}</p>
              <Link className="brutal-button mt-7" href={localizedHref(locale, `/music/${album.slug}`)}>{dict.common.openRelease} ↗</Link>
            </div>
          </div>
        </section>
      ) : null}

      <section id="band-history" className="section-frame scroll-mt-28">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div><p className="kicker text-ice">03 / {copy.navigation.history}</p><h2 className="poster-heading mt-5">{copy.timelineTitle}</h2></div>
            <span className="editorial-stamp text-muted">{copy.timeline[0].year} → {copy.timeline.at(-1)?.year}</span>
          </div>
          <ol className="border-t-2 border-paper/50">
            {copy.timeline.map((item) => (
              <li key={item.year} className="grid gap-4 border-b border-line py-8 md:grid-cols-[0.6fr_1fr_1.3fr] md:gap-8 md:py-10">
                <span className="font-display text-5xl leading-none text-ice md:text-6xl">{item.year}</span>
                <h3 className="max-w-md font-display text-2xl uppercase leading-tight md:text-3xl">{item.title}</h3>
                <p className="max-w-xl text-base leading-8 text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="band-live" className="section-frame relative scroll-mt-28 bg-surface-strong">
        <SectionTransition tone="surface-strong" direction="left" />
        <div className="site-container relative z-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div><p className="kicker text-ice">04 / {copy.navigation.live}</p><h2 className="poster-heading mt-5 max-w-[14ch]">{copy.liveTitle}</h2></div>
            <div className="md:pt-9"><p className="text-lg leading-9 text-paper/80">{copy.liveBody}</p><Link className="brutal-button mt-7" href={localizedHref(locale, "/live")}>{dict.nav.live} ↗</Link></div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {livePhotos.map((photo, index) => (
              <figure key={photo.id} className={index ? "sm:pt-16" : ""}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1440px) 660px, (min-width: 640px) 46vw, 92vw" className="object-cover" style={{ objectPosition: photo.focalPoint }} />
                </div>
                <figcaption className="kicker border-b border-paper/30 py-4 text-paper/65">0{index + 1} / {copy.photoCaption}</figcaption>
              </figure>
            ))}
          </div>
          <Link href={localizedHref(locale, "/media")} className="kicker mt-8 inline-block border-b border-ice pb-2 text-ice">{copy.galleryLink} ↗</Link>
        </div>
      </section>

      <section className="section-frame">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <figure>
            <div className="relative aspect-[3/2] overflow-hidden"><Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 1024px) 55vw, 92vw" className="object-cover" style={{ objectPosition: "50% 65%" }} /></div>
            <figcaption className="kicker border-b border-line py-4 text-muted">{copy.portraitCaption}</figcaption>
          </figure>
          <div><p className="editorial-stamp text-ice">Sky Hook / {copy.nowTitle}</p><h2 className="archive-heading mt-5">{copy.nowTitle}</h2><p className="mt-6 text-lg leading-9 text-muted">{copy.nowBody}</p></div>
        </div>
      </section>

      <section className="section-frame relative bg-paper text-background">
        <SectionTransition tone="paper" direction="right" />
        <div className="site-container relative z-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div><p className="kicker">Sky Hook / Booking</p><h2 className="poster-heading mt-5 max-w-[17ch]">{copy.bookingTitle}</h2></div>
          <div className="lg:pt-8">
            <p className="max-w-lg text-lg leading-8 text-background/70">{copy.bookingBody}</p>
            <a href={`mailto:${siteConfig.contact.bookingEmail}`} className="mt-7 block break-all border-b-2 border-background pb-3 text-xl font-bold hover:underline">{siteConfig.contact.bookingEmail} ↗</a>
            <div className="mt-8 flex flex-wrap gap-5"><Link className="brutal-button" href={localizedHref(locale, "/contact")}>{dict.nav.contact}</Link><Link className="brutal-button" href={localizedHref(locale, "/epk")}>{copy.pressLink} ↗</Link></div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
