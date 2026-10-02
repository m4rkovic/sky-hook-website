import Image from "next/image";
import Link from "next/link";
import { mediaItems } from "@/content/media";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function SplitMediaBlock({ imageId, href, locale, dict }: { imageId: string; href: string; locale: Locale; dict: Dictionary }) {
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
            <p className="kicker text-ice">05 / {dict.home.bandEyebrow}</p>
            <h2 className="display-title mt-5">{dict.home.bandHeading}</h2>
            <p className="mt-8 max-w-lg text-base leading-7 text-ice-light/75">{dict.home.bandBody}</p>
            <Link className="brutal-button mt-9" href={localizedHref(locale, href)}>{dict.home.bandCta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
