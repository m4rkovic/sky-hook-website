import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { mediaItems } from "@/content/media";

export const metadata: Metadata = { title: "Media" };

export default function MediaPage() {
  return (
    <PageShell eyebrow="Media" title="Photos & video">
      <section className="section-frame">
        <div className="site-container grid gap-4 md:grid-cols-2">
          {mediaItems.filter((item) => item.type === "photo").map((item) => (
            <figure key={item.id} className="relative aspect-[3/2] overflow-hidden border border-line">
              <Image src={item.src} alt={item.alt} fill className="media-cover" style={{ objectPosition: item.focalPoint }} />
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
