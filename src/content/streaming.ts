import { z } from "zod";
import data from "./streaming.json";
import { streamingLinksSchema } from "./schemas";

// Album track lists were matched by title, track order and album identity.
// Sources: Spotify album embed, Apple iTunes lookup, TIDAL album embed,
// and public Odesli album pages for Deezer, Amazon Music and Anghami.
// YouTube URLs are supplied by the band. Refreshed 2026-10-03.
const streaming = z.object({
  album: streamingLinksSchema,
  songs: z.record(z.string(), streamingLinksSchema),
}).parse(data);

export const albumStreaming = streaming.album;
export const songStreaming = streaming.songs;
