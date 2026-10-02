import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const secret = process.env.CONTENT_REFRESH_SECRET?.trim();
  const authorization = request.headers.get("authorization");

  if (!secret || authorization !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  revalidatePath("/api/shows/upcoming");
  revalidatePath("/api/shows/archive");
  revalidatePath("/en/live", "page");
  revalidatePath("/sr/live", "page");

  return NextResponse.json({
    ok: true,
    refreshed: ["upcoming-shows", "setlist-archive", "live-pages"],
  });
}
