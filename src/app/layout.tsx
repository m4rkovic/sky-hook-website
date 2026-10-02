import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sky Hook",
    template: "%s | Sky Hook",
  },
  description: siteConfig.description,
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const musicGroupJsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: siteConfig.name,
  };

  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupJsonLd) }} />
      </body>
    </html>
  );
}
