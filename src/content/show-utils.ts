import type { ArchiveShow } from "./schemas";

export function showSlug(show: Pick<ArchiveShow, "date" | "id">) {
  return `${show.date}-${show.id}`;
}

export function showFromSlug(shows: ArchiveShow[], slug: string) {
  return shows.find((show) => showSlug(show) === slug);
}
