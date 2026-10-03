import songData from "./songs.json";
import { z } from "zod";

// Original Serbian lyrics are shared across both interface languages.
export const songs = z.array(z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  duration: z.string(),
  lyrics: z.string().min(1),
  credits: z.array(z.object({ role: z.string(), name: z.string() })),
})).parse(songData);

export function getSong(slug: string) {
  return songs.find((song) => song.slug === slug);
}
