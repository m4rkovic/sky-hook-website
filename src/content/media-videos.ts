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
    title: { en: "Sky Hook / Live 01", sr: "Sky Hook / Uživo 01" },
  },
  {
    id: "live-bxniviaxdcm",
    youtubeId: "bxnIviAxDcM",
    category: "live",
    title: { en: "Sky Hook / Live 02", sr: "Sky Hook / Uživo 02" },
  },
  {
    id: "live-3t8q2vaxip0",
    youtubeId: "3T8Q2vaXiP0",
    category: "live",
    title: { en: "Sky Hook / Live 03", sr: "Sky Hook / Uživo 03" },
  },
  {
    id: "video-ufkn6rboe",
    youtubeId: "_UFk_n6rBOE",
    category: "video",
    title: { en: "Sky Hook / Official video", sr: "Sky Hook / Spot" },
  },
  {
    id: "video-surf",
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
