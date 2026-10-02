"use client";

import { useEffect, useState } from "react";
import type { Show } from "@/content/schemas";
import { fetchBandsintownShows } from "./providers/bandsintown";
import { fetchLocalShows } from "./providers/local";

type ShowsState = {
  shows: Show[];
  loading: boolean;
  source: "bandsintown" | "local";
};

export function useShows(): ShowsState {
  const [state, setState] = useState<ShowsState>({
    shows: [],
    loading: true,
    source: "local",
  });

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const shows = await fetchBandsintownShows(controller.signal);
        setState({ shows, loading: false, source: "bandsintown" });
      } catch {
        const shows = await fetchLocalShows();
        setState({ shows, loading: false, source: "local" });
      }
    }

    void load();
    return () => controller.abort();
  }, []);

  return state;
}
