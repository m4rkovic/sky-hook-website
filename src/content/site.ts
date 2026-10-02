import { navItemSchema } from "./schemas";

export const siteConfig = {
  name: "Sky Hook",
  shortName: "SKY HOOK",
  description: "Official website of Sky Hook.",
  logo: "/brand/sky-hook-wordmark.png",
  socialImage: "/media/photos/skyhook-live-02.jpg",
  navigation: navItemSchema.array().parse([
    { key: "live", href: "/live" },
    { key: "music", href: "/music" },
    { key: "band", href: "/band" },
    { key: "media", href: "/media" },
    { key: "news", href: "/news" },
    { key: "contact", href: "/contact" },
  ]),
  contact: {
    bookingEmail: "skyhooknis@hotmail.com",
  },
  socials: {
    instagram: "https://www.instagram.com/skyhookofficial/?hl=en",
    facebook: "https://www.facebook.com/skyhooknis/",
    youtube: "https://www.youtube.com/@skyhook1717",
    spotify: "https://open.spotify.com/artist/6ttwWEG6a5k6T8OulWGKKJ",
    bandcamp: "",
    bandsintown: "",
  },
  externalIds: {
    setlistFmMbid: "3d1204e0-b00c-4b17-80fc-e55b7f4690b0",
  },
} as const;
