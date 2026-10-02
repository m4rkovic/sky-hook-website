import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SocialIcon } from "@/components/social/social-icon";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

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
              {bookingEmail ? (
                <a className="brutal-button mt-7" href={`mailto:${bookingEmail}`}>
                  {dict.contact.emailBooking}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="site-container py-[var(--sh-section-y)]">
          <div className="mb-10 grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <p className="kicker text-ice">SOCIAL / LINKS</p>
              <h2 className="mt-4 font-display text-4xl uppercase md:text-7xl">
                {dict.contact.socialsTitle}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted md:justify-self-end">{dict.contact.socialsBody}</p>
          </div>

          <div className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {socialOrder.map((key, index) => {
              const url = siteConfig.socials[key];
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative min-h-[18rem] overflow-hidden border-b border-r border-line p-5 transition-colors duration-200 hover:bg-surface-strong"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="kicker text-muted">0{index + 1}</span>
                    <span className="text-xl text-ice transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </div>

                  <div className="mt-8 flex min-h-[7.5rem] items-center">
                    <SocialIcon
                      name={key}
                      className="h-20 w-20 text-ice transition-[transform,color] duration-300 group-hover:scale-110 group-hover:text-paper md:h-24 md:w-24"
                    />
                  </div>

                  <div className="absolute inset-x-5 bottom-5">
                    <div className="font-display text-3xl uppercase">
                      {socialLabels[key]}
                    </div>
                    <div className="mt-2 h-px w-0 bg-ice transition-[width] duration-300 group-hover:w-full" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
