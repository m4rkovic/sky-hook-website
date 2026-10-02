import { navItemSchema } from "./schemas";

export const siteConfig = {
  name: "Sky Hook",
  shortName: "SKY HOOK",
  description: "Official website of Sky Hook.",
  logo: "/brand/sky-hook-wordmark.png",
  navigation: navItemSchema.array().parse([
    { label: "Live", href: "/live" },
    { label: "Music", href: "/music" },
    { label: "Band", href: "/band" },
    { label: "Media", href: "/media" },
    { label: "News", href: "/news", showInNavigation: false },
    { label: "Contact", href: "/contact" },
  ]),
  contact: {
    bookingEmail: "",
  },
  socials: {
    instagram: "",
    youtube: "",
    spotify: "",
    bandsintown: "",
  },
} as const;
