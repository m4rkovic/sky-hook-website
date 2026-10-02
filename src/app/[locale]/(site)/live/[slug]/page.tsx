import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchShowArchive } from "@/features/shows/providers/archive.server";
import { showFromSlug } from "@/content/show-utils";
import { getShowOverride, localizedOverride } from "@/content/show-overrides";
import { mediaItems } from "@/content/media";
import { hasLocale, intlLocale, localizedHref, type Locale } from "@/i18n/config";

async function getShow(slug: string) {
  try {
    const { shows } = await fetchShowArchive();
    return showFromSlug(shows, slug);
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(rawLocale)) return { title: "Live" };
  const show = await getShow(slug);
  if (!show) return { title: "Live" };

  const locale = rawLocale as Locale;
  const place = [show.venue, show.city].filter(Boolean).join(", ");
  const description = locale === "sr"
    ? `Sky Hook uživo u ${place}. Setlista i detalji nastupa.`
    : `Sky Hook live at ${place}. Setlist and show details.`;

  return {
    title: `${show.venue} / ${show.date}`,
    description,
    alternates: {
      canonical: `/${locale}/live/${slug}`,
      languages: {
        en: `/en/live/${slug}`,
        sr: `/sr/live/${slug}`,
        "x-default": `/en/live/${slug}`,
      },
    },
  };
}

export default async function LiveShowPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const show = await getShow(slug);
  if (!show) notFound();

  const date = new Intl.DateTimeFormat(intlLocale(locale), {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${show.date}T00:00:00Z`));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const pageUrl = siteUrl ? `${siteUrl}/${locale}/live/${slug}` : undefined;
  const locationName = [show.city, show.region, show.country].filter(Boolean).join(", ");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `Sky Hook at ${show.venue}`,
    startDate: show.date,
    eventStatus: "https://schema.org/EventCompleted",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: show.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: show.city,
        ...(show.region ? { addressRegion: show.region } : {}),
        ...(show.country ? { addressCountry: show.country } : {}),
      },
    },
    performer: { "@type": "MusicGroup", name: "Sky Hook" },
    ...(pageUrl ? { url: pageUrl } : {}),
  };

  const labels = locale === "sr"
    ? { live: "Uživo", back: "Svi nastupi", setlist: "Setlista", details: "Detalji", venue: "Mesto", location: "Lokacija", source: "Izvor", noSongs: "Za ovaj nastup još nema dokumentovane setliste.", encore: "Bis" }
    : { live: "Live", back: "All shows", setlist: "Setlist", details: "Details", venue: "Venue", location: "Location", source: "Source", noSongs: "No setlist has been documented for this show yet.", encore: "Encore" };

  const songCount = show.sets.reduce((sum, set) => sum + set.songs.filter((song) => !song.tape).length, 0);
  const editorial = getShowOverride(show);
  const editorialTitle = localizedOverride(editorial?.title, locale);
  const editorialDescription = localizedOverride(editorial?.description, locale);
  const editorialImage = editorial?.imageId ? mediaItems.find((item) => item.id === editorial.imageId) : undefined;

  return (
    <main className="pt-[var(--sh-header-h)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-line">
        <div className="site-container py-8 md:py-12">
          <Link href={localizedHref(locale, "/live")} className="kicker text-muted hover:text-ice">← {labels.back}</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-end">
            <div>
              <p className="kicker text-ice">{labels.live} / {date}</p>
              <h1 className="mt-4 max-w-[12ch] font-display text-5xl uppercase leading-[0.94] md:text-7xl lg:text-8xl">{editorialTitle || show.venue}</h1>
              <p className="mt-6 text-xl text-muted md:text-2xl">{show.venue} / {locationName}</p>
            </div>
            <div className="grid grid-cols-2 border-l border-t border-line">
              <div className="border-b border-r border-line p-4"><span className="kicker text-muted">{labels.setlist}</span><p className="mt-2 font-display text-4xl text-ice">{songCount || "—"}</p></div>
              <div className="border-b border-r border-line p-4"><span className="kicker text-muted">Year</span><p className="mt-2 font-display text-4xl">{show.date.slice(0,4)}</p></div>
            </div>
          </div>
        </div>
      </section>

      {editorialImage || editorialDescription ? (
        <section className="border-b border-line">
          <div className="site-container grid gap-0 lg:grid-cols-2">
            {editorialImage ? (
              <div className="relative min-h-[22rem] border-x border-line lg:min-h-[34rem]">
                <Image
                  src={editorialImage.src}
                  alt={editorialImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="media-cover"
                  style={{ objectPosition: editorialImage.focalPoint }}
                />
              </div>
            ) : null}
            {editorialDescription ? (
              <div className="flex items-end border-x border-t border-line p-6 lg:border-l-0 lg:p-10">
                <div>
                  <p className="kicker text-ice">Show archive / Sky Hook</p>
                  <p className="mt-6 max-w-xl text-xl leading-9 text-paper/80">{editorialDescription}</p>
                  {editorial?.links.length ? (
                    <div className="mt-8 flex flex-wrap gap-3">
                      {editorial.links.map((link) => (
                        <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="brutal-button">
                          {link.label[locale]} ↗
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section-frame">
        <div className="site-container grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <p className="kicker mb-5 text-ice">01 / {labels.setlist}</p>
            {songCount ? show.sets.map((set, setIndex) => (
              <div key={`${show.id}-${setIndex}`} className="mb-10 last:mb-0">
                {(set.name || set.encore) ? <p className="kicker mb-3 text-muted">{set.name || `${labels.encore} ${set.encore}`}</p> : null}
                <ol className="border-t border-line">
                  {set.songs.map((song, songIndex) => (
                    <li key={`${song.name}-${songIndex}`} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-4 sm:grid-cols-[3rem_1fr] sm:gap-4">
                      <span className="kicker text-muted">{String(songIndex + 1).padStart(2, "0")}</span>
                      <div>
                        <span className={`font-display text-xl uppercase ${song.tape ? "text-muted" : ""}`}>{song.name}</span>
                        {song.coverArtist ? <span className="ml-2 text-xs text-muted">({song.coverArtist})</span> : null}
                        {song.info ? <p className="mt-1 text-xs leading-5 text-muted">{song.info}</p> : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )) : <p className="border-y border-line py-8 text-muted">{labels.noSongs}</p>}
          </div>

          <aside>
            <p className="kicker mb-5 text-ice">02 / {labels.details}</p>
            <dl className="border-t border-line text-sm">
              <div className="border-b border-line py-4"><dt className="kicker text-muted">{labels.venue}</dt><dd className="mt-2 text-paper">{show.venue}</dd></div>
              <div className="border-b border-line py-4"><dt className="kicker text-muted">{labels.location}</dt><dd className="mt-2 text-paper">{locationName}</dd></div>
              {show.tour ? <div className="border-b border-line py-4"><dt className="kicker text-muted">Tour</dt><dd className="mt-2 text-paper">{show.tour}</dd></div> : null}
              {show.info ? <div className="border-b border-line py-4"><dd className="leading-6 text-muted">{show.info}</dd></div> : null}
            </dl>
            {show.sourceUrl ? <a href={show.sourceUrl} target="_blank" rel="noreferrer" className="brutal-button mt-6 w-full justify-between">{labels.source}: setlist.fm <span>↗</span></a> : null}
          </aside>
        </div>
      </section>
    </main>
  );
}
