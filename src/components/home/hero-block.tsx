import Image from "next/image";
import Link from "next/link";
import { mediaItems } from "@/content/media";
import type { HomeBlock } from "@/content/home";
import { localizedHref, type Locale } from "@/i18n/config";

type HeroConfig = Extract<HomeBlock, { type: "hero" }>["campaign"];

export function HeroBlock({
  imageId,
  campaign,
  locale,
}: {
  imageId: string;
  campaign: HeroConfig;
  locale: Locale;
}) {
  const image = mediaItems.find((item) => item.id === imageId);
  if (!image) return null;

  return (
    <section className="poster-noise relative min-h-[82svh] overflow-hidden border-b border-line pt-[var(--sh-header-h)] md:min-h-[92svh]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="100vw"
        className="media-cover"
        style={{ objectPosition: image.focalPoint }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,11,.9)_0%,rgba(5,6,11,.58)_43%,rgba(5,6,11,.12)_72%),linear-gradient(to_top,rgba(5,6,11,.88),transparent_58%)]" />

      <div className="site-container relative z-10 flex min-h-[calc(82svh-var(--sh-header-h))] items-end py-8 md:min-h-[calc(92svh-var(--sh-header-h))] md:py-12">
        <div className="w-full">
          <div className="max-w-4xl">
            <p className="kicker text-ice">{campaign.eyebrow[locale]}</p>
            <h1 className="mt-4 max-w-[13ch] font-display text-[clamp(3.8rem,9vw,8.75rem)] uppercase leading-[0.9] tracking-[-0.018em] text-paper">
              {campaign.title[locale]}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-paper/72 md:text-lg md:leading-8">
              {campaign.body[locale]}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="brutal-button brutal-button-primary" href={localizedHref(locale, campaign.primary.href)}>
                {campaign.primary.label[locale]}
              </Link>
              {campaign.secondary ? (
                <Link className="brutal-button border-white/35 bg-background/20 backdrop-blur-sm" href={localizedHref(locale, campaign.secondary.href)}>
                  {campaign.secondary.label[locale]}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-white/25 pt-4">
            <span className="kicker">Sky Hook</span>
            <span className="kicker text-white/55">2025 / 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
