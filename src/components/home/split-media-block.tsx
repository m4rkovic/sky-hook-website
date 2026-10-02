import Image from "next/image";
import Link from "next/link";
import { mediaItems } from "@/content/media";

export function SplitMediaBlock({ imageId, heading, body, href, cta }: { imageId: string; heading: string; body: string; href: string; cta: string }) {
  const image = mediaItems.find((item) => item.id === imageId);
  if (!image) return null;

  return (
    <section className="border-t border-line bg-surface-strong">
      <div className="grid min-h-[40rem] lg:grid-cols-2">
        <div className="relative min-h-[28rem] overflow-hidden border-b border-line lg:min-h-full lg:border-b-0 lg:border-r">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="media-cover" style={{ objectPosition: image.focalPoint }} />
        </div>
        <div className="flex items-end p-[var(--sh-gutter)] py-[var(--sh-section-y)]">
          <div className="max-w-xl">
            <p className="kicker text-ice">03 / Band</p>
            <h2 className="display-title mt-5">{heading}</h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-ice-light/75">{body}</p>
            <Link className="brutal-button mt-9" href={href}>{cta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
