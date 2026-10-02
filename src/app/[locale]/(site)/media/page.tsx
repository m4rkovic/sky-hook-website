import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { mediaItems } from "@/content/media";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = { title: "Media" };

export default async function MediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const dict = getDictionary(rawLocale as Locale);

  return (
    <PageShell eyebrow={dict.media.eyebrow} title={dict.media.title}>
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
