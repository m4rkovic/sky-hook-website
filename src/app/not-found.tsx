import Link from "next/link";
import { SkyHookLogo } from "@/components/brand/sky-hook-logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-background px-[var(--sh-gutter)] py-16 text-paper">
      <div className="mx-auto w-full max-w-5xl border-y border-line py-12 md:py-20">
        <SkyHookLogo variant="monogram" className="h-auto w-20" />
        <p className="kicker mt-10 text-ice">404 / Not found</p>
        <h1 className="display-title mt-4 max-w-4xl">Wrong turn.</h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-muted">
          Ova stranica ne postoji, pomerena je ili je URL odlučio da improvizuje.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/sr" className="brutal-button brutal-button-primary">Početna</Link>
          <Link href="/sr/music" className="brutal-button">Muzika</Link>
          <Link href="/sr/live" className="brutal-button">Live</Link>
        </div>
      </div>
    </main>
  );
}
