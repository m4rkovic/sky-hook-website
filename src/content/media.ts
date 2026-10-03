import { releases } from "./releases";
import { mediaItemSchema } from "./schemas";

export const mediaItems = mediaItemSchema.array().parse([
  {
    id: "live-01",
    type: "photo",
    category: "live",
    src: "/media/photos/skyhook-live-01.jpg",
    alt: "Sky Hook performing live under warm stage lights",
    focalPoint: "50% 48%",
  },
  {
    id: "live-02",
    type: "photo",
    category: "live",
    src: "/media/photos/skyhook-live-02.jpg",
    alt: "Sky Hook performing live under blue and white stage lights",
    focalPoint: "50% 50%",
  },
  {
    "id": "live-vocals",
    "type": "photo",
    "category": "live",
    "src": "/media/photos/live-vocals.webp",
    "alt": "Sky Hook vocalist performing under blue stage lights",
    "focalPoint": "50% 50%"
  },
  {
    "id": "live-guitar",
    "type": "photo",
    "category": "live",
    "src": "/media/photos/live-guitar.webp",
    "alt": "Sky Hook guitarist playing a Telecaster on stage",
    "focalPoint": "50% 50%"
  },
  {
    "id": "live-frontman",
    "type": "photo",
    "category": "live",
    "src": "/media/photos/live-frontman.webp",
    "alt": "Sky Hook vocalist and guitarist on stage",
    "focalPoint": "50% 50%"
  },
  {
    "id": "live-red",
    "type": "photo",
    "category": "live",
    "src": "/media/photos/live-red.webp",
    "alt": "Sky Hook performing under red stage lights",
    "focalPoint": "50% 50%"
  },
  {
    "id": "live-wide",
    "type": "photo",
    "category": "live",
    "src": "/media/photos/live-wide.webp",
    "alt": "Sky Hook on stage under purple lights",
    "focalPoint": "50% 50%"
  },
  {
    "id": "press-rooftop",
    "type": "photo",
    "category": "press",
    "src": "/media/photos/press-rooftop.webp",
    "alt": "Sky Hook band portrait on a rooftop",
    "focalPoint": "50% 50%"
  },
  {
    "id": "press-rehearsal",
    "type": "photo",
    "category": "press",
    "src": "/media/photos/press-rehearsal.webp",
    "alt": "Sky Hook band portrait in a rehearsal room",
    "focalPoint": "50% 50%"
  },
  {
    "id": "press-studio",
    "type": "photo",
    "category": "press",
    "src": "/media/photos/press-studio.webp",
    "alt": "Black and white studio portrait of Sky Hook",
    "focalPoint": "50% 50%"
  },
  ...releases.filter((release) => release.artwork).map((release) => ({
    id: `artwork-${release.slug}`, type: "photo", category: "artwork",
    src: release.artwork!, alt: `${release.title} / ${release.type} artwork`,
  })),
]);
