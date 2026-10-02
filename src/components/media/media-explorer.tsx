"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { mediaItems } from "@/content/media";
import { mediaVideos, youtubeEmbedUrl, youtubeThumbnailUrl } from "@/content/media-videos";
import type { Locale } from "@/i18n/config";

type Filter = "all" | "live" | "video" | "artwork" | "press";

export function MediaExplorer({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const labels = locale === "sr"
    ? { all: "Sve", live: "Live", video: "Video", artwork: "Omoti", press: "Press", close: "Zatvori", play: "Pusti video", previous: "Prethodno", next: "Sledeće" }
    : { all: "All", live: "Live", video: "Video", artwork: "Artwork", press: "Press", close: "Close", play: "Play video", previous: "Previous", next: "Next" };

  const photoItems = useMemo(() => mediaItems.filter((item) => item.type === "photo"), []);
  const visibleVideos = filter === "all" ? mediaVideos : mediaVideos.filter((item) => item.category === filter);
  const visiblePhotos = filter === "all" ? photoItems : photoItems.filter((item) => item.category === filter);
  const availableFilters = (["all", "live", "video", "artwork", "press"] as Filter[]).filter((item) => {
    if (item === "all") return true;
    if (item === "video") return mediaVideos.some((video) => video.category === "video");
    if (item === "live") return mediaVideos.some((video) => video.category === "live") || photoItems.some((photo) => photo.category === "live");
    return photoItems.some((photo) => photo.category === item);
  });

  const activePhotoItem = activePhoto ? photoItems.find((item) => item.id === activePhoto) : undefined;
  const activeVideoItem = activeVideo ? mediaVideos.find((item) => item.id === activeVideo) : undefined;
  const modalOpen = Boolean(activePhotoItem || activeVideoItem);

  function closeModal() {
    setActiveVideo(null);
    setActivePhoto(null);
  }

  function stepVideo(direction: number) {
    if (!activeVideoItem) return;
    const index = mediaVideos.findIndex((item) => item.id === activeVideoItem.id);
    const next = mediaVideos[(index + direction + mediaVideos.length) % mediaVideos.length];
    setActiveVideo(next.id);
  }

  function stepPhoto(direction: number) {
    if (!activePhotoItem || !photoItems.length) return;
    const index = photoItems.findIndex((item) => item.id === activePhotoItem.id);
    const next = photoItems[(index + direction + photoItems.length) % photoItems.length];
    setActivePhoto(next.id);
  }

  useEffect(() => {
    if (!modalOpen) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") activeVideoItem ? stepVideo(-1) : stepPhoto(-1);
      if (event.key === "ArrowRight") activeVideoItem ? stepVideo(1) : stepPhoto(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [modalOpen, activeVideoItem, activePhotoItem]);

  return (
    <>
      <section className="section-frame">
        <div className="site-container">
          <div className="mb-8 flex flex-wrap gap-2">
            {availableFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`brutal-button ${filter === item ? "bg-paper text-background" : ""}`}
                aria-pressed={filter === item}
              >
                {labels[item]}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleVideos.map((video, index) => (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveVideo(video.id)}
                className={`group relative overflow-hidden border border-line bg-surface text-left ${index === 0 && filter === "all" ? "md:col-span-2 xl:col-span-2" : ""}`}
              >
                <div className="relative aspect-video overflow-hidden bg-background">
                  <img
                    src={youtubeThumbnailUrl(video.youtubeId)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
                  <span className="absolute left-4 top-4 kicker bg-background/80 px-2 py-1 text-paper backdrop-blur-sm">
                    {video.category === "live" ? "Live" : "Video"}
                  </span>
                  <span className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-black/35 text-xl backdrop-blur-sm">
                    ▶
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 p-4">
                  <h2 className="font-display text-2xl uppercase">{video.title[locale]}</h2>
                  <span className="kicker shrink-0 text-muted">{labels.play}</span>
                </div>
              </button>
            ))}

            {visiblePhotos.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActivePhoto(item.id)}
                className={`group relative overflow-hidden border border-line bg-surface ${index % 3 === 0 ? "md:row-span-2" : ""}`}
              >
                <div className={`relative ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-[3/2]"}`}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="media-cover transition-transform duration-300 group-hover:scale-[1.015]"
                    style={{ objectPosition: item.focalPoint }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeVideoItem ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-8" role="dialog" aria-modal="true" aria-label={activeVideoItem.title[locale]} onClick={closeModal}>
          <button ref={closeRef} type="button" onClick={closeModal} className="absolute right-4 top-4 z-20 brutal-button bg-background md:right-6 md:top-6">
            {labels.close} ×
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); stepVideo(-1); }} className="absolute bottom-4 left-4 z-20 brutal-button bg-background md:bottom-auto md:top-1/2 md:-translate-y-1/2" aria-label={labels.previous}>←</button>
          <button type="button" onClick={(event) => { event.stopPropagation(); stepVideo(1); }} className="absolute bottom-4 right-4 z-20 brutal-button bg-background md:bottom-auto md:top-1/2 md:-translate-y-1/2" aria-label={labels.next}>→</button>
          <div className="w-full max-w-6xl border border-line bg-black" onClick={(event) => event.stopPropagation()}>
            <div className="aspect-video">
              <iframe
                src={youtubeEmbedUrl(activeVideoItem.youtubeId)}
                title={activeVideoItem.title[locale]}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="border-t border-line px-4 py-3">
              <p className="font-display text-lg uppercase">{activeVideoItem.title[locale]}</p>
            </div>
          </div>
        </div>
      ) : null}

      {activePhotoItem ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 md:p-8" role="dialog" aria-modal="true" aria-label={activePhotoItem.alt} onClick={closeModal}>
          <button ref={closeRef} type="button" onClick={closeModal} className="absolute right-4 top-4 z-20 brutal-button bg-background md:right-6 md:top-6">
            {labels.close} ×
          </button>
          {photoItems.length > 1 ? (
            <>
              <button type="button" onClick={(event) => { event.stopPropagation(); stepPhoto(-1); }} className="absolute bottom-4 left-4 z-20 brutal-button bg-background md:bottom-auto md:top-1/2 md:-translate-y-1/2" aria-label={labels.previous}>←</button>
              <button type="button" onClick={(event) => { event.stopPropagation(); stepPhoto(1); }} className="absolute bottom-4 right-4 z-20 brutal-button bg-background md:bottom-auto md:top-1/2 md:-translate-y-1/2" aria-label={labels.next}>→</button>
            </>
          ) : null}
          <div className="relative h-[78vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={activePhotoItem.src} alt={activePhotoItem.alt} fill sizes="100vw" className="object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
