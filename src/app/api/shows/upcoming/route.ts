import { NextResponse } from "next/server";
import { localShows } from "@/content/shows.local";
import { fetchBandsintownShows } from "@/features/shows/providers/bandsintown.server";

export async function GET() {
  try {
    const shows = await fetchBandsintownShows();
    return NextResponse.json({ shows, source: "bandsintown" }, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800" },
    });
  } catch {
    return NextResponse.json({ shows: localShows, source: "local" }, {
      headers: { "Cache-Control": "public, s-maxage=60" },
    });
  }
}
