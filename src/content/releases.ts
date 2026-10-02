import { releaseSchema } from "./schemas";

export const releases = releaseSchema.array().parse([
  {
    slug: "gde-ptice-lete",
    title: "Gde ptice lete",
    type: "album",
    year: 2025,
    featured: true,
  },
  {
    slug: "melburn",
    title: "Melburn",
    type: "single",
    year: 2025,
    streaming: { youtube: "https://www.youtube.com/watch?v=_UFk_n6rBOE" },
  },
  {
    slug: "surf",
    title: "Surf",
    type: "single",
    year: 2025,
    streaming: { youtube: "https://www.youtube.com/watch?v=QvRKPd4Gk-k" },
  },
  { slug: "ostajem", title: "Ostajem", type: "single", year: 2025 },
  { slug: "astra", title: "Astra", type: "single", year: 2025 },
]);

export const featuredRelease = releases.find((release) => release.featured) ?? releases[0];

export function getRelease(slug: string) {
  return releases.find((release) => release.slug === slug);
}
