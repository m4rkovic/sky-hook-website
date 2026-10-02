"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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

  return (
    <section className="section-frame bg-paper text-background">
      <div className="site-container">
        <div className="grid gap-7 border-b border-background/20 pb-5 lg:grid-cols-[1fr_22rem] lg:items-end">
          <h2 className="font-display text-3xl font-black uppercase tracking-[-0.03em] md:text-4xl">{labels.explore}</h2>
          <label className="grid border border-background/30 bg-paper px-4 py-3">
            <span className="kicker mb-1 text-background/55">{labels.sortBy}</span>
            <select className="w-full appearance-none bg-transparent text-sm font-black uppercase outline-none" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
              <option value="newest">{labels.newest}</option>
              <option value="oldest">{labels.oldest}</option>
              <option value="alphabetical">{labels.alphabetical}</option>
            </select>
          </label>
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

        <div className="grid gap-x-3 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((release) => (
            <Link key={release.slug} href={localizedHref(locale, `/music/${release.slug}`)} className="group block">
              <ArtworkFrame artwork={release.artwork} title={release.title} placeholderLabel={labels.artworkTbd} />
              <div className="pt-3">
                <p className="kicker text-background/50">{labels.released} {release.releaseDate ?? release.year}</p>
                <h3 className="mt-1 font-display text-xl font-black uppercase leading-[1.05] tracking-[-0.02em] transition-colors group-hover:text-electric md:text-2xl">{release.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-background/55">{labels[release.type]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
