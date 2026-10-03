import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { NewsExplorer } from "@/components/news/news-explorer";
import { newsItems } from "@/content/news";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return { title: "News" };
  const locale = rawLocale as Locale;
  const description = locale === "sr"
    ? "Sky Hook vesti, intervjui, najave i press arhiva."
    : "Sky Hook news, interviews, announcements and press archive.";
  return {
    title: "News",
    description,
    alternates: {
      canonical: `/${locale}/news`,
      languages: { en: "/en/news", sr: "/sr/news", "x-default": "/en/news" },
    },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <PageShell eyebrow={dict.news.eyebrow} title={dict.news.title}>
      <section className="pb-[var(--sh-section-y)]">
        <div className="site-container">
          <p className="mb-10 max-w-2xl text-base leading-8 md:mb-14 text-muted">{dict.news.body}</p>
          <NewsExplorer
            items={newsItems}
            locale={locale}
            labels={{
              all: dict.news.all,
              interviews: dict.news.interviews,
              press: dict.news.press,
              live: dict.news.live,
              readExternal: dict.news.readExternal,
              featured: dict.news.featured,
            }}
          />
        </div>
      </section>
    </PageShell>
  );
}
