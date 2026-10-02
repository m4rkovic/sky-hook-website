"use client";

import { useEffect, useState } from "react";
import { showSchema, type Show } from "@/content/schemas";

type ShowsState = { shows: Show[]; loading: boolean; source: "bandsintown" | "local" };

export function useShows(): ShowsState {
  const [state, setState] = useState<ShowsState>({ shows: [], loading: true, source: "local" });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/shows/upcoming", { signal: controller.signal });
        if (!response.ok) throw new Error("Upcoming shows request failed");
        const payload = await response.json() as { shows?: unknown; source?: "bandsintown" | "local" };
        const shows = showSchema.array().parse(payload.shows ?? []);
        setState({ shows, loading: false, source: payload.source === "bandsintown" ? "bandsintown" : "local" });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setState({ shows: [], loading: false, source: "local" });
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  return state;
}
