import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/content/site";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!hasLocale(rawLocale)) notFound();
  const dict = getDictionary(rawLocale as Locale);
  const bookingEmail = siteConfig.contact.bookingEmail;

  return (
    <PageShell eyebrow={dict.contact.eyebrow} title={dict.contact.title}>
      <section className="section-frame">
        <div className="site-container section-grid">
          <div className="col-span-12 md:col-span-5"><p className="text-muted">{dict.contact.body}</p></div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            {bookingEmail ? <a className="brutal-button" href={`mailto:${bookingEmail}`}>{dict.contact.emailBooking}</a> : <span className="kicker text-muted">{dict.contact.missingEmail}</span>}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
