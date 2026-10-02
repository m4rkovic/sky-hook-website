import { NextResponse } from "next/server";
import { localShows } from "@/content/shows.local";
import { fetchBandsintownShows } from "@/features/shows/providers/bandsintown.server";

export async function GET() {
  try {
    const remoteShows = await fetchBandsintownShows();
    const shows = [...localShows, ...remoteShows]
      .filter((show, index, all) => all.findIndex((candidate) => candidate.id === show.id) === index)
      .sort((a, b) => a.datetime.localeCompare(b.datetime));

    return NextResponse.json({ shows, source: remoteShows.length ? "bandsintown" : "local" }, {
      headers: { "Cache-Control": "public, s-maxage=1209600, stale-while-revalidate=604800" },
    });
  } catch {
    return NextResponse.json({ shows: localShows, source: "local" }, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=1800" },
    });
  }
}
