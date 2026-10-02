"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { siteConfig } from "@/content/site";
import { localizedHref, type Locale } from "@/i18n/config";

type NavLabels = Record<"live" | "music" | "band" | "media" | "news" | "contact", string>;

type HeaderLabels = NavLabels & { menu: string; close: string };

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`kicker border-b pb-1 transition-colors ${active ? "border-ice text-ice" : "border-transparent text-paper hover:text-ice"}`}
    >
      {label}
    </Link>
  );
}

function localePath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length > 0 && (parts[0] === "en" || parts[0] === "sr")) parts[0] = nextLocale;
  else parts.unshift(nextLocale);
  return `/${parts.join("/")}`;
}

export function SiteHeader({ locale, labels }: { locale: Locale; labels: HeaderLabels }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = useMemo(
    () => siteConfig.navigation.filter((item) => item.showInNavigation),
    [],
  );
  const midpoint = Math.ceil(navItems.length / 2);
  const left = navItems.slice(0, midpoint);
  const right = navItems.slice(midpoint);
  const otherLocale: Locale = locale === "en" ? "sr" : "en";

  const renderNavItem = (item: (typeof navItems)[number]) => {
    const href = localizedHref(locale, item.href);
    return <NavLink key={item.href} href={href} label={labels[item.key]} pathname={pathname} />;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/88 backdrop-blur-md">
      <div className="site-container grid h-[var(--sh-header-h)] grid-cols-[1fr_auto_1fr] items-center">
        <nav className="hidden items-center justify-end gap-7 pr-10 lg:flex" aria-label="Primary navigation left">
          {left.map(renderNavItem)}
        </nav>

        <Link
          href={`/${locale}`}
          className="relative z-20 flex h-[calc(var(--sh-header-h)+1.5rem)] w-[clamp(10rem,15vw,14rem)] items-center justify-center self-start bg-background px-3"
          aria-label="Sky Hook home"
        >
          <Image src={siteConfig.logo} alt="Sky Hook" width={2172} height={724} priority className="h-auto w-full" />
        </Link>

        <div className="hidden items-center gap-6 pl-10 lg:flex">
          <nav className="flex items-center gap-7" aria-label="Primary navigation right">
            {right.map(renderNavItem)}
          </nav>
          <span className="h-4 w-px bg-line" aria-hidden="true" />
          <Link className="kicker text-muted transition-colors hover:text-ice" href={localePath(pathname, otherLocale)}>
            {locale.toUpperCase()} / <span className="text-paper">{otherLocale.toUpperCase()}</span>
          </Link>
        </div>

        <div className="col-span-3 row-start-1 flex items-center justify-between lg:hidden">
          <button className="kicker text-paper" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
            {open ? labels.close : labels.menu}
          </button>
          <Link className="kicker text-muted" href={localePath(pathname, otherLocale)}>{otherLocale.toUpperCase()}</Link>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-background lg:hidden">
          <nav className="site-container grid py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(locale, item.href)}
                className="border-b border-line py-5 font-display text-3xl font-black uppercase tracking-[-0.03em]"
                onClick={() => setOpen(false)}
              >
                {labels[item.key]}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
