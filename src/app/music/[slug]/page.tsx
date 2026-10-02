import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { releases } from "@/content/releases";

export const dynamicParams = false;

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const release = releases.find((item) => item.slug === slug);
  return { title: release?.title ?? "Music" };
}

export default async function ReleasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const release = releases.find((item) => item.slug === slug);
  if (!release) notFound();

  return (
    <PageShell eyebrow={`${release.type} / ${release.year}`} title={release.title}>
      <section className="section-frame">
        <div className="site-container section-grid">
          <div className="col-span-12 aspect-square max-w-xl border border-line bg-surface-strong md:col-span-5" />
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="max-w-xl leading-7 text-muted">Release-specific artwork, credits, streaming links, lyrics policy and video embeds belong here. The route already exists, so adding richer release data later does not change site architecture.</p>
            {release.listenUrl ? <a className="brutal-button mt-8" href={release.listenUrl}>Listen</a> : null}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
