import type { HomeBlock } from "@/content/home";
import { HeroBlock } from "./hero-block";
import { FeaturedReleaseBlock } from "./featured-release-block";
import { UpcomingShowsBlock } from "./upcoming-shows-block";
import { SplitMediaBlock } from "./split-media-block";

export function HomeBlockRenderer({ block }: { block: HomeBlock }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock imageId={block.imageId} />;
    case "featured-release":
      return <FeaturedReleaseBlock />;
    case "upcoming-shows":
      return <UpcomingShowsBlock limit={block.limit} />;
    case "split-media":
      return <SplitMediaBlock {...block} />;
  }
}
