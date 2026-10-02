import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { ReleaseExplorer } from "@/components/music/release-explorer";
import { releases } from "@/content/releases";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return { title: "Music" };
  const locale = rawLocale as Locale;
  const description = locale === "sr"
    ? "Sky Hook diskografija, singlovi i debitantski album Gde ptice lete."
    : "Sky Hook discography, singles and the debut album Gde ptice lete.";
  return {
    title: "Music",
    description,
    alternates: {
      canonical: `/${locale}/music`,
      languages: { en: "/en/music", sr: "/sr/music", "x-default": "/en/music" },
    },
  };
}

export default async function MusicPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <PageShell eyebrow={dict.music.eyebrow} title={dict.music.title}>
      <ReleaseExplorer releases={releases} locale={locale} labels={dict.music} />
    </PageShell>
  );
}
