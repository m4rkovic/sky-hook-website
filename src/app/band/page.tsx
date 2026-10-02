import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { mediaItems } from "@/content/media";
import { members } from "@/content/members";

export const metadata: Metadata = { title: "Band" };

export default function BandPage() {
  const image = mediaItems[0];
  return (
    <PageShell eyebrow="Band" title="Sky Hook">
      <section className="border-t border-line">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[32rem] border-b border-line lg:border-b-0 lg:border-r">
            <Image src={image.src} alt={image.alt} fill className="media-cover" style={{ objectPosition: image.focalPoint }} />
          </div>
          <div className="p-[var(--sh-gutter)] py-[var(--sh-section-y)]">
            <p className="max-w-xl text-lg leading-8 text-ice-light/75">The final biography will live in structured content instead of being embedded inside the visual component. Member cards are already modeled and can be populated when the final copy is ready.</p>
            <p className="kicker mt-12 text-muted">Members configured: {members.length}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
