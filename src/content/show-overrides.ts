import { z } from "zod";
import type { Locale } from "@/i18n/config";
import type { ArchiveShow } from "./schemas";

const localizedSchema = z.object({ en: z.string(), sr: z.string() });

const showOverrideSchema = z.object({
  match: z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    venueIncludes: z.string().optional(),
    city: z.string().optional(),
  }),
  title: localizedSchema.optional(),
  description: localizedSchema.optional(),
  imageId: z.string().optional(),
  videoUrl: z.string().url().optional(),
  posterUrl: z.string().optional(),
  links: z.array(z.object({
    label: localizedSchema,
    url: z.string().url(),
  })).default([]),
});

export type ShowOverride = z.infer<typeof showOverrideSchema>;

export const showOverrides = showOverrideSchema.array().parse([
  {
    match: { date: "2026-08-09", venueIncludes: "Nišville" },
    title: { en: "Nišville 2026", sr: "Nišville 2026" },
    description: {
      en: "Sky Hook live at Nišville 2026. This page is ready for the full live video, selected photography and show notes.",
      sr: "Sky Hook uživo na Nišville-u 2026. Stranica je spremna za ceo live snimak, odabrane fotografije i beleške sa nastupa.",
    },
    imageId: "live-02",
  },
  {
    match: { date: "2026-07-18", venueIncludes: "Čupin" },
    title: { en: "Čupin Rock Memorial", sr: "Čupin Rock Memorijal" },
    description: {
      en: "A Sky Hook show at Čupin Rock Memorial in Rovče, later used as the live setting for material around the band's Dobri Isak cover.",
      sr: "Nastup Sky Hooka na Čupin Rock Memorijalu u Rovču, koji je kasnije poslužio i kao live okruženje za materijal oko obrade Dobrog Isaka.",
    },
    imageId: "live-01",
  },
]);

export function getShowOverride(show: ArchiveShow): ShowOverride | undefined {
  return showOverrides.find((override) => {
    if (override.match.date !== show.date) return false;
    if (override.match.city && override.match.city.toLowerCase() !== show.city.toLowerCase()) return false;
    if (override.match.venueIncludes && !show.venue.toLowerCase().includes(override.match.venueIncludes.toLowerCase())) return false;
    return true;
  });
}

export function localizedOverride(value: { en: string; sr: string } | undefined, locale: Locale) {
  return value?.[locale];
}
