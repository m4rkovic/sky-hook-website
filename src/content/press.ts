import copy from "./press.json";
import { siteConfig } from "./site";
import type { Locale } from "@/i18n/config";

export const pressCopy = copy;
export const pressKitUrl = "/press/sky-hook-press-kit.zip";
export const pressPhotos = [
  { src: "/press/sky-hook-band.jpg", kind: "portrait", width: 2200, height: 1426 },
  { src: "/media/photos/skyhook-live-02.jpg", kind: "live", width: 1200, height: 800 },
  { src: "/media/photos/skyhook-live-01.jpg", kind: "live", width: 1200, height: 800 },
] as const;

export const pressHighlights = [
  { year: "2026", title: "Nišville Open Stage", city: "Niš" },
  { year: "2026", title: "Čupin Rock Memorijal", city: "Niš" },
  { year: "2026", title: "Pub Dže", city: "Skopje" },
  { year: "2026", title: "Sprat", city: "Beograd" },
];

// Opens a draft in the visitor's email app; no message is sent by the website.
export function bookingHref(locale: Locale, kind: "booking" | "press" | "technical" = "booking") {
  const t = pressCopy[locale];
  const params = new URLSearchParams({ subject: t[`${kind}Subject`] });
  if (kind === "booking") params.set("body", t.bookingTemplate);
  return `mailto:${siteConfig.contact.bookingEmail}?${params.toString().replace(/\+/g, "%20")}`;
}
