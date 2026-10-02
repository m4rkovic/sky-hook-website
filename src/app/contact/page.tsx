import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const bookingEmail = siteConfig.contact.bookingEmail;

  return (
    <PageShell eyebrow="Contact" title="Booking & contact">
      <section className="section-frame">
        <div className="site-container section-grid">
          <div className="col-span-12 md:col-span-5">
            <p className="text-muted">Booking and press contacts live in site configuration, not inside this page component.</p>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            {bookingEmail ? (
              <a className="brutal-button" href={`mailto:${bookingEmail}`}>Email booking</a>
            ) : (
              <span className="kicker text-muted">Booking email to be configured</span>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
