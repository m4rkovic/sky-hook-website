import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/content/site";
import { SiteIntro } from "@/components/brand/site-intro";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const metadata: Metadata = {
  title: {
    default: "Sky Hook",
    template: "%s | Sky Hook",
  },
  description: siteConfig.description,
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Sky Hook",
    title: "Sky Hook",
    description: siteConfig.description,
    ...(siteUrl ? { images: [{ url: `${siteUrl}${siteConfig.socialImage}`, alt: "Sky Hook" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Hook",
    description: siteConfig.description,
    ...(siteUrl ? { images: [`${siteUrl}${siteConfig.socialImage}`] } : {}),
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SiteIntro />
        {children}
      </body>
    </html>
  );
}
