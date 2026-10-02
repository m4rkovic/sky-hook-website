import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkFrame } from "@/components/music/artwork-frame";
import { getRelease, releases } from "@/content/releases";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, intlLocale, localizedHref, locales, type Locale } from "@/i18n/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => releases.map((release) => ({ locale, slug: release.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const release = getRelease(slug);
  return { title: release?.title ?? "Music" };
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
  const displayTracks =
    release.tracks.length > 0
      ? release.tracks
      : release.type === "single"
        ? [{ number: 1, title: release.title }]
        : [];

  const placeholderCredits =
    locale === "sr"
      ? [
          ["Autor(i)", "TBD"],
          ["Produkcija", "TBD"],
          ["Snimano u", "TBD"],
          ["Miks", "TBD"],
          ["Master", "TBD"],
          ["Dizajn / omot", "TBD"],
        ]
      : [
          ["Written by", "TBD"],
          ["Produced by", "TBD"],
          ["Recorded at", "TBD"],
          ["Mixed by", "TBD"],
          ["Mastered by", "TBD"],
          ["Artwork by", "TBD"],
        ];

  const credits = release.credits.length
    ? release.credits.map((credit) => [credit.role, credit.name] as const)
    : placeholderCredits;

  const primaryLyrics =
    release.type === "single"
      ? release.tracks.find((track) => track.lyrics?.[locale])?.lyrics?.[locale]
      : undefined;

  const facts = [
    [dict.music.releaseDateLabel, releaseDate],
    [dict.music.formatLabel, dict.music[release.type]],
    [dict.music.labelLabel, release.label ?? "TBD"],
    [dict.music.catalogLabel, release.catalogNumber ?? "TBD"],
    [dict.music.rightsLabel, release.rights ?? "TBD"],
  ];

  return (
    <main className="pt-[calc(var(--sh-header-h)+3rem)]">
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
        <div className="site-container grid md:grid-cols-5">
          {facts.map(([label, value], index) => (
            <div
              key={label}
              className={`border-line py-6 md:px-5 ${index > 0 ? "border-t md:border-l md:border-t-0" : ""}`}
            >
              <p className="kicker text-muted">{label}</p>
              <p className="mt-2 font-display text-xl font-black uppercase tracking-[-0.02em] text-paper">
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
            <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
              {dict.music.aboutRelease}
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-9 text-ice-light/80">{description}</p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="kicker text-ice">02 / {dict.music.tracklist}</p>
            <div className="mt-5 border-t border-line">
              {displayTracks.length ? (
                displayTracks.map((track) => (
                  <div
                    key={track.number}
                    className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-5"
                  >
                    <span className="kicker text-muted">{String(track.number).padStart(2, "0")}</span>
                    <span className="font-display text-2xl font-black uppercase tracking-[-0.02em]">
                      {track.title}
                    </span>
                    {track.duration ? <span className="text-sm text-muted">{track.duration}</span> : <span className="kicker text-muted">TBD</span>}
                  </div>
                ))
              ) : (
                <div className="border-b border-line py-6">
                  <p className="text-sm leading-7 text-muted">{dict.music.noTracklist}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="site-container section-grid py-[var(--sh-section-y)]">
          <div className="col-span-12 lg:col-span-5">
            <p className="kicker text-ice">03 / {dict.music.credits}</p>
            <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-[-0.04em] md:text-6xl">
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

      {release.type === "single" ? (
        <section className="border-t border-line bg-paper text-background">
          <div className="site-container section-grid py-[var(--sh-section-y)]">
            <div className="col-span-12 lg:col-span-4">
              <p className="kicker text-background/45">04 / LYRICS</p>
              <h2 className="mt-4 font-display text-5xl font-black uppercase tracking-[-0.04em] md:text-7xl">
                {dict.music.lyrics}
              </h2>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              {primaryLyrics ? (
                <div className="whitespace-pre-line text-lg leading-9 text-background/80">{primaryLyrics}</div>
              ) : (
                <div className="border-y border-background/20 py-7">
                  <p className="max-w-xl text-base leading-8 text-background/55">{dict.music.lyricsPlaceholder}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
