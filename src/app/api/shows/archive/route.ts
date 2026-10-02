import { NextResponse } from "next/server";
import { fetchSetlistArchive } from "@/features/shows/providers/setlistfm.server";

export async function GET() {
  try {
    const data = await fetchSetlistArchive();
    return NextResponse.json({ ...data, source: "setlistfm" }, {
      headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=300" },
    });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("not configured") ? "not-configured" : "unavailable";
    return NextResponse.json({ error: message }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
