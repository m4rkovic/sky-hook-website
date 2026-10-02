import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { mediaItems } from "@/content/media";
import { siteConfig } from "@/content/site";
import { hasLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = { title: "EPK", robots: { index: false, follow: false } };

const copy = {
  en: {
    eyebrow: "Press / Booking",
    title: "Electronic press kit",
    intro: "A compact promoter and press resource for Sky Hook. Final downloadable assets can be dropped into this structure without rebuilding the page.",
    bioLabel: "Short bio",
    bio: "Sky Hook is a guitar band from Niš, Serbia, built around contrast: direct songs, restless arrangements, two vocal perspectives and a live set that moves between atmosphere and impact. The debut album Gde ptice lete arrived in 2025 and became the centre of the band's current live chapter.",
    highlights: "Selected live",
    assets: "Press assets",
    photos: "Press photos",
    logos: "Logos",
    rider: "Tech rider / stage plot",
    coming: "Download pack coming soon",
    contact: "Booking / press",
    contactBody: "Shows, festivals, support slots, interviews and press enquiries.",
    music: "Listen",
    socials: "Official links",
  },
  sr: {
    eyebrow: "Press / Booking",
    title: "Electronic press kit",
    intro: "Kompaktan resurs za promotere i medije. Finalne fotografije, rider i download fajlovi mogu kasnije da se ubace bez menjanja strukture stranice.",
    bioLabel: "Kratka biografija",
    bio: "Sky Hook je gitarski bend iz Niša izgrađen na kontrastu: direktne pesme, nemirni aranžmani, dva vokalna ugla i live set koji se kreće između atmosfere i udara. Debitantski album Gde ptice lete objavljen je 2025. i postao je osnova aktuelnog koncertnog poglavlja benda.",
    highlights: "Odabrani nastupi",
    assets: "Press materijal",
    photos: "Press fotografije",
    logos: "Logotipi",
    rider: "Tech rider / stage plot",
    coming: "Download paket uskoro",
    contact: "Booking / press",
    contactBody: "Nastupi, festivali, support slotovi, intervjui i press upiti.",
    music: "Slušaj",
    socials: "Zvanični linkovi",
  },
} as const;

export default async function EpkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const t = copy[locale];
  const heroImage = mediaItems.find((item) => item.id === "live-02");
  const bookingEmail = siteConfig.contact.bookingEmail;

  return (
    <PageShell eyebrow={t.eyebrow} title={t.title}>
      <section className="border-b border-line">
        <div className="site-container section-grid py-[var(--sh-section-y)]">
          <div className="col-span-12 lg:col-span-5">
            <p className="max-w-xl text-lg leading-8 text-muted">{t.intro}</p>
            <div className="mt-10 border-t border-line pt-5">
              <p className="kicker text-ice">{t.bioLabel}</p>
              <p className="mt-5 max-w-xl text-base leading-8 text-paper/80">{t.bio}</p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] overflow-hidden border border-line bg-surface">
              {heroImage ? (
                <Image src={heroImage.src} alt={heroImage.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="media-cover" style={{ objectPosition: heroImage.focalPoint }} />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="site-container py-[var(--sh-section-y)]">
          <p className="kicker text-ice">01 / {t.highlights}</p>
          <div className="mt-6 grid border-l border-t border-line md:grid-cols-2 lg:grid-cols-4">
            {[
              ["2026", "Nišville Open Stage"],
              ["2026", "Čupin Rock Memorijal"],
              ["2026", "Skopje / Pub Dže"],
              ["2025", "Nišville"],
            ].map(([year, show]) => (
              <div key={show} className="min-h-44 border-b border-r border-line p-5">
                <span className="kicker text-muted">{year}</span>
                <p className="mt-10 font-display text-2xl font-black uppercase tracking-[-0.03em]">{show}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="site-container py-[var(--sh-section-y)]">
          <p className="kicker text-ice">02 / {t.assets}</p>
          <div className="mt-6 grid border-l border-t border-line md:grid-cols-3">
            {[t.photos, t.logos, t.rider].map((label, index) => (
              <div key={label} className="flex min-h-56 flex-col justify-between border-b border-r border-line p-5">
                <span className="kicker text-muted">0{index + 1}</span>
                <div>
                  <p className="font-display text-3xl font-black uppercase">{label}</p>
                  <p className="kicker mt-3 text-muted">{t.coming}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper text-background">
        <div className="site-container section-grid py-[var(--sh-section-y)]">
          <div className="col-span-12 lg:col-span-5">
            <p className="kicker text-background/50">03 / {t.contact}</p>
            <h2 className="mt-4 font-display text-5xl font-black uppercase tracking-[-0.045em] md:text-7xl">{t.contact}</h2>
            <p className="mt-5 max-w-lg text-background/65">{t.contactBody}</p>
          </div>
          <div className="col-span-12 flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <a href={`mailto:${bookingEmail}`} className="break-all border-y border-background/20 py-6 font-display text-2xl font-black uppercase transition-colors hover:text-[#151c47] md:text-4xl">
              {bookingEmail}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={siteConfig.socials.spotify} target="_blank" rel="noreferrer" className="brutal-button border-background">{t.music} / Spotify ↗</a>
              <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" className="brutal-button border-background">Instagram ↗</a>
              <a href={siteConfig.socials.youtube} target="_blank" rel="noreferrer" className="brutal-button border-background">YouTube ↗</a>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
