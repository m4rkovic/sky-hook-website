import { localShows } from "@/content/shows.local";
import type { Show } from "@/content/schemas";

export async function fetchLocalShows(): Promise<Show[]> {
  return localShows;
}
