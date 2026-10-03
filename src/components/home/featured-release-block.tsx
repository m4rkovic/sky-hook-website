import Link from "next/link";
import { featuredRelease } from "@/content/releases";
import { localizedHref, type Locale } from "@/i18n/config";
import { SectionTransition } from "@/components/layout/section-transition";
import type { Dictionary } from "@/i18n/types";
import { ArtworkFrame } from "@/components/music/artwork-frame";

export function FeaturedReleaseBlock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  if (!featuredRelease) return null;
  const typeLabel = dict.music[featuredRelease.type];

  return (
    <section className="section-frame relative bg-paper text-background">
      <SectionTransition tone="paper" direction="left" />
      <div className="site-container section-grid relative z-10">
        <div className="col-span-12 md:col-span-5">
          <div className="mb-5 flex items-center justify-between border-t-2 border-background pt-3">
            <p className="kicker">01 / {dict.nav.music}</p>
            <span className="kicker">{typeLabel} / {featuredRelease.year}</span>
          </div>
          <Link href={localizedHref(locale, `/music/${featuredRelease.slug}`)} aria-label={`${dict.common.openRelease}: ${featuredRelease.title}`} className="block border-2 border-background shadow-[8px_8px_0_var(--sh-bg)]">
            <ArtworkFrame artwork={featuredRelease.artwork} title={featuredRelease.title} placeholderLabel={dict.music.artworkTbd} />
          </Link>
        </div>
        <div className="col-span-12 flex flex-col items-start md:col-span-7 md:pl-6 md:pt-14">
          <p className="editorial-stamp">{dict.home.featuredRelease}</p>
          <h2 className="poster-heading mt-6 max-w-[10ch]">{featuredRelease.title}</h2>
          <div className="mt-8 flex w-full flex-wrap items-center justify-between gap-5 border-t-2 border-background pt-5 md:mt-auto">
            <span className="kicker max-w-[25ch] text-background/70">{featuredRelease.label ?? `Sky Hook / ${featuredRelease.year}`}</span>
            <Link className="brutal-button" href={localizedHref(locale, `/music/${featuredRelease.slug}`)}>{dict.common.openRelease}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
