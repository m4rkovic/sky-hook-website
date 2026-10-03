import { releaseSchema } from "./schemas";
import { songs } from "./songs";

export const releases = releaseSchema.array().parse([
  {
    slug: "gde-ptice-lete",
    title: "Gde ptice lete",
    type: "album",
    year: 2025,
    artwork: "/media/releases/gde-ptice-lete-album.webp",
    featured: true,
    releaseDate: "2025-04-04",
    label: "Pop Depresija / Zeleni Kačket",
    streaming: { bandcamp: "https://skyhooknis.bandcamp.com/album/gde-ptice-lete" },
    tracks: songs.map((song, index) => ({ number: index + 1, songSlug: song.slug, title: song.title, duration: song.duration })),
  },
  {
    slug: "gde-ptice-lete-single",
    title: "Gde ptice lete",
    type: "single",
    year: 2025,
    artwork: "/media/releases/gde-ptice-lete-single.webp",
  },
  {
    slug: "melburn",
    title: "Melburn",
    type: "single",
    year: 2025,
    artwork: "/media/releases/melburn.webp",
    streaming: { youtube: "https://www.youtube.com/watch?v=_UFk_n6rBOE" },
  },
  {
    slug: "surf",
    title: "Surf",
    type: "single",
    year: 2025,
    artwork: "/media/releases/surf.webp",
    streaming: { youtube: "https://www.youtube.com/watch?v=QvRKPd4Gk-k" },
  },
  { slug: "ostajem", title: "Ostajem", type: "single", year: 2025, artwork: "/media/releases/ostajem.webp" },
  { slug: "astra", title: "Astra", type: "single", year: 2025, artwork: "/media/releases/astra.webp" },
].map((release) => {
  if (release.type !== "single") return release;
  const song = songs.find((item) => item.slug === (release.slug === "gde-ptice-lete-single" ? "gde-ptice-lete" : release.slug));
  return { ...release, tracks: song ? [{ number: 1, songSlug: song.slug, title: song.title, duration: song.duration }] : [], credits: song?.credits ?? [] };
}));

export const featuredRelease = releases.find((release) => release.featured) ?? releases[0];

export function getRelease(slug: string) {
  return releases.find((release) => release.slug === slug);
}
