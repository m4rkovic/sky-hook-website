"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center bg-background px-[var(--sh-gutter)] py-16 text-paper">
      <div className="mx-auto w-full max-w-4xl border-y border-line py-12 md:py-20">
        <p className="kicker text-ice">Error / Greška</p>
        <h1 className="display-title mt-4">Signal lost.</h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-muted">
          Nešto je puklo. Something went wrong. Probaj ponovo.
        </p>
        <button type="button" onClick={reset} className="brutal-button brutal-button-primary mt-8">
          Retry / Pokušaj ponovo
        </button>
      </div>
    </main>
  );
}
