import type { Locale } from "@/i18n/config";

export type MediaVideoCategory = "live" | "video";

export type MediaVideo = {
  id: string;
  youtubeId: string;
  category: MediaVideoCategory;
  title: Record<Locale, string>;
};

export const mediaVideos: MediaVideo[] = [
  {
    id: "live-cx2pbneaco4",
    youtubeId: "CX2PBNEAco4",
    category: "live",
    title: { en: "Dolazim Ponovo / Live", sr: "Dolazim Ponovo / Uživo" },
  },
  {
    id: "live-bxniviaxdcm",
    youtubeId: "bxnIviAxDcM",
    category: "live",
    title: { en: "Surf / Live", sr: "Surf / Uživo" },
  },
  {
    id: "live-3t8q2vaxip0",
    youtubeId: "3T8Q2vaXiP0",
    category: "live",
    title: { en: "Astra / Live", sr: "Astra / Uživo" },
  },
  {
    id: "video-ufkn6rboe",
    youtubeId: "_UFk_n6rBOE",
    category: "video",
    title: { en: "Melburn / Official video", sr: "Melburn / Spot" },
  },
  {
    id: "video-qvrkpd4gkk",
    youtubeId: "QvRKPd4Gk-k",
    category: "video",
    title: { en: "Surf / Official video", sr: "Surf / Spot" },
  },
];

export function youtubeWatchUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function youtubeEmbedUrl(youtubeId: string) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
}

export function youtubeThumbnailUrl(youtubeId: string) {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}
