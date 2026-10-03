"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SkyHookLogo } from "@/components/brand/sky-hook-logo";
import { siteConfig } from "@/content/site";
import { localizedHref, type Locale } from "@/i18n/config";

type NavLabels = Record<"live" | "music" | "band" | "media" | "news" | "contact", string>;

type HeaderLabels = NavLabels & { menu: string; close: string };

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={`kicker border-b-2 px-1 py-1 transition-colors ${active ? "border-ice bg-ice text-background" : "border-transparent text-paper hover:border-ice hover:text-ice"}`}
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
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  const navItems = useMemo(
    () => siteConfig.navigation.filter((item) => item.showInNavigation),
    [],
  );

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 72);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const midpoint = Math.ceil(navItems.length / 2);
  const left = navItems.slice(0, midpoint);
  const right = navItems.slice(midpoint);
  const otherLocale: Locale = locale === "en" ? "sr" : "en";
  const compactLogo = scrolled && !logoHovered;

  const renderNavItem = (item: (typeof navItems)[number]) => {
    const href = localizedHref(locale, item.href);
    return <NavLink key={item.href} href={href} label={labels[item.key]} pathname={pathname} />;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-line bg-background/95">
      <div className="site-container relative grid h-[var(--sh-header-h)] grid-cols-[1fr_auto_1fr] items-center">
        <nav className="hidden items-center justify-end gap-7 pr-10 lg:flex" aria-label="Primary navigation left">
          {left.map(renderNavItem)}
        </nav>

        <Link
          href={`/${locale}`}
          className={`relative z-20 flex h-[calc(var(--sh-header-h)+1.05rem)] items-center justify-center self-start px-2 transition-[width,transform] duration-300 ease-out ${compactLogo ? "w-[5.25rem]" : "w-[clamp(11rem,16vw,15rem)]"}`}
          aria-label="Sky Hook home"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <div className="relative h-12 w-full">
            <SkyHookLogo
              variant="full"
              className={`absolute inset-0 h-full w-full translate-x-[clamp(0.75rem,1.15vw,1.15rem)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)] transition-all duration-300 ${compactLogo ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
            />
            <SkyHookLogo
              variant="monogram"
              className={`absolute inset-0 h-full w-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)] transition-all duration-300 ${compactLogo ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-7 pl-10 pr-28 lg:flex" aria-label="Primary navigation right">
          {right.map(renderNavItem)}
        </nav>

        <Link
          className="absolute right-[var(--sh-gutter)] top-1/2 hidden -translate-y-1/2 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-muted/70 transition-colors hover:text-paper lg:block"
          href={localePath(pathname, otherLocale)}
          aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
        >
          <span className={locale === "en" ? "text-paper" : ""}>EN</span>
          <span className="px-1.5 text-muted/35">/</span>
          <span className={locale === "sr" ? "text-paper" : ""}>SR</span>
        </Link>

        <div className="col-span-3 row-start-1 flex items-center justify-between lg:hidden">
          <button
            className="kicker flex min-h-11 min-w-11 items-center text-paper"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-site-navigation"
            aria-label={open ? labels.close : labels.menu}
          >
            {open ? labels.close : labels.menu}
          </button>
          <Link
            className="flex min-h-11 min-w-11 items-center justify-end text-[0.63rem] font-bold uppercase tracking-[0.14em] text-muted/70"
            href={localePath(pathname, otherLocale)}
            aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      </div>

      {open ? (
        <div id="mobile-site-navigation" className="border-t border-line bg-background lg:hidden">
          <nav className="site-container grid py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizedHref(locale, item.href)}
                className="border-b border-line py-5 font-display text-3xl uppercase"
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
