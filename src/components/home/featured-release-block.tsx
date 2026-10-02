import Link from "next/link";
import { featuredRelease } from "@/content/releases";

export function FeaturedReleaseBlock() {
  if (!featuredRelease) return null;

  return (
    <section className="section-frame bg-paper text-background">
      <div className="site-container section-grid">
        <div className="col-span-12 md:col-span-4">
          <p className="kicker">01 / Music</p>
        </div>
        <div className="col-span-12 md:col-span-8">
          <p className="kicker text-background/60">Featured release</p>
          <h2 className="display-title mt-5">{featuredRelease.title}</h2>
          <div className="mt-8 flex items-center gap-4 border-t border-background/20 pt-5">
            <span className="kicker text-background/60">{featuredRelease.type} / {featuredRelease.year}</span>
            <Link className="brutal-button ml-auto" href={`/music/${featuredRelease.slug}`}>Open release</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
