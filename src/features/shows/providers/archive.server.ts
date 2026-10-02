import { localArchiveShows, localArchiveStats } from "@/content/shows.archive.local";
import { fetchSetlistArchive } from "./setlistfm.server";

export async function fetchShowArchive() {
  try {
    const data = await fetchSetlistArchive();
    return { ...data, source: "setlistfm" as const };
  } catch {
    return {
      shows: localArchiveShows,
      stats: localArchiveStats,
      source: "local" as const,
    };
  }
}
