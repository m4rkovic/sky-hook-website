"use client";

import { useMemo } from "react";
import type { Show } from "@/content/schemas";
import { useShows } from "../use-shows";

function formatDate(datetime: string) {
  const date = new Date(datetime);
  return {
    day: new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en", { month: "short" }).format(date).toUpperCase(),
    year: new Intl.DateTimeFormat("en", { year: "numeric" }).format(date),
  };
}

function ShowRow({ show }: { show: Show }) {
  const date = formatDate(show.datetime);
  const detailsUrl = show.ticketUrl ?? show.eventUrl;

  return (
    <article className="grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 border-t border-line py-5 md:grid-cols-[7rem_1fr_1fr_auto]">
      <div className="font-display uppercase leading-none">
        <div className="text-3xl font-black text-ice">{date.day}</div>
        <div className="text-xs font-bold tracking-[0.14em] text-muted">{date.month} {date.year}</div>
      </div>
      <div>
        <h3 className="font-display text-xl font-black uppercase md:text-2xl">{show.venue}</h3>
        <p className="mt-1 text-sm text-muted md:hidden">{show.city}</p>
      </div>
      <div className="hidden text-sm text-muted md:block">
        {[show.city, show.region, show.country].filter(Boolean).join(", ")}
      </div>
      {detailsUrl ? (
        <a className="brutal-button" href={detailsUrl} target="_blank" rel="noreferrer">
          {show.ticketUrl ? "Tickets" : "Details"}
        </a>
      ) : (
        <span className="kicker text-muted">TBA</span>
      )}
    </article>
  );
}

export function UpcomingShows({ limit }: { limit?: number }) {
  const { shows, loading } = useShows();
  const visibleShows = useMemo(() => (limit ? shows.slice(0, limit) : shows), [limit, shows]);

  if (loading) {
    return <div className="border-t border-line py-8 text-sm uppercase tracking-[0.14em] text-muted">Loading dates…</div>;
  }

  if (visibleShows.length === 0) {
    return <div className="border-t border-line py-8 text-sm uppercase tracking-[0.14em] text-muted">No upcoming shows announced.</div>;
  }

  return <div>{visibleShows.map((show) => <ShowRow key={show.id} show={show} />)}</div>;
}
