export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-paper" aria-live="polite" aria-busy="true">
      <div className="text-center">
        <span className="mx-auto block h-8 w-8 animate-spin rounded-full border border-line border-t-ice" aria-hidden="true" />
        <p className="kicker mt-5 text-muted">Sky Hook / Loading</p>
      </div>
    </main>
  );
}
