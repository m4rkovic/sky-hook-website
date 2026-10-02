import { showSchema } from "./schemas";

// Deliberately empty: do not invent future shows.
// This is a fallback source if Bandsintown is unavailable.
export const localShows = showSchema.array().parse([]);
