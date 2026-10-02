import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { mediaItems } from "@/content/media";
import { members } from "@/content/members";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = { title: "Band" };

export default async function BandPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const image = mediaItems[0];

  return (
    <PageShell eyebrow={dict.band.eyebrow} title={dict.band.title}>
      <section className="border-t border-line">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[32rem] border-b border-line lg:border-b-0 lg:border-r">
            <Image src={image.src} alt={image.alt} fill className="media-cover" style={{ objectPosition: image.focalPoint }} />
          </div>
          <div className="p-[var(--sh-gutter)] py-[var(--sh-section-y)]">
            <p className="max-w-xl text-lg leading-8 text-ice-light/75">{dict.band.body}</p>
            <p className="kicker mt-12 text-muted">{dict.band.membersConfigured}: {members.length}</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
