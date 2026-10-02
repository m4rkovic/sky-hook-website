import { notFound } from "next/navigation";
import { HomeBlockRenderer } from "@/components/home/home-block-renderer";
import { homeBlocks } from "@/content/home";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return <main>{homeBlocks.map((block, index) => <HomeBlockRenderer key={`${block.type}-${index}`} block={block} locale={locale} dict={dict} />)}</main>;
}
