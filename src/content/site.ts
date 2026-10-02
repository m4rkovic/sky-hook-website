import { navItemSchema } from "./schemas";

export const siteConfig = {
  name: "Sky Hook",
  shortName: "SKY HOOK",
  description: "Official website of Sky Hook.",
  logo: "/brand/sky-hook-wordmark.png",
  navigation: navItemSchema.array().parse([
    { key: "live", href: "/live" },
    { key: "music", href: "/music" },
    { key: "band", href: "/band" },
    { key: "media", href: "/media" },
    { key: "news", href: "/news", showInNavigation: false },
    { key: "contact", href: "/contact" },
  ]),
  contact: {
    bookingEmail: "skyhooknis@hotmail.com",
  },
  socials: {
    instagram: "https://www.instagram.com/skyhookofficial/",
    youtube: "https://www.youtube.com/@skyhook1717",
    bandcamp: "https://skyhooknis.bandcamp.com/",
    facebook: "https://www.facebook.com/skyhooknis",
    spotify: "",
    bandsintown: "",
  },
  externalIds: {
    setlistFmMbid: "3d1204e0-b00c-4b17-80fc-e55b7f4690b0",
  },
} as const;
