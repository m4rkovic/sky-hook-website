"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { mediaItems } from "@/content/media";
import { newsCategoryLabel, type NewsCategory, type NewsItem } from "@/content/news";
import type { Locale } from "@/i18n/config";

type Filter = "all" | NewsCategory;

type Labels = {
  all: string;
  interviews: string;
  press: string;
  live: string;
  readExternal: string;
  featured: string;
};

function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "sr" ? "sr-Latn-RS" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function NewsExplorer({
  items,
  locale,
  labels,
}: {
  items: NewsItem[];
  locale: Locale;
  labels: Labels;
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const filters: Array<{ key: Filter; label: string }> = [
    { key: "all", label: labels.all },
    { key: "interview", label: labels.interviews },
    { key: "press", label: labels.press },
    { key: "live", label: labels.live },
  ];

  const visible = useMemo(
    () =>
      (filter === "all" ? items : items.filter((item) => item.category === filter))
        .slice()
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [filter, items],
  );

  const featured = items.find((item) => item.featured);

  return (
    <div>
      {featured && filter === "all" ? (
        <a
          href={featured.url}
          target="_blank"
          rel="noreferrer"
          className="group grid overflow-hidden border border-line bg-surface lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="relative min-h-[22rem] border-b border-line lg:min-h-[34rem] lg:border-b-0 lg:border-r">
            {featured.imageId ? (() => {
              const image = mediaItems.find((item) => item.id === featured.imageId);
              return image ? (
                <Image
                  src={image.src}
                  alt={featured.imageUrl ? "" : image.alt}
                  fill
                  className="media-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ objectPosition: image.focalPoint }}
                />
              ) : null;
            })() : null}
            {featured.imageUrl ? (
              <img
                src={featured.imageUrl}
                alt=""
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 kicker text-paper/75">{labels.featured}</span>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted">
                <span className="text-ice">{featured.source}</span>
                <span>·</span>
                <span>{formatDate(featured.publishedAt, locale)}</span>
                <span>·</span>
                <span>{newsCategoryLabel(featured.category, locale)}</span>
              </div>
              <h2 className="mt-6 font-display text-4xl uppercase leading-[1.02] md:text-6xl">
                {featured.title}
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted">{featured.summary[locale]}</p>
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-line pt-5">
              <span className="kicker text-paper">{labels.readExternal}</span>
              <span className="text-2xl text-ice transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </div>
          </div>
        </a>
      ) : null}

      <div className="mt-12 flex gap-7 overflow-x-auto border-y border-line py-5">
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`kicker shrink-0 border-b pb-1 transition-colors ${filter === item.key ? "border-ice text-ice" : "border-transparent text-muted hover:text-paper"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid border-l border-t border-line md:grid-cols-2 xl:grid-cols-3">
        {visible
          .filter((item) => !(filter === "all" && item.featured))
          .map((item, index) => {
            const image = item.imageId ? mediaItems.find((media) => media.id === item.imageId) : undefined;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-[28rem] flex-col border-b border-r border-line"
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface-strong">
                  {image ? (
                    <Image
                      src={image.src}
                      alt={item.imageUrl ? "" : image.alt}
                      fill
                      className="media-cover transition-transform duration-500 group-hover:scale-[1.025]"
                      style={{ objectPosition: image.focalPoint }}
                    />
                  ) : null}
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                  ) : null}
                  <span className="absolute left-4 top-4 kicker text-paper/80">0{index + 1}</span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted">
                    <span className="text-ice">{item.source}</span>
                    <span>{formatDate(item.publishedAt, locale)}</span>
                    <span>{newsCategoryLabel(item.category, locale)}</span>
                  </div>

                  <h3 className="mt-5 font-display text-3xl uppercase leading-[1.05]">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-muted">{item.summary[locale]}</p>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-5">
                    <span className="kicker text-paper">{labels.readExternal}</span>
                    <span className="text-xl text-ice transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}
