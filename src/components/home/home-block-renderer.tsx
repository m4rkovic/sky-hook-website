import type { HomeBlock } from "@/content/home";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { HeroBlock } from "./hero-block";
import { FeaturedReleaseBlock } from "./featured-release-block";
import { UpcomingShowsBlock } from "./upcoming-shows-block";
import { SplitMediaBlock } from "./split-media-block";

export function HomeBlockRenderer({ block, locale, dict }: { block: HomeBlock; locale: Locale; dict: Dictionary }) {
  switch (block.type) {
    case "hero":
      return <HeroBlock imageId={block.imageId} label={dict.home.officialWebsite} />;
    case "featured-release":
      return <FeaturedReleaseBlock locale={locale} dict={dict} />;
    case "upcoming-shows":
      return <UpcomingShowsBlock limit={block.limit} locale={locale} dict={dict} />;
    case "split-media":
      return <SplitMediaBlock {...block} locale={locale} dict={dict} />;
  }
}
