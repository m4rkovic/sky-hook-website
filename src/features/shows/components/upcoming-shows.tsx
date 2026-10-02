"use client";

import { useMemo } from "react";
import type { Show } from "@/content/schemas";
import { siteConfig } from "@/content/site";
import { intlLocale, type Locale } from "@/i18n/config";
import { useShows } from "../use-shows";

type Labels = {
  tickets: string;
  details: string;
  tba: string;
  loading: string;
  empty: string;
  emptyHint: string;
  followInstagram: string;
};

function formatDate(datetime: string, locale: Locale) {
  const date = new Date(datetime);
  const formatterLocale = intlLocale(locale);
  return {
    day: new Intl.DateTimeFormat(formatterLocale, { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat(formatterLocale, { month: "short" }).format(date).replace(".", "").toUpperCase(),
    year: new Intl.DateTimeFormat(formatterLocale, { year: "numeric" }).format(date),
  };
}

function ShowRow({ show, locale, labels }: { show: Show; locale: Locale; labels: Labels }) {
  const date = formatDate(show.datetime, locale);
  const detailsUrl = show.ticketUrl ?? show.eventUrl;

  return (
    <article className="grid grid-cols-[4rem_1fr] gap-x-4 gap-y-4 border-t border-line py-5 sm:grid-cols-[4.5rem_1fr_auto] sm:items-center md:grid-cols-[7rem_1fr_1fr_auto]">
      <div className="font-display uppercase leading-none">
        <div className="text-3xl text-ice">{date.day}</div>
        <div className="text-xs font-bold tracking-[0.14em] text-muted">{date.month} {date.year}</div>
      </div>
      <div>
        <h3 className="font-display text-xl uppercase md:text-2xl">{show.venue}</h3>
        <p className="mt-1 text-sm text-muted md:hidden">{show.city}</p>
      </div>
      <div className="hidden text-sm text-muted md:block">{[show.city, show.region, show.country].filter(Boolean).join(", ")}</div>
      {detailsUrl ? (
        <a className="brutal-button col-span-2 w-full sm:col-span-1 sm:w-auto" href={detailsUrl} target="_blank" rel="noreferrer">{show.ticketUrl ? labels.tickets : labels.details}</a>
      ) : <span className="kicker col-span-2 text-muted sm:col-span-1">{labels.tba}</span>}
    </article>
  );
}

export function UpcomingShows({ limit, locale, labels }: { limit?: number; locale: Locale; labels: Labels }) {
  const { shows, loading } = useShows();
  const visibleShows = useMemo(() => (limit ? shows.slice(0, limit) : shows), [limit, shows]);
  if (loading) return <div className="border-t border-line py-8 text-sm uppercase tracking-[0.14em] text-muted">{labels.loading}</div>;
  if (visibleShows.length === 0) {
    return (
      <div className="border-y border-line py-8">
        <p className="font-display text-2xl uppercase">{labels.empty}</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{labels.emptyHint}</p>
        {siteConfig.socials.instagram ? (
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noreferrer"
            className="brutal-button mt-6"
          >
            {labels.followInstagram} ↗
          </a>
        ) : null}
      </div>
    );
  }
  return <div>{visibleShows.map((show) => <ShowRow key={show.id} show={show} locale={locale} labels={labels} />)}</div>;
}
