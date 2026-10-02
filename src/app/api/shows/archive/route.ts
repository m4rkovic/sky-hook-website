import { NextResponse } from "next/server";
import { fetchShowArchive } from "@/features/shows/providers/archive.server";

export async function GET() {
  const data = await fetchShowArchive();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": data.source === "setlistfm"
        ? "public, s-maxage=1209600, stale-while-revalidate=604800"
        : "public, s-maxage=300, stale-while-revalidate=1800",
    },
  });
}
