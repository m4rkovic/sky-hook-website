import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { UpcomingShows } from "@/features/shows/components/upcoming-shows";

export const metadata: Metadata = { title: "Live" };

export default function LivePage() {
  return (
    <PageShell eyebrow="Live" title="Upcoming shows">
      <section className="section-frame">
        <div className="site-container"><UpcomingShows /></div>
      </section>
    </PageShell>
  );
}
