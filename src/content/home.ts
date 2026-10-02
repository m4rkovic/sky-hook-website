export type HomeBlock =
  | { type: "hero"; imageId: string }
  | { type: "featured-release" }
  | { type: "upcoming-shows"; limit: number }
  | { type: "split-media"; imageId: string; heading: string; body: string; href: string; cta: string };

// Homepage is composition, not hard-coded JSX order.
export const homeBlocks: HomeBlock[] = [
  { type: "hero", imageId: "live-02" },
  { type: "featured-release" },
  { type: "upcoming-shows", limit: 4 },
  {
    type: "split-media",
    imageId: "live-01",
    heading: "Sky Hook",
    body: "Band page content is intentionally separated from layout so the story can evolve without redesigning the site.",
    href: "/band",
    cta: "Band",
  },
];
