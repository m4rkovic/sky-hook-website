import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeBlockRenderer } from "@/components/home/home-block-renderer";
import { homeBlocks } from "@/content/home";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return { title: "Sky Hook" };
  const locale = rawLocale as Locale;
  const description = locale === "sr"
    ? "Zvanični sajt benda Sky Hook iz Niša. Muzika, nastupi, video i vesti."
    : "Official website of Sky Hook from Niš, Serbia. Music, live shows, video and news.";
  return {
    title: { absolute: "Sky Hook" },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", sr: "/sr", "x-default": "/en" },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return <main>{homeBlocks.map((block, index) => <HomeBlockRenderer key={`${block.type}-${index}`} block={block} locale={locale} dict={dict} />)}</main>;
}
