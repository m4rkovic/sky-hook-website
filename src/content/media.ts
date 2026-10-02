import { mediaItemSchema } from "./schemas";

export const mediaItems = mediaItemSchema.array().parse([
  {
    id: "live-01",
    type: "photo",
    category: "live",
    src: "/media/photos/skyhook-live-01.jpg",
    alt: "Sky Hook performing live under warm stage lights",
    credit: "TBD",
    focalPoint: "50% 48%",
  },
  {
    id: "live-02",
    type: "photo",
    category: "live",
    src: "/media/photos/skyhook-live-02.jpg",
    alt: "Sky Hook performing live under blue and white stage lights",
    credit: "TBD",
    focalPoint: "50% 50%",
  },
]);
