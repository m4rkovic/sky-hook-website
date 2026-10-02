import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-background py-12">
      <div className="site-container grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Image src={siteConfig.logo} width={2172} height={724} alt="Sky Hook" className="h-auto w-56" />
          <p className="mt-5 max-w-md text-sm text-muted">Official Sky Hook website. Content, releases and dates are structured so the site can evolve without a rebuild of its core architecture.</p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-3" aria-label="Footer navigation">
          {siteConfig.navigation.filter((item) => item.showInNavigation).map((item) => (
            <Link key={item.href} href={item.href} className="kicker text-muted hover:text-ice">{item.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
