import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { siteConfig } from "@/content/site";
import { DocumentLanguage } from "@/components/i18n/document-language";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, locales, type Locale } from "@/i18n/config";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return {};
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  return {
    title: { default: "Sky Hook", template: "%s | Sky Hook" },
    description: siteConfig.description,
    metadataBase: siteUrl ? new URL(siteUrl) : undefined,
    alternates: siteUrl
      ? {
          languages: {
            en: `${siteUrl}/en`,
            sr: `${siteUrl}/sr`,
            "x-default": `${siteUrl}/en`,
          },
        }
      : undefined,
    openGraph: {
      title: "Sky Hook",
      description: dict.footer.body,
      type: "website",
      siteName: "Sky Hook",
      locale: locale === "sr" ? "sr_RS" : "en_GB",
      ...(siteUrl ? { images: [{ url: `${siteUrl}${siteConfig.socialImage}`, alt: "Sky Hook" }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: "Sky Hook",
      description: dict.footer.body,
      ...(siteUrl ? { images: [`${siteUrl}${siteConfig.socialImage}`] } : {}),
    },
  };
}

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;

  const musicGroupJsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: siteConfig.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
    inLanguage: locale === "sr" ? "sr-Latn" : "en",
  };

  return (
    <>
      <DocumentLanguage locale={locale} />
      <div lang={locale === "sr" ? "sr-Latn" : "en"}>{children}</div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupJsonLd) }}
      />
    </>
  );
}
