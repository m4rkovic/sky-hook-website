"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/site";

const navItems = siteConfig.navigation.filter((item) => item.showInNavigation);
const midpoint = Math.ceil(navItems.length / 2);

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={`kicker transition-colors hover:text-ice ${active ? "text-ice" : "text-paper"}`}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const left = navItems.slice(0, midpoint);
  const right = navItems.slice(midpoint);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/82 backdrop-blur-md">
      <div className="site-container grid h-[var(--sh-header-h)] grid-cols-[1fr_auto_1fr] items-center">
        <nav className="hidden items-center justify-end gap-7 pr-10 lg:flex" aria-label="Primary navigation left">
          {left.map((item) => <NavLink key={item.href} href={item.href} label={item.label} />)}
        </nav>

        <Link
          href="/"
          className="relative z-10 flex h-[calc(var(--sh-header-h)+1.35rem)] w-[clamp(10rem,15vw,14rem)] items-center justify-center self-start bg-background px-3"
          aria-label="Sky Hook home"
        >
          <Image
            src={siteConfig.logo}
            alt="Sky Hook"
            width={2172}
            height={724}
            priority
            className="h-auto w-full"
          />
        </Link>

        <nav className="hidden items-center gap-7 pl-10 lg:flex" aria-label="Primary navigation right">
          {right.map((item) => <NavLink key={item.href} href={item.href} label={item.label} />)}
        </nav>

        <div className="col-span-3 row-start-1 flex items-center justify-between lg:hidden">
          <span className="kicker text-muted">Menu</span>
          <Link className="kicker text-muted" href="/contact">Contact</Link>
        </div>
      </div>
    </header>
  );
}
