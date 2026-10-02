"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Release } from "@/content/schemas";
import { localizedHref, type Locale } from "@/i18n/config";
import { ArtworkFrame } from "./artwork-frame";

type Filter = "all" | "album" | "ep" | "single";
type Sort = "newest" | "oldest" | "alphabetical";

type Labels = {
  explore: string;
  all: string;
  albums: string;
  eps: string;
  singles: string;
  sortBy: string;
  newest: string;
  oldest: string;
  alphabetical: string;
  released: string;
  artworkTbd: string;
  album: string;
  ep: string;
  single: string;
};

function releaseTimestamp(release: Release) {
  return release.releaseDate ? new Date(`${release.releaseDate}T00:00:00Z`).getTime() : Date.UTC(release.year, 0, 1);
}

export function ReleaseExplorer({ releases, locale, labels }: { releases: Release[]; locale: Locale; labels: Labels }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const visible = useMemo(() => {
    const filtered = filter === "all" ? [...releases] : releases.filter((release) => release.type === filter);
    return filtered.sort((a, b) => {
      if (sort === "alphabetical") return a.title.localeCompare(b.title);
      const delta = releaseTimestamp(b) - releaseTimestamp(a);
      return sort === "newest" ? delta : -delta;
    });
  }, [filter, releases, sort]);

  const filters: Array<{ key: Filter; label: string }> = [
    { key: "all", label: labels.all },
    { key: "album", label: labels.albums },
    { key: "ep", label: labels.eps },
    { key: "single", label: labels.singles },
  ];

  const sortOptions: Array<{ key: Sort; label: string }> = [
    { key: "newest", label: labels.newest },
    { key: "oldest", label: labels.oldest },
    { key: "alphabetical", label: labels.alphabetical },
  ];

  const selectedSort = sortOptions.find((item) => item.key === sort) ?? sortOptions[0];

  return (
    <section className="section-frame bg-paper text-background">
      <div className="site-container">
        <div className="grid gap-7 border-b border-background/20 pb-5 lg:grid-cols-[1fr_22rem] lg:items-end">
          <h2 className="font-display text-3xl uppercase md:text-4xl">{labels.explore}</h2>

          <div ref={sortRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              onClick={() => setSortOpen((value) => !value)}
              className="group grid w-full grid-cols-[1fr_auto] items-end border border-background/25 bg-paper px-4 py-3 text-left transition-colors hover:border-background/50"
            >
              <span>
                <span className="kicker block text-background/45">{labels.sortBy}</span>
                <span className="mt-1 block text-sm font-black uppercase tracking-[0.03em]">{selectedSort.label}</span>
              </span>
              <span
                className={`mb-0.5 text-sm transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              >
                ↓
              </span>
            </button>

            {sortOpen ? (
              <div
                role="listbox"
                aria-label={labels.sortBy}
                className="absolute inset-x-0 top-[calc(100%+0.35rem)] z-20 border border-background/25 bg-paper p-1 shadow-[0_18px_45px_rgba(5,6,11,0.22)]"
              >
                {sortOptions.map((item) => {
                  const active = item.key === sort;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setSort(item.key);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-3 text-left text-sm font-black uppercase transition-colors ${active ? "bg-background text-paper" : "text-background hover:bg-background/7"}`}
                    >
                      <span>{item.label}</span>
                      {active ? <span className="text-ice">●</span> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex gap-7 overflow-x-auto border-b border-background/20 py-5">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`kicker shrink-0 border-b pb-1 transition-colors ${filter === item.key ? "border-background text-background" : "border-transparent text-background/60 hover:text-background"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid gap-x-4 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((release) => {
            const featured = release.featured && filter === "all";
            return (
              <Link
                key={release.slug}
                href={localizedHref(locale, `/music/${release.slug}`)}
                className={`group block ${featured ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <ArtworkFrame artwork={release.artwork} title={release.title} placeholderLabel={labels.artworkTbd} />
                <div className="flex items-start justify-between gap-4 pt-3">
                  <div>
                    <p className="kicker text-background/50">{labels.released} {release.releaseDate ?? release.year}</p>
                    <h3 className={`mt-1 font-display uppercase leading-[1.05] transition-colors group-hover:text-electric ${featured ? "text-3xl md:text-5xl" : "text-xl md:text-2xl"}`}>{release.title}</h3>
                  </div>
                  <span className="kicker mt-1 shrink-0 text-background/45">{labels[release.type]}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
