import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SectionTransition } from "@/components/layout/section-transition";
import { SocialIcon } from "@/components/social/social-icon";
import { bookingHref, pressCopy, pressKitUrl } from "@/content/press";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localizedHref } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return { title: "Contact" };
  return {
    title: getDictionary(locale).contact.title,
    description: pressCopy[locale].bookingBody,
    alternates: { canonical: `/${locale}/contact`, languages: { en: "/en/contact", sr: "/sr/contact", "x-default": "/en/contact" } },
  };
}

const socials = ["instagram", "facebook", "youtube", "spotify"] as const;
const socialLabels = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", spotify: "Spotify" };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = pressCopy[locale];
  const dict = getDictionary(locale);
  return (
    <PageShell eyebrow={t.eyebrow} title={dict.contact.title}>
      <section className="pb-[var(--sh-section-y)]">
        <div className="site-container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div><h2 className="poster-heading max-w-[13ch]">{t.contactTitle}</h2><p className="mt-7 max-w-xl text-lg leading-9 text-paper/75">{t.contactIntro}</p><p className="editorial-stamp mt-7 text-ice">Niš / Serbia / Sky Hook</p></div>
          <div className="border-y-2 border-paper/40 py-7">
            <p className="kicker text-ice">Booking / Press</p>
            <a href={`mailto:${siteConfig.contact.bookingEmail}`} className="mt-5 block break-all text-[clamp(1.2rem,2.4vw,2rem)] font-bold leading-tight hover:text-ice">{siteConfig.contact.bookingEmail}</a>
            <div className="mt-8 flex flex-wrap gap-5"><a href={bookingHref(locale)} className="brutal-button brutal-button-primary">{t.email} ↗</a><a href={bookingHref(locale, "press")} className="brutal-button">{t.pressEmail} ↗</a></div>
            <p className="mt-6 text-sm leading-7 text-muted">{t.checklistNote}</p>
          </div>
        </div>
      </section>

      <section className="section-frame relative bg-paper text-background">
        <SectionTransition tone="paper" direction="left" />
        <div className="site-container relative z-10 grid gap-10 md:grid-cols-[1fr_1fr] md:gap-20">
          <div><p className="kicker">01 / BOOKING</p><h2 className="archive-heading mt-5 max-w-[14ch]">{t.checklistTitle}</h2></div>
          <ol className="border-t-2 border-background">
            {t.checklist.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-background/30 py-5"><span className="kicker pt-1 text-background/55">0{index + 1}</span><span className="text-lg leading-7">{item}</span></li>)}
          </ol>
        </div>
      </section>

      <section className="section-frame">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative aspect-[3/2] overflow-hidden"><Image src="/media/photos/skyhook-live-02.jpg" alt="Sky Hook live" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" /></div>
          <div><p className="kicker text-ice">02 / PRESS KIT</p><h2 className="archive-heading mt-5 max-w-[17ch]">{t.materialsTitle}</h2><p className="mt-6 max-w-xl text-base leading-8 text-muted">{t.materialsBody}</p><div className="mt-7 flex flex-wrap gap-5"><Link href={localizedHref(locale, "/epk")} className="brutal-button">{t.openKit} ↗</Link><a href={pressKitUrl} download className="brutal-button">{t.downloadKit} ↓</a></div></div>
        </div>
      </section>

      <section className="section-frame relative bg-surface">
        <SectionTransition tone="surface" direction="right" />
        <div className="site-container relative z-10 grid gap-10 md:grid-cols-2 md:gap-16">
          <div><p className="kicker text-ice">03 / LIVE</p><h2 className="archive-heading mt-5">{t.technicalTitle}</h2></div>
          <div><p className="max-w-xl text-lg leading-8 text-paper/75">{t.technicalBody}</p><a href={bookingHref(locale, "technical")} className="brutal-button mt-7">{t.technicalEmail} ↗</a></div>
        </div>
      </section>

      <section className="section-frame">
        <div className="site-container">
          <h2 className="kicker mb-8 text-ice">04 / {t.official}</h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {socials.map((key) => <a key={key} href={siteConfig.socials[key]} target="_blank" rel="noreferrer" className="group flex min-h-24 items-center gap-4 border-y border-line py-5 transition-colors hover:text-ice"><SocialIcon name={key} className="h-8 w-8 shrink-0 text-ice" /><span className="kicker">{socialLabels[key]} <span aria-hidden="true">↗</span></span></a>)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
