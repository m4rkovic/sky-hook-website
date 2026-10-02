import Link from "next/link";
import { UpcomingShows } from "@/features/shows/components/upcoming-shows";

export function UpcomingShowsBlock({ limit }: { limit: number }) {
  return (
    <section className="section-frame bg-background">
      <div className="site-container">
        <div className="mb-10 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="kicker text-ice">02 / Live</p>
            <h2 className="font-display mt-3 text-5xl font-black uppercase tracking-[-0.04em] md:text-7xl">Upcoming shows</h2>
          </div>
          <Link className="kicker text-muted hover:text-ice" href="/live">All dates →</Link>
        </div>
        <UpcomingShows limit={limit} />
      </div>
    </section>
  );
}
