import Link from "next/link";
import { featuredRelease } from "@/content/releases";
import { localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function FeaturedReleaseBlock({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  if (!featuredRelease) return null;
  const typeLabel = dict.music[featuredRelease.type];

  return (
    <section className="section-frame bg-paper text-background">
      <div className="site-container section-grid">
        <div className="col-span-12 md:col-span-4">
          <p className="kicker">01 / {dict.nav.music}</p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <p className="kicker text-background/60">{dict.home.featuredRelease}</p>
          <h2 className="display-title mt-5">{featuredRelease.title}</h2>
          <div className="mt-8 flex items-center gap-4 border-t border-background/20 pt-5">
            <span className="kicker text-background/60">{typeLabel} / {featuredRelease.year}</span>
            <Link className="brutal-button ml-auto" href={localizedHref(locale, `/music/${featuredRelease.slug}`)}>{dict.common.openRelease}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
