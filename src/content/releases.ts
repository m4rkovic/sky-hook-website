import { releaseSchema } from "./schemas";

export const releases = releaseSchema.array().parse([
  {
    slug: "gde-ptice-lete",
    title: "Gde ptice lete",
    type: "album",
    year: 2025,
    artwork: "/media/releases/gde-ptice-lete-album.webp",
    featured: true,
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
]);

export const featuredRelease = releases.find((release) => release.featured) ?? releases[0];

export function getRelease(slug: string) {
  return releases.find((release) => release.slug === slug);
}
