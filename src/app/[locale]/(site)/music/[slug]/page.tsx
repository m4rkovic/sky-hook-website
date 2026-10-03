import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListenLinks } from "@/components/music/listen-links";
import { ArtworkFrame } from "@/components/music/artwork-frame";
import { getRelease, releases } from "@/content/releases";
import { getSong } from "@/content/songs";
import type { Release } from "@/content/schemas";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, intlLocale, localizedHref, locales, type Locale } from "@/i18n/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => releases.map((release) => ({ locale, slug: release.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const release = getRelease(slug);
  if (!release || !hasLocale(rawLocale)) return { title: "Music" };

  const locale = rawLocale as Locale;
  const description = release.description?.[locale] ?? `${release.title} by Sky Hook.`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const fallbackImage = siteUrl ? `${siteUrl}${siteConfig.socialImage}` : undefined;

  return {
    title: release.title,
    description,
    alternates: {
      canonical: `/${locale}/music/${release.slug}`,
      languages: {
        en: `/en/music/${release.slug}`,
        sr: `/sr/music/${release.slug}`,
        "x-default": `/en/music/${release.slug}`,
      },
    },
    openGraph: {
      title: `${release.title} | Sky Hook`,
      description,
      ...(release.artwork ? { images: [{ url: release.artwork, alt: `${release.title} artwork` }] } : fallbackImage ? { images: [{ url: fallbackImage, alt: "Sky Hook" }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} | Sky Hook`,
      description,
      ...(release.artwork ? { images: [release.artwork] } : fallbackImage ? { images: [fallbackImage] } : {}),
    },
  };
}

function formatReleaseDate(releaseDate: string | undefined, year: number, locale: Locale) {
  if (!releaseDate) return String(year);
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${releaseDate}T00:00:00Z`));
}

export default async function ReleasePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const release = getRelease(slug);
  if (!release) notFound();

  const dict = getDictionary(locale);
  const description = release.description?.[locale] ?? dict.music.descriptionPlaceholder;
  const releaseDate = formatReleaseDate(release.releaseDate, release.year, locale);
  const displayTracks: Release["tracks"] =
    release.tracks.length > 0
      ? release.tracks
      : release.type === "single"
        ? [{ number: 1, title: release.title }]
        : [];

  const credits = release.credits.map((credit) => [credit.role, credit.name] as const);

  const primaryLyrics =
    release.type === "single"
      ? getSong(release.tracks[0]?.songSlug ?? "")?.lyrics ?? release.tracks.find((track) => track.lyrics?.[locale])?.lyrics?.[locale]
      : undefined;

  const facts = [
    [dict.music.releaseDateLabel, releaseDate],
    [dict.music.formatLabel, dict.music[release.type]],
    ...(release.label ? [[dict.music.labelLabel, release.label]] : []),
    ...(release.catalogNumber ? [[dict.music.catalogLabel, release.catalogNumber]] : []),
    ...(release.rights ? [[dict.music.rightsLabel, release.rights]] : []),
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const releaseUrl = siteUrl ? `${siteUrl}/${locale}/music/${release.slug}` : undefined;
  const jsonLd = release.type === "album"
    ? {
        "@context": "https://schema.org",
        "@type": "MusicAlbum",
        name: release.title,
        byArtist: { "@type": "MusicGroup", name: "Sky Hook" },
        datePublished: release.releaseDate ?? String(release.year),
        ...(releaseUrl ? { url: releaseUrl } : {}),
        ...(release.artwork && siteUrl ? { image: new URL(release.artwork, siteUrl).toString() } : {}),
        numTracks: release.tracks.length || undefined,
        track: release.tracks.map((track) => ({
          "@type": "MusicRecording",
          position: track.number,
          name: track.title,
        })),
      }
    : {
        "@context": "https://schema.org",
        "@type": "MusicRecording",
        name: release.title,
        byArtist: { "@type": "MusicGroup", name: "Sky Hook" },
        datePublished: release.releaseDate ?? String(release.year),
        ...(releaseUrl ? { url: releaseUrl } : {}),
        ...(release.artwork && siteUrl ? { image: new URL(release.artwork, siteUrl).toString() } : {}),
      };

  return (
    <main className="pt-[calc(var(--sh-header-h)+1.5rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative overflow-hidden border-b border-background/15 bg-paper text-background">
        <div className="site-container section-grid py-[var(--sh-section-y)]">
          <div className="col-span-12 flex flex-col md:col-span-6 md:pr-8">
            <div>
              <p className="kicker text-background/55">
                {dict.music[release.type]} / {releaseDate}
              </p>
              <h1 className="display-title mt-6 max-w-4xl">{release.title}</h1>
            </div>

            <div className="mt-10 max-w-xl md:mt-12">
              <p className="text-base leading-8 text-background/65">{description}</p>
              <Link
                className="brutal-button mt-9 border-background"
                href={localizedHref(locale, `/listen/${release.slug}`)}
              >
                {dict.common.listen}
              </Link>
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <ArtworkFrame
              artwork={release.artwork}
              title={release.title}
              placeholderLabel={dict.music.artworkTbd}
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-background">
        <div className="site-container grid sm:grid-cols-2 lg:grid-cols-5">
          {facts.map(([label, value], index) => (
            <div
              key={label}
              className={`border-line py-5 sm:px-5 ${index > 0 ? "border-t sm:border-l sm:border-t-0" : ""}`}
            >
              <p className="kicker text-muted">{label}</p>
              <p className="mt-2 font-display text-lg uppercase text-paper md:text-xl">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-frame">
        <div className="site-container section-grid items-start">
          <div className="col-span-12 lg:col-span-5">
            <p className="kicker text-ice">01 / RELEASE</p>
            <h2 className="mt-4 font-display text-4xl uppercase md:text-6xl">
              {dict.music.aboutRelease}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-9 text-ice-light/80">{description}</p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="kicker text-ice">02 / {dict.music.tracklist}</p>
            <div className="mt-5 border-t border-line">
              {displayTracks.length ? (
                displayTracks.map((track) => {
                  const song = getSong(track.songSlug ?? "");
                  const row = (
                    <>
                      <span className="kicker text-muted">{String(track.number).padStart(2, "0")}</span>
                      <span className="min-w-0 font-display text-2xl uppercase">{track.title}</span>
                      <span className="flex items-center gap-3 text-sm text-muted">
                        {track.duration}
                        {song && release.type !== "single" ? <span className="text-ice" aria-hidden="true">＋</span> : null}
                      </span>
                    </>
                  );
                  return song && release.type !== "single" ? (
                    <details key={track.number} id={`lyrics-${song.slug}`} className="group border-b border-line">
                      <summary className="grid cursor-pointer list-none grid-cols-[2rem_1fr_auto] items-center gap-3 py-5 transition-colors hover:text-ice focus-visible:outline-2 focus-visible:outline-ice [&::-webkit-details-marker]:hidden" aria-label={`${track.title} — ${dict.music.lyrics}`}>
                        {row}
                      </summary>
                      <div className="border-t border-line bg-surface px-4 py-7 sm:px-8">
                        <div className="mb-8">
                          <p className="kicker mb-4 text-ice">{dict.common.listen}</p>
                          <ListenLinks compact streaming={song.streaming} labels={{ play: dict.music.play, watch: dict.music.watch, open: dict.music.open, noLinks: dict.music.noLinks }} />
                        </div>
                        <p className="kicker mb-5 text-ice">{dict.music.lyrics}</p>
                        <div lang="sr" className="whitespace-pre-line break-words text-base leading-8 text-paper/85">{song.lyrics}</div>
                      </div>
                    </details>
                  ) : (
                    <div key={track.number} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-line py-5">{row}</div>
                  );
                })
              ) : (
                <div className="border-b border-line py-6">
                  <p className="text-sm leading-7 text-muted">{dict.music.noTracklist}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {credits.length ? (
        <section className="border-t border-line bg-surface">
          <div className="site-container section-grid py-[var(--sh-section-y)]">
            <div className="col-span-12 lg:col-span-5">
              <p className="kicker text-ice">03 / {dict.music.credits}</p>
              <h2 className="mt-4 font-display text-4xl uppercase md:text-6xl">
                {dict.music.credits}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <div className="border-t border-line">
                {credits.map(([role, name]) => (
                  <div
                    key={`${role}-${name}`}
                    className="grid grid-cols-[minmax(8rem,0.7fr)_1.3fr] gap-5 border-b border-line py-4"
                  >
                    <span className="kicker text-muted">{role}</span>
                    <span className={`text-sm ${name === "TBD" ? "text-muted/55" : "text-paper"}`}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      ) : null}

      {release.type === "single" && primaryLyrics ? (
        <section className="border-t border-line bg-paper text-background">
          <div className="site-container section-grid py-[var(--sh-section-y)]">
            <div className="col-span-12 lg:col-span-4">
              <p className="kicker text-background/45">04 / {dict.music.lyrics}</p>
              <h2 className="mt-4 font-display text-5xl uppercase md:text-7xl">
                {dict.music.lyrics}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <div lang="sr" className="whitespace-pre-line break-words text-lg leading-9 text-background/80">{primaryLyrics}</div>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
