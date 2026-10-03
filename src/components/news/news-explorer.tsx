"use client";

import { useMemo, useState } from "react";
import { newsCategoryLabel, type NewsCategory, type NewsItem } from "@/content/news";
import type { Locale } from "@/i18n/config";
import { NewsImage } from "./news-image";

type Filter = "all" | NewsCategory;
type Labels = { all: string; interviews: string; press: string; live: string; readExternal: string; featured: string };

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sr" ? "sr-Latn-RS" : "en-GB", {
    day: "2-digit", month: "short", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function NewsExplorer({ items, locale, labels }: { items: NewsItem[]; locale: Locale; labels: Labels }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Array<{ key: Filter; label: string }> = [
    { key: "all", label: labels.all }, { key: "interview", label: labels.interviews },
    { key: "press", label: labels.press }, { key: "live", label: labels.live },
  ];
  const visible = useMemo(() => (filter === "all" ? items : items.filter((item) => item.category === filter))
    .slice().sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), [filter, items]);
  const featured = items.find((item) => item.featured);

  return (
    <div>
      {featured && filter === "all" ? (
        <a href={featured.url} target="_blank" rel="noreferrer"
          className="group grid items-center gap-7 pb-12 md:gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:pb-20">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-[3/2] lg:aspect-[4/3]">
              <NewsImage key={featured.id} item={featured} sizes="(min-width: 1024px) 55vw, 100vw" priority />
            </div>
            <p className="kicker mt-4 text-muted">{labels.featured} <span aria-hidden="true" className="ml-3 text-ice">—</span></p>
          </div>
          <div className="min-w-0 lg:py-6">
            <p className="kicker text-ice">{featured.source} / {newsCategoryLabel(featured.category, locale)}</p>
            <h2 className="mt-5 text-balance font-display text-[clamp(2rem,3.8vw,4.25rem)] leading-[1.08] tracking-tight transition-colors group-hover:text-ice">
              {featured.title}
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-muted">{featured.summary[locale]}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-10">
              <span className="inline-flex items-center gap-4 border-b border-paper/40 pb-2 text-sm font-semibold">
                {labels.readExternal}<span aria-hidden="true" className="text-ice transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1">↗</span>
              </span>
              <time dateTime={featured.publishedAt} className="text-xs text-muted">{formatDate(featured.publishedAt, locale)}</time>
            </div>
          </div>
        </a>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-7 gap-y-4 border-y border-paper/15 py-5" aria-label={locale === "sr" ? "Kategorije vesti" : "News categories"}>
        {filters.map((item) => (
          <button key={item.key} type="button" onClick={() => setFilter(item.key)} aria-pressed={filter === item.key}
            className={`kicker inline-flex min-h-8 items-center gap-2 border-b pb-1 transition-colors ${filter === item.key ? "border-ice text-paper" : "border-transparent text-muted hover:text-paper"}`}>
            {item.label}<span className="text-[0.6rem] text-muted">{item.key === "all" ? items.length : items.filter((entry) => entry.category === item.key).length}</span>
          </button>
        ))}
      </div>

      <div className="divide-y divide-paper/15">
        {visible.filter((item) => !(filter === "all" && item.id === featured?.id)).map((item) => (
          <article key={item.id}>
            <a href={item.url} target="_blank" rel="noreferrer"
              className="group grid gap-5 py-8 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-8 lg:grid-cols-[8rem_minmax(0,0.8fr)_minmax(0,1.8fr)] lg:gap-10 lg:py-10">
              <div className="hidden pt-1 lg:block">
                <time dateTime={item.publishedAt} className="text-sm text-muted">{formatDate(item.publishedAt, locale)}</time>
                <p className="kicker mt-3 text-ice/70">{newsCategoryLabel(item.category, locale)}</p>
              </div>
              <div className="relative aspect-[3/2] self-start overflow-hidden bg-surface">
                <NewsImage key={item.id} item={item} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 35vw, 100vw" />
              </div>
              <div className="min-w-0 self-center">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="kicker text-ice">{item.source}</span>
                  <time dateTime={item.publishedAt} className="text-xs text-muted lg:hidden">{formatDate(item.publishedAt, locale)}</time>
                </div>
                <h3 className="mt-3 max-w-3xl text-pretty font-display text-2xl leading-[1.18] transition-colors group-hover:text-ice md:text-3xl lg:text-[2rem]">{item.title}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{item.summary[locale]}</p>
                <span className="mt-5 inline-flex items-center gap-3 text-xs font-semibold text-paper/80">
                  {labels.readExternal}<span aria-hidden="true" className="text-ice transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1">↗</span>
                </span>
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
