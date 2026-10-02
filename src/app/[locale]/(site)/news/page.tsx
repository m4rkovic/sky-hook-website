import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = { title: "News" };

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const dict = getDictionary(rawLocale as Locale);
  return <PageShell eyebrow={dict.news.eyebrow} title={dict.news.title}><section className="section-frame"><div className="site-container max-w-3xl text-muted">{dict.news.body}</div></section></PageShell>;
}
