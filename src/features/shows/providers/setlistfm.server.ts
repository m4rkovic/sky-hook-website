import { z } from "zod";
import { archiveShowSchema, liveStatsSchema, type ArchiveShow, type LiveStats } from "@/content/schemas";
import { siteConfig } from "@/content/site";

const artistSchema = z.object({ name: z.string().optional() }).passthrough();
const songSchema = z.object({
  name: z.string(),
  cover: artistSchema.optional(),
  info: z.string().optional(),
  tape: z.boolean().optional().default(false),
}).passthrough();
const setSchema = z.object({
  name: z.string().optional(),
  encore: z.number().int().optional(),
  song: z.array(songSchema).optional().default([]),
}).passthrough();
const citySchema = z.object({
  name: z.string().optional(),
  state: z.string().optional(),
  stateCode: z.string().optional(),
  country: z.object({ name: z.string().optional(), code: z.string().optional() }).optional(),
}).passthrough();
const setlistSchema = z.object({
  id: z.string(),
  eventDate: z.string(),
  url: z.string().url(),
  venue: z.object({
    name: z.string().optional(),
    city: citySchema.optional(),
  }).passthrough(),
  tour: z.object({ name: z.string().optional() }).optional(),
  set: z.array(setSchema).optional().default([]),
  info: z.string().optional(),
}).passthrough();
const pageSchema = z.object({
  setlist: z.array(setlistSchema).optional().default([]),
  total: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  itemsPerPage: z.number().int().positive(),
});

type SetlistPage = z.infer<typeof pageSchema>;
type RawSetlist = z.infer<typeof setlistSchema>;

function isoDate(eventDate: string) {
  const [day, month, year] = eventDate.split("-");
  return `${year}-${month}-${day}`;
}

function normalizeSetlist(item: RawSetlist): ArchiveShow {
  const city = item.venue.city;
  return archiveShowSchema.parse({
    id: item.id,
    date: isoDate(item.eventDate),
    venue: item.venue.name || "Unknown venue",
    city: city?.name || "Unknown city",
    region: city?.state || city?.stateCode || undefined,
    country: city?.country?.name || city?.country?.code || undefined,
    tour: item.tour?.name || undefined,
    info: item.info || undefined,
    sourceUrl: item.url,
    sets: item.set.map((set) => ({
      name: set.name,
      encore: set.encore,
      songs: set.song.map((song) => ({
        name: song.name,
        coverArtist: song.cover?.name,
        info: song.info,
        tape: song.tape,
      })),
    })),
  });
}

async function fetchPage(apiKey: string, mbid: string, page: number): Promise<SetlistPage> {
  const endpoint = new URL(`https://api.setlist.fm/rest/1.0/artist/${encodeURIComponent(mbid)}/setlists`);
  endpoint.searchParams.set("p", String(page));
  const response = await fetch(endpoint, {
    headers: {
      Accept: "application/json",
      "x-api-key": apiKey,
    },
    next: { revalidate: 1209600 },
  });
  if (!response.ok) throw new Error(`setlist.fm request failed: ${response.status}`);
  return pageSchema.parse(await response.json());
}

function calculateStats(shows: ArchiveShow[], totalShows: number): LiveStats {
  const cities = new Set<string>();
  const countries = new Set<string>();
  const songCounts = new Map<string, number>();

  for (const show of shows) {
    cities.add(show.city.trim().toLowerCase());
    if (show.country) countries.add(show.country.trim().toLowerCase());
    const playedThisShow = new Set<string>();
    for (const set of show.sets) {
      for (const song of set.songs) {
        if (song.tape) continue;
        playedThisShow.add(song.name.trim());
      }
    }
    for (const songName of playedThisShow) songCounts.set(songName, (songCounts.get(songName) ?? 0) + 1);
  }

  const topSongs = [...songCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([name, performances]) => ({ name, performances }));

  return liveStatsSchema.parse({
    totalShows,
    cities: cities.size,
    countries: countries.size,
    uniqueSongs: songCounts.size,
    topSongs,
  });
}

export async function fetchSetlistArchive(): Promise<{ shows: ArchiveShow[]; stats: LiveStats }> {
  const apiKey = process.env.SETLISTFM_API_KEY?.trim();
  const mbid = process.env.SETLISTFM_ARTIST_MBID?.trim() || siteConfig.externalIds.setlistFmMbid;
  if (!apiKey) throw new Error("setlist.fm is not configured.");

  const first = await fetchPage(apiKey, mbid, 1);
  const pageCount = Math.max(1, Math.ceil(first.total / first.itemsPerPage));
  const pages: SetlistPage[] = [first];

  // Sequential on purpose. Sky Hook currently has a small archive and this is kinder to setlist.fm rate limits.
  for (let page = 2; page <= pageCount; page += 1) {
    pages.push(await fetchPage(apiKey, mbid, page));
  }

  const shows = pages
    .flatMap((page) => page.setlist)
    .map(normalizeSetlist)
    .sort((a, b) => b.date.localeCompare(a.date));

  return { shows, stats: calculateStats(shows, first.total) };
}
