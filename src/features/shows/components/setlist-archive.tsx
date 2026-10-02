"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { archiveShowSchema, liveStatsSchema, type ArchiveShow, type LiveStats } from "@/content/schemas";
import { localizedHref, intlLocale, type Locale } from "@/i18n/config";
import { showSlug } from "@/content/show-utils";

type Labels = {
  loading: string;
  unavailable: string;
  statsTitle: string;
  shows: string;
  cities: string;
  countries: string;
  uniqueSongs: string;
  topSongs: string;
  performances: string;
  allYears: string;
  setlist: string;
  noSetlist: string;
  attribution: string;
};

type State = { loading: boolean; shows: ArchiveShow[]; stats: LiveStats | null; error: boolean; errorCode?: string };

function formatDate(dateValue: string, locale: Locale) {
  const date = new Date(`${dateValue}T00:00:00Z`);
  return new Intl.DateTimeFormat(intlLocale(locale), { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function songCount(show: ArchiveShow) {
  return show.sets.reduce((sum, set) => sum + set.songs.filter((song) => !song.tape).length, 0);
}

export function SetlistArchive({ locale, labels }: { locale: Locale; labels: Labels }) {
  const [state, setState] = useState<State>({ loading: true, shows: [], stats: null, error: false });
  const [year, setYear] = useState("all");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/shows/archive", { signal: controller.signal });
        const payload = await response.json() as { shows?: unknown; stats?: unknown; error?: string };
        if (!response.ok) {
          setState({ loading: false, shows: [], stats: null, error: true, errorCode: payload.error });
          return;
        }
        const shows = archiveShowSchema.array().parse(payload.shows ?? []);
        const stats = liveStatsSchema.parse(payload.stats);
        setState({ loading: false, shows, stats, error: false });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ loading: false, shows: [], stats: null, error: true, errorCode: "unavailable" });
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  const years = useMemo(() => [...new Set(state.shows.map((show) => show.date.slice(0, 4)))].sort((a, b) => Number(b) - Number(a)), [state.shows]);
  const visible = useMemo(() => year === "all" ? state.shows : state.shows.filter((show) => show.date.startsWith(year)), [state.shows, year]);

  if (state.loading) return <div className="border-t border-line py-8 text-sm uppercase tracking-[0.14em] text-muted">{labels.loading}</div>;
  if (state.error) {
    return (
      <div className="border-t border-line py-8">
        <p className="text-sm uppercase tracking-[0.14em] text-muted">{labels.unavailable}</p>
        {state.errorCode === "not-configured" ? (
          <p className="mt-3 max-w-2xl text-xs leading-6 text-muted/70">
            setlist.fm API key is missing. Add SETLISTFM_API_KEY to .env.local and restart the dev server.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      {state.stats ? (
        <section className="mb-14">
          <p className="kicker mb-5 text-ice">{labels.statsTitle}</p>
          <div className="border-y border-line">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              [labels.shows, state.stats.totalShows],
              [labels.cities, state.stats.cities],
              [labels.countries, state.stats.countries],
              [labels.uniqueSongs, state.stats.uniqueSongs],
            ].map(([label, value], index) => (
              <div key={String(label)} className={`px-4 py-5 ${index % 2 === 0 ? "border-r border-line" : ""} ${index < 2 ? "border-b border-line" : ""} md:border-b-0 ${index < 3 ? "md:border-r" : ""}`}>
                <div className="font-display text-4xl text-ice md:text-5xl">{value}</div>
                <div className="kicker mt-2 text-muted">{label}</div>
              </div>
            ))}
          </div>
          {state.stats.topSongs.length ? (
            <div className="grid border-t border-line md:grid-cols-[14rem_1fr]">
              <div className="p-5"><p className="kicker text-ice">{labels.topSongs}</p></div>
              <div>
                {state.stats.topSongs.map((song, index) => (
                  <div key={song.name} className="grid grid-cols-[3rem_1fr_auto] gap-4 border-b border-line px-5 py-3 last:border-b-0">
                    <span className="kicker text-muted">{String(index + 1).padStart(2, "0")}</span>
                    <span className="font-display uppercase">{song.name}</span>
                    <span className="text-xs text-muted">{song.performances} {labels.performances}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          </div>
        </section>
      ) : null}

      <div className="mb-6 flex items-end justify-end gap-4">
        <label className="border border-line px-3 py-2">
          <span className="sr-only">Year</span>
          <select className="bg-transparent text-xs font-black uppercase tracking-[0.12em] outline-none" value={year} onChange={(event) => setYear(event.target.value)}>
            <option value="all">{labels.allYears}</option>
            {years.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="border-t border-line">
        {visible.map((show) => {
          const count = songCount(show);
          return (
            <details key={show.id} className="group border-b border-line">
              <summary className="grid cursor-pointer list-none gap-2 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-center md:grid-cols-[8rem_1fr_1fr_auto]">
                <span className="kicker text-ice">{formatDate(show.date, locale)}</span>
                <span className="font-display text-xl uppercase md:text-2xl">{show.venue}</span>
                <span className="text-sm text-muted sm:col-start-2 md:col-start-auto">{[show.city, show.region, show.country].filter(Boolean).join(", ")}</span>
                <span className="flex items-center gap-4 sm:col-start-3 sm:row-span-2 sm:row-start-1 md:col-start-auto md:row-span-1">
                  <Link
                    href={localizedHref(locale, `/live/${showSlug(show)}`)}
                    onClick={(event) => event.stopPropagation()}
                    className="kicker text-ice hover:text-paper"
                  >
                    {labels.setlist} ↗
                  </Link>
                  <span className="kicker text-muted">{count ? count : "+"}</span>
                </span>
              </summary>
              <div className="grid gap-8 border-t border-line bg-surface px-4 py-7 md:grid-cols-[1fr_14rem] md:px-6">
                <div>
                  {count ? show.sets.map((set, setIndex) => (
                    <div key={`${show.id}-${setIndex}`} className="mb-7 last:mb-0">
                      {(set.name || set.encore) ? <p className="kicker mb-3 text-muted">{set.name || `Encore ${set.encore}`}</p> : null}
                      <ol className="border-t border-line">
                        {set.songs.map((song, songIndex) => (
                          <li key={`${song.name}-${songIndex}`} className="grid grid-cols-[3rem_1fr] gap-3 border-b border-line py-3">
                            <span className="kicker text-muted">{String(songIndex + 1).padStart(2, "0")}</span>
                            <div>
                              <span className={`font-display text-lg uppercase ${song.tape ? "text-muted" : ""}`}>{song.name}</span>
                              {song.coverArtist ? <span className="ml-2 text-xs text-muted">({song.coverArtist})</span> : null}
                              {song.info ? <p className="mt-1 text-xs text-muted">{song.info}</p> : null}
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )) : <p className="text-sm text-muted">{labels.noSetlist}</p>}
                </div>
                <div className="text-sm text-muted">
                  {show.tour ? <p className="mb-4"><span className="kicker block mb-1">Tour</span>{show.tour}</p> : null}
                  {show.info ? <p className="mb-4 leading-6">{show.info}</p> : null}
                  {show.sourceUrl ? <a href={show.sourceUrl} target="_blank" rel="noreferrer" className="kicker text-ice hover:text-paper">setlist.fm ↗</a> : null}
                </div>
              </div>
            </details>
          );
        })}
      </div>
      {state.shows.some((show) => show.sourceUrl) ? <a href="https://www.setlist.fm/" target="_blank" rel="noreferrer" className="mt-6 inline-block text-xs text-muted hover:text-ice">{labels.attribution} ↗</a> : null}
    </div>
  );
}
