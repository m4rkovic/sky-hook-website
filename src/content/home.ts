export type HomeBlock =
  | { type: "hero"; imageId: string }
  | { type: "featured-release" }
  | { type: "upcoming-shows"; limit: number }
  | { type: "split-media"; imageId: string; href: string };

export const homeBlocks: HomeBlock[] = [
  { type: "hero", imageId: "live-02" },
  { type: "featured-release" },
  { type: "upcoming-shows", limit: 4 },
  { type: "split-media", imageId: "live-01", href: "/band" },
];
