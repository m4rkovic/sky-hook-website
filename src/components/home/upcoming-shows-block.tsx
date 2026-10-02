import Link from "next/link";
import { UpcomingShows } from "@/features/shows/components/upcoming-shows";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function UpcomingShowsBlock({ limit, locale, dict }: { limit: number; locale: Locale; dict: Dictionary }) {
  return (
    <section className="section-frame bg-background">
      <div className="site-container">
        <div className="mb-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-ice">02 / {dict.nav.live}</p>
            <h2 className="font-display mt-3 text-4xl uppercase md:text-7xl">{dict.home.upcomingShows}</h2>
          </div>
          <Link className="kicker text-muted hover:text-ice" href={localizedHref(locale, "/live")}>{dict.home.allDates} →</Link>
        </div>
        <UpcomingShows limit={limit} locale={locale} labels={{ tickets: dict.common.tickets, details: dict.common.details, tba: dict.common.tba, loading: dict.common.loading, empty: dict.live.noUpcoming }} />
      </div>
    </section>
  );
}
