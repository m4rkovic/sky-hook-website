import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="pt-[calc(var(--sh-header-h)+3rem)]">
      <section className="site-container pb-14 pt-12 md:pb-20 md:pt-20">
        <p className="kicker text-ice">{eyebrow}</p>
        <h1 className="display-title mt-5 max-w-5xl">{title}</h1>
      </section>
      {children}
    </main>
  );
}
