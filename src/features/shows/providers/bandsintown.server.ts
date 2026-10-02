import { z } from "zod";
import { showSchema, type Show } from "@/content/schemas";

const bandsintownEventSchema = z.object({
  id: z.union([z.string(), z.number()]),
  datetime: z.string(),
  title: z.string().optional().nullable(),
  url: z.string().url().optional().nullable(),
  venue: z.object({
    name: z.string(),
    city: z.string().optional().default(""),
    region: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
  }),
  offers: z.array(z.object({
    type: z.string().optional(),
    status: z.string().optional(),
    url: z.string().url().optional(),
  })).optional().default([]),
});

const responseSchema = z.array(bandsintownEventSchema);

function mapEvent(event: z.infer<typeof bandsintownEventSchema>): Show {
  const ticketOffer = event.offers.find((offer) => offer.url && offer.status !== "unavailable");
  return showSchema.parse({
    id: String(event.id),
    datetime: event.datetime,
    venue: event.venue.name,
    city: event.venue.city || "TBA",
    region: event.venue.region || undefined,
    country: event.venue.country || undefined,
    title: event.title || undefined,
    eventUrl: event.url || undefined,
    ticketUrl: ticketOffer?.url,
    source: "bandsintown",
  });
}

export async function fetchBandsintownShows(): Promise<Show[]> {
  const appId = process.env.BANDSINTOWN_APP_ID?.trim();
  const artist = process.env.BANDSINTOWN_ARTIST?.trim() || "Sky Hook";
  if (!appId) throw new Error("Bandsintown is not configured.");

  const endpoint = new URL(`https://rest.bandsintown.com/artists/${encodeURIComponent(artist)}/events`);
  endpoint.searchParams.set("app_id", appId);
  endpoint.searchParams.set("date", "upcoming");

  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });

  if (response.status === 404) return [];
  if (!response.ok) throw new Error(`Bandsintown request failed: ${response.status}`);

  return responseSchema.parse(await response.json()).map(mapEvent);
}
