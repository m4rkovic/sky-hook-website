import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SocialIcon } from "@/components/social/social-icon";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localizedHref, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) return { title: "Contact" };
  const locale = rawLocale as Locale;
  const description = locale === "sr"
    ? "Sky Hook booking, press kontakt i zvanični profili."
    : "Sky Hook booking, press contact and official profiles.";
  return {
    title: "Contact",
    description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: "/en/contact", sr: "/sr/contact", "x-default": "/en/contact" },
    },
  };
}

const socialOrder = ["instagram", "facebook", "youtube", "spotify"] as const;

const socialLabels: Record<(typeof socialOrder)[number], string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  spotify: "Spotify",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const bookingEmail = siteConfig.contact.bookingEmail;

  return (
    <PageShell eyebrow={dict.contact.eyebrow} title={dict.contact.title}>
      <section className="section-frame">
        <div className="site-container section-grid items-start">
          <div className="col-span-12 md:col-span-5">
            <p className="max-w-xl text-lg leading-8 text-ice-light/80">{dict.contact.body}</p>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="border-y border-line py-6">
              <p className="kicker text-ice">{dict.contact.bookingLabel}</p>
              {bookingEmail ? (
                <a
                  href={`mailto:${bookingEmail}`}
                  className="mt-4 block break-all font-display text-2xl uppercase transition-colors md:text-4xl hover:text-ice "
                >
                  {bookingEmail}
                </a>
              ) : (
                <span className="kicker mt-4 block text-muted">{dict.contact.missingEmail}</span>
              )}
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted">{dict.contact.bookingNote}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {bookingEmail ? (
                  <a className="brutal-button" href={`mailto:${bookingEmail}`}>
                    {dict.contact.emailBooking}
                  </a>
                ) : null}
                <Link className="brutal-button" href={localizedHref(locale, "/epk")}>
                  EPK →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="site-container py-[var(--sh-section-y)]">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 md:gap-x-20 lg:gap-x-28">
            {socialOrder.map((key) => {
              const url = siteConfig.socials[key];
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={socialLabels[key]}
                  className="group flex h-24 w-24 items-center justify-center transition-transform duration-200 hover:-translate-y-1 md:h-28 md:w-28"
                >
                  <SocialIcon
                    name={key}
                    className="h-16 w-16 text-ice transition-[transform,color,opacity] duration-200 group-hover:scale-110 group-hover:text-paper md:h-20 md:w-20"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
