import { HomeBlockRenderer } from "@/components/home/home-block-renderer";
import { homeBlocks } from "@/content/home";

export default function HomePage() {
  return <main>{homeBlocks.map((block, index) => <HomeBlockRenderer key={`${block.type}-${index}`} block={block} />)}</main>;
}
