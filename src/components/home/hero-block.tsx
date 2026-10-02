import Image from "next/image";
import { mediaItems } from "@/content/media";

export function HeroBlock({ imageId }: { imageId: string }) {
  const image = mediaItems.find((item) => item.id === imageId);
  if (!image) return null;

  return (
    <section className="poster-noise relative min-h-[72svh] overflow-hidden border-b border-line pt-[var(--sh-header-h)] md:min-h-[88svh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="media-cover"
        style={{ objectPosition: image.focalPoint }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,6,11,.22),rgba(5,6,11,.12)_40%,rgba(5,6,11,.86))]" />
      <div className="site-container absolute inset-x-0 bottom-0 z-10 pb-7 md:pb-10">
        <div className="flex items-end justify-between border-t border-white/25 pt-4">
          <span className="kicker">Sky Hook</span>
          <span className="kicker text-white/65">Hero treatment intentionally open</span>
        </div>
      </div>
    </section>
  );
}
