import { z } from "zod";

export const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().default(false),
  showInNavigation: z.boolean().default(true),
});

export const releaseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(["album", "ep", "single"]),
  year: z.number().int().min(1900),
  artwork: z.string().optional(),
  listenUrl: z.string().url().optional(),
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
  datetime: z.string().datetime({ offset: true }).or(z.string().datetime()),
  venue: z.string().min(1),
  city: z.string().min(1),
  region: z.string().optional(),
  country: z.string().optional(),
  title: z.string().optional(),
  eventUrl: z.string().url().optional(),
  ticketUrl: z.string().url().optional(),
  source: z.enum(["bandsintown", "local"]),
});

export type NavItem = z.infer<typeof navItemSchema>;
export type Release = z.infer<typeof releaseSchema>;
export type Member = z.infer<typeof memberSchema>;
export type MediaItem = z.infer<typeof mediaItemSchema>;
export type Show = z.infer<typeof showSchema>;
