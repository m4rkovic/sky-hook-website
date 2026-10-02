import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { MediaExplorer } from "@/components/media/media-explorer";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return { title: "Media" };
  const locale = rawLocale as Locale;
  const description = locale === "sr"
    ? "Sky Hook fotografije, live snimci i muzički spotovi."
    : "Sky Hook photography, live footage and official music videos.";

  return {
    title: "Media",
    description,
    alternates: {
      canonical: `/${locale}/media`,
      languages: { en: "/en/media", sr: "/sr/media", "x-default": "/en/media" },
    },
  };
}

export default async function MediaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <PageShell eyebrow={dict.media.eyebrow} title={dict.media.title}>
      <MediaExplorer locale={locale} />
    </PageShell>
  );
}
