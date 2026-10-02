import { z } from "zod";

export const navItemSchema = z.object({
  key: z.enum(["live", "music", "band", "media", "news", "contact"]),
  href: z.string().min(1),
  external: z.boolean().default(false),
  showInNavigation: z.boolean().default(true),
});

const localizedTextSchema = z.object({
  en: z.string(),
  sr: z.string(),
});

const streamingLinksSchema = z.object({
  spotify: z.string().url().optional(),
  appleMusic: z.string().url().optional(),
  youtube: z.string().url().optional(),
  youtubeMusic: z.string().url().optional(),
  tidal: z.string().url().optional(),
  deezer: z.string().url().optional(),
  bandcamp: z.string().url().optional(),
});

const trackSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  duration: z.string().optional(),
  audioUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  lyrics: localizedTextSchema.optional(),
});

const creditSchema = z.object({
  role: z.string().min(1),
  name: z.string().min(1),
});

export const releaseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["album", "ep", "single"]),
  year: z.number().int().min(1900),
  releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  artwork: z.string().optional(),
  description: localizedTextSchema.optional(),
  label: z.string().optional(),
  catalogNumber: z.string().optional(),
  rights: z.string().optional(),
  streaming: streamingLinksSchema.default({}),
  tracks: z.array(trackSchema).default([]),
  credits: z.array(creditSchema).default([]),
  featured: z.boolean().default(false),
});

export const memberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().optional(),
});

export const mediaItemSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["photo", "video"]),
  src: z.string().min(1),
  alt: z.string().min(1),
  credit: z.string().optional(),
  focalPoint: z.string().optional(),
});

export const showSchema = z.object({
  id: z.string().min(1),
  datetime: z.string().min(1),
  venue: z.string().min(1),
  city: z.string().min(1),
  region: z.string().optional(),
  country: z.string().optional(),
  title: z.string().optional(),
  eventUrl: z.string().url().optional(),
  ticketUrl: z.string().url().optional(),
  source: z.enum(["bandsintown", "local"]),
});

export const archiveSongSchema = z.object({
  name: z.string().min(1),
  coverArtist: z.string().optional(),
  info: z.string().optional(),
  tape: z.boolean().default(false),
});

export const archiveSetSchema = z.object({
  name: z.string().optional(),
  encore: z.number().int().positive().optional(),
  songs: z.array(archiveSongSchema),
});

export const archiveShowSchema = z.object({
  id: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  venue: z.string().min(1),
  city: z.string().min(1),
  region: z.string().optional(),
  country: z.string().optional(),
  tour: z.string().optional(),
  info: z.string().optional(),
  sourceUrl: z.string().url(),
  sets: z.array(archiveSetSchema),
});

export const liveStatsSchema = z.object({
  totalShows: z.number().int().nonnegative(),
  cities: z.number().int().nonnegative(),
  countries: z.number().int().nonnegative(),
  uniqueSongs: z.number().int().nonnegative(),
  topSongs: z.array(z.object({ name: z.string(), performances: z.number().int().positive() })),
});

export type NavItem = z.infer<typeof navItemSchema>;
export type Release = z.infer<typeof releaseSchema>;
export type Member = z.infer<typeof memberSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
export type Show = z.infer<typeof showSchema>;
export type ArchiveShow = z.infer<typeof archiveShowSchema>;
export type LiveStats = z.infer<typeof liveStatsSchema>;
