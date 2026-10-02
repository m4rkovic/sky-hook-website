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
  return new Intl.DateTimeFormat(intlLocale(locale), { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${releaseDate}T00:00:00Z`));
}

export default async function ReleasePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const release = getRelease(slug);
  if (!release) notFound();
  const dict = getDictionary(locale);
  const description = release.description?.[locale];

  return (
    <main className="pt-[calc(var(--sh-header-h)+3rem)]">
      <section className="relative overflow-hidden border-b border-line bg-paper text-background">
        <div className="site-container section-grid py-[var(--sh-section-y)]">
          <div className="col-span-12 md:col-span-6">
            <p className="kicker text-background/55">{dict.music[release.type]} / {formatReleaseDate(release.releaseDate, release.year, locale)}</p>
            <h1 className="display-title mt-6 max-w-4xl">{release.title}</h1>
            {description ? <p className="mt-8 max-w-xl text-base leading-7 text-background/65">{description}</p> : null}
            <Link className="brutal-button mt-9 border-background" href={localizedHref(locale, `/listen/${release.slug}`)}>{dict.common.listen}</Link>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <ArtworkFrame artwork={release.artwork} title={release.title} placeholderLabel={dict.music.artworkTbd} priority />
          </div>
        </div>
      </section>

      <section className="section-frame">
        <div className="site-container section-grid">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="font-display text-3xl font-black uppercase">{dict.music.tracklist}</h2>
            <div className="mt-6 border-t border-line">
              {release.tracks.length ? release.tracks.map((track) => (
                <div key={track.number} className="grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-4">
                  <span className="kicker text-muted">{String(track.number).padStart(2, "0")}</span>
                  <span className="font-display text-xl font-black uppercase">{track.title}</span>
                  {track.duration ? <span className="text-sm text-muted">{track.duration}</span> : null}
                </div>
              )) : <p className="py-6 text-sm text-muted">{dict.music.noTracklist}</p>}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 className="font-display text-3xl font-black uppercase">{dict.music.credits}</h2>
            <div className="mt-6 border-t border-line">
              {release.credits.length ? release.credits.map((credit) => (
                <div key={`${credit.role}-${credit.name}`} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-4 text-sm">
                  <span className="kicker text-muted">{credit.role}</span>
                  <span>{credit.name}</span>
                </div>
              )) : <p className="py-6 text-sm text-muted">{dict.music.noCredits}</p>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
