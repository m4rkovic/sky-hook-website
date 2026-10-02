import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = { title: "EPK", robots: { index: false, follow: false } };

export default function EpkPage() {
  return (
    <PageShell eyebrow="Press" title="Electronic press kit">
      <section className="section-frame"><div className="site-container max-w-3xl text-muted">Reserved for promoter-ready biography, tech rider links, downloadable photos, contact information and selected live media.</div></section>
    </PageShell>
  );
}
