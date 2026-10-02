import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SetlistArchive } from "@/features/shows/components/setlist-archive";
import { UpcomingShows } from "@/features/shows/components/upcoming-shows";
import { fetchBandsintownShows } from "@/features/shows/providers/bandsintown.server";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return { title: "Live" };
  const locale = rawLocale as Locale;
  const description = locale === "sr"
    ? "Predstojeći i prethodni Sky Hook nastupi, setliste i live arhiva."
    : "Upcoming and past Sky Hook shows, setlists and live archive.";
  return {
    title: "Live",
    description,
    alternates: {
      canonical: `/${locale}/live`,
      languages: { en: "/en/live", sr: "/sr/live", "x-default": "/en/live" },
    },
  };
}

export default async function LivePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  let upcoming = [];
  try {
    upcoming = await fetchBandsintownShows();
  } catch {
    upcoming = [];
  }

  const eventJsonLd = upcoming.map((show) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: show.title || `Sky Hook at ${show.venue}`,
    startDate: show.datetime,
    eventStatus: "https://schema.org/EventScheduled",
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
    ...(show.ticketUrl ? { offers: { "@type": "Offer", url: show.ticketUrl, availability: "https://schema.org/InStock" } } : {}),
    ...(show.eventUrl ? { url: show.eventUrl } : siteUrl ? { url: `${siteUrl}/${locale}/live` } : {}),
  }));

  return (
    <PageShell eyebrow={dict.live.eyebrow} title={dict.live.title}>
      {eventJsonLd.length ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      ) : null}
      <section className="section-frame">
        <div className="site-container">
          <p className="kicker mb-4 text-ice">01 / {dict.live.upcoming}</p>
          <h2 className="font-display mb-9 text-4xl font-black uppercase md:text-6xl">{dict.live.upcoming}</h2>
          <UpcomingShows
            locale={locale}
            labels={{
              tickets: dict.common.tickets,
              details: dict.common.details,
              tba: dict.common.tba,
              loading: dict.common.loading,
              empty: dict.live.noUpcoming,
              emptyHint: dict.live.noUpcomingHint,
              followInstagram: dict.live.followInstagram,
            }}
          />
        </div>
      </section>

      <section className="section-frame bg-surface/40">
        <div className="site-container">
          <p className="kicker mb-4 text-ice">02 / {dict.live.archive}</p>
          <h2 className="font-display mb-9 text-4xl font-black uppercase md:text-6xl">{dict.live.archive}</h2>
          <SetlistArchive locale={locale} labels={{ loading: dict.live.archiveLoading, unavailable: dict.live.archiveUnavailable, statsTitle: dict.live.documentedStats, shows: dict.live.documentedShows, cities: dict.live.cities, countries: dict.live.countries, uniqueSongs: dict.live.uniqueSongs, topSongs: dict.live.topSongs, performances: dict.live.performances, allYears: dict.live.allYears, setlist: dict.live.setlist, noSetlist: dict.live.noSetlist, attribution: dict.live.attribution }} />
        </div>
      </section>
    </PageShell>
  );
}
