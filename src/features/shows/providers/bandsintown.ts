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
  offers: z
    .array(
      z.object({
        type: z.string().optional(),
        status: z.string().optional(),
        url: z.string().url().optional(),
      }),
    )
    .optional()
    .default([]),
});

const bandsintownResponseSchema = z.array(bandsintownEventSchema);
const CACHE_TTL_MS = 10 * 60 * 1000;
const NOT_FOUND_TTL_MS = 24 * 60 * 60 * 1000;

type CachedPayload = {
  expiresAt: number;
  status: "ok" | "not-found";
  data: Show[];
};

function cacheKey(artist: string) {
  return `sky-hook:bandsintown:${artist}`;
}

function readCache(artist: string): CachedPayload | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(cacheKey(artist));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload;
    if (Date.now() >= parsed.expiresAt) {
      window.localStorage.removeItem(cacheKey(artist));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(artist: string, payload: CachedPayload) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(cacheKey(artist), JSON.stringify(payload));
  } catch {
    // Storage failure must never break the event list.
  }
}

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

export async function fetchBandsintownShows(signal?: AbortSignal): Promise<Show[]> {
  const appId = process.env.NEXT_PUBLIC_BANDSINTOWN_APP_ID?.trim();
  const artist = process.env.NEXT_PUBLIC_BANDSINTOWN_ARTIST?.trim();

  if (!appId || !artist) {
    throw new Error("Bandsintown is not configured.");
  }

  const cached = readCache(artist);
  if (cached) return cached.data;

  const endpoint = new URL(
    `https://rest.bandsintown.com/artists/${encodeURIComponent(artist)}/events`,
  );
  endpoint.searchParams.set("app_id", appId);
  endpoint.searchParams.set("date", "upcoming");

  const response = await fetch(endpoint, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (response.status === 404) {
    writeCache(artist, {
      expiresAt: Date.now() + NOT_FOUND_TTL_MS,
      status: "not-found",
      data: [],
    });
    return [];
  }

  if (!response.ok) {
    throw new Error(`Bandsintown request failed: ${response.status}`);
  }

  const json: unknown = await response.json();
  const events = bandsintownResponseSchema.parse(json).map(mapEvent);

  writeCache(artist, {
    expiresAt: Date.now() + CACHE_TTL_MS,
    status: "ok",
    data: events,
  });

  return events;
}
