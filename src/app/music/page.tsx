import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { releases } from "@/content/releases";

export const metadata: Metadata = { title: "Music" };

export default function MusicPage() {
  return (
    <PageShell eyebrow="Music" title="Releases">
      <section className="section-frame">
        <div className="site-container">
          {releases.map((release) => (
            <Link key={release.slug} href={`/music/${release.slug}`} className="grid grid-cols-[1fr_auto] items-center border-t border-line py-6 transition-colors hover:text-ice md:grid-cols-[8rem_1fr_auto]">
              <span className="kicker hidden text-muted md:block">{release.year}</span>
              <span className="font-display text-3xl font-black uppercase md:text-5xl">{release.title}</span>
              <span className="kicker text-muted">{release.type} →</span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
