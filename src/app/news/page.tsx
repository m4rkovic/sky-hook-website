import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <PageShell eyebrow="News" title="Archive ready">
      <section className="section-frame"><div className="site-container max-w-3xl text-muted">News is intentionally hidden from the primary navigation until there is enough real content. The route is reserved so it can grow without changing the global layout.</div></section>
    </PageShell>
  );
}
