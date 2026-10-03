import type { ReactNode } from "react";

export function PageShell({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <main className="pt-[calc(var(--sh-header-h)+1.5rem)]">
      <section className="site-container pb-10 pt-10 md:pb-16 md:pt-16">
        <div className="page-masthead">
          <p className="editorial-stamp text-ice">{eyebrow}</p>
          <h1 className="display-title mt-6 max-w-6xl">{title}</h1>
        </div>
      </section>
      {children}
    </main>
  );
}
