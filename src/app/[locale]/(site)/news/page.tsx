import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { NewsExplorer } from "@/components/news/news-explorer";
import { newsItems } from "@/content/news";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = { title: "News" };

export default async function NewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <PageShell eyebrow={dict.news.eyebrow} title={dict.news.title}>
      <section className="section-frame">
        <div className="site-container">
          <p className="mb-10 max-w-3xl text-lg leading-8 text-muted">{dict.news.body}</p>
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
