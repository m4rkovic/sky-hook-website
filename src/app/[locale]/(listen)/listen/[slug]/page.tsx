import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkFrame } from "@/components/music/artwork-frame";
import { ListenLinks } from "@/components/music/listen-links";
import { getRelease, releases } from "@/content/releases";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localizedHref, locales, type Locale } from "@/i18n/config";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => releases.map((release) => ({ locale, slug: release.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const release = getRelease(slug);
  if (!release || !hasLocale(rawLocale)) return { title: "Listen" };

  const locale = rawLocale as Locale;
  const description = release.description?.[locale] ?? `Choose where to listen to ${release.title} by Sky Hook.`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const fallbackImage = siteUrl ? `${siteUrl}${siteConfig.socialImage}` : undefined;

  return {
    title: `Listen to ${release.title}`,
    description,
    alternates: {
      canonical: `/${locale}/listen/${release.slug}`,
      languages: {
        en: `/en/listen/${release.slug}`,
        sr: `/sr/listen/${release.slug}`,
        "x-default": `/en/listen/${release.slug}`,
      },
    },
    openGraph: {
      title: `${release.title} | Sky Hook`,
      description,
      ...(release.artwork ? { images: [{ url: release.artwork, alt: `${release.title} artwork` }] } : fallbackImage ? { images: [{ url: fallbackImage, alt: "Sky Hook" }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${release.title} | Sky Hook`,
      description,
      ...(release.artwork ? { images: [release.artwork] } : fallbackImage ? { images: [fallbackImage] } : {}),
    },
  };
}

export default async function ListenPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const release = getRelease(slug);
  if (!release) notFound();
  const dict = getDictionary(locale);
  const otherLocale: Locale = locale === "en" ? "sr" : "en";

  return (
    <main className="listen-page min-h-svh bg-background px-4 py-8 text-paper md:py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
          <Link href={`/${locale}`} aria-label="Sky Hook home">
            <Image src={siteConfig.logo} alt="Sky Hook" width={2172} height={724} className="h-auto w-36" priority />
          </Link>
          <div className="flex items-center gap-4">
            <Link className="kicker text-muted hover:text-ice" href={`/${otherLocale}/listen/${release.slug}`}>{locale.toUpperCase()} / <span className="text-paper">{otherLocale.toUpperCase()}</span></Link>
            <span className="h-4 w-px bg-line" aria-hidden="true" />
            <Link className="kicker text-muted hover:text-ice" href={localizedHref(locale, `/music/${release.slug}`)}>{dict.common.back} →</Link>
          </div>
        </div>

        <div className="mx-auto w-52 md:w-60">
          <ArtworkFrame artwork={release.artwork} title={release.title} placeholderLabel={dict.music.artworkTbd} priority />
        </div>
        <div className="py-6 text-center">
          <p className="kicker text-ice">Sky Hook</p>
          <h1 className="mt-2 font-display text-3xl uppercase tracking-[-0.01em]">{release.title}</h1>
          <p className="mt-2 text-sm text-muted">{dict.music.chooseService}</p>
        </div>
        <ListenLinks streaming={release.streaming} labels={{ play: dict.music.play, watch: dict.music.watch, open: dict.music.open, noLinks: dict.music.noLinks }} />
      </div>
    </main>
  );
}
