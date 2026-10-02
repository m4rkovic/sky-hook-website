import { showSchema } from "./schemas";

// Temporary layout placeholders until the live feed is connected.
// Keep "placeholder" visible in the venue name so these cannot be mistaken for announced shows.
export const localShows = showSchema.array().parse([
  {
    id: "placeholder-2026-10-24-nis",
    datetime: "2026-10-24T20:00:00+02:00",
    venue: "TBA — placeholder",
    city: "Niš",
    country: "Serbia",
    title: "Placeholder date — replace before publish",
    source: "local",
  },
  {
    id: "placeholder-2026-11-07-belgrade",
    datetime: "2026-11-07T20:00:00+01:00",
    venue: "TBA — placeholder",
    city: "Beograd",
    country: "Serbia",
    title: "Placeholder date — replace before publish",
    source: "local",
  },
  {
    id: "placeholder-2026-11-21-novi-sad",
    datetime: "2026-11-21T20:00:00+01:00",
    venue: "TBA — placeholder",
    city: "Novi Sad",
    country: "Serbia",
    title: "Placeholder date — replace before publish",
    source: "local",
  },
]);
