import Link from "next/link";
import { mediaVideos, youtubeThumbnailUrl, youtubeWatchUrl } from "@/content/media-videos";
import { localizedHref, type Locale } from "@/i18n/config";

export function SelectedMediaBlock({ videoIds, locale }: { videoIds: string[]; locale: Locale }) {
  const videos = videoIds.map((id) => mediaVideos.find((video) => video.id === id)).filter(Boolean);
  if (!videos.length) return null;

  const labels = locale === "sr"
    ? { eyebrow: "Odabrani media", title: "Gledaj Sky Hook", all: "Svi video materijali", watch: "Gledaj" }
    : { eyebrow: "Selected media", title: "Watch Sky Hook", all: "All media", watch: "Watch" };

  return (
    <section className="section-frame bg-surface">
      <div className="site-container">
        <div className="mb-8 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-ice">03 / {labels.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl uppercase md:text-7xl">{labels.title}</h2>
          </div>
          <Link href={localizedHref(locale, "/media")} className="kicker text-muted hover:text-ice">{labels.all} →</Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {videos.map((video) => video ? (
            <a key={video.id} href={youtubeWatchUrl(video.youtubeId)} target="_blank" rel="noreferrer" className="group border border-line bg-background">
              <div className="relative aspect-video overflow-hidden">
                <img src={youtubeThumbnailUrl(video.youtubeId)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/5" />
                <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-black/35">▶</span>
              </div>
              <div className="flex items-end justify-between gap-4 p-4">
                <h3 className="font-display text-2xl uppercase">{video.title[locale]}</h3>
                <span className="kicker text-muted">{labels.watch} ↗</span>
              </div>
            </a>
          ) : null)}
        </div>
      </div>
    </section>
  );
}
