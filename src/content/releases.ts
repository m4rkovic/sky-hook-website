import { releaseSchema } from "./schemas";
import { songs } from "./songs";
import { albumStreaming } from "./streaming";

export const releases = releaseSchema.array().parse([
  {
    slug: "gde-ptice-lete",
    title: "Gde ptice lete",
    type: "album",
    year: 2025,
    artwork: "/media/releases/gde-ptice-lete-album-7a36a4ff11.jpg",
    featured: true,
    releaseDate: "2025-04-04",
    label: "Pop Depresija / Zeleni Kačket",
    streaming: albumStreaming,
    tracks: songs.map((song, index) => ({ number: index + 1, songSlug: song.slug, title: song.title, duration: song.duration, streaming: song.streaming })),
  },
  {
    slug: "gde-ptice-lete-single",
    title: "Gde ptice lete",
    type: "single",
    year: 2025,
    artwork: "/media/releases/gde-ptice-lete-single-16c50684ac.jpg",
  },
  {
    slug: "melburn",
    title: "Melburn",
    type: "single",
    year: 2025,
    artwork: "/media/releases/melburn-5cffde8752.jpg",
  },
  {
    slug: "surf",
    title: "Surf",
    type: "single",
    year: 2025,
    artwork: "/media/releases/surf-977dd8d246.jpg",
  },
  { slug: "ostajem", title: "Ostajem", type: "single", year: 2025, artwork: "/media/releases/ostajem-03397bfd4b.jpg" },
  { slug: "astra", title: "Astra", type: "single", year: 2025, artwork: "/media/releases/astra-c5d8ff9432.jpg" },
].map((release) => {
  if (release.type !== "single") return release;
  const song = songs.find((item) => item.slug === (release.slug === "gde-ptice-lete-single" ? "gde-ptice-lete" : release.slug));
  return { ...release, streaming: song?.streaming ?? release.streaming ?? {}, tracks: song ? [{ number: 1, songSlug: song.slug, title: song.title, duration: song.duration, streaming: song.streaming }] : [], credits: song?.credits ?? [] };
}));

export const featuredRelease = releases.find((release) => release.featured) ?? releases[0];

export function getRelease(slug: string) {
  return releases.find((release) => release.slug === slug);
}
