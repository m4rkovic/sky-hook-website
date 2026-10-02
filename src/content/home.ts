export type HomeBlock =
  | {
      type: "hero";
      imageId: string;
      campaign: {
        eyebrow: { en: string; sr: string };
        title: { en: string; sr: string };
        body: { en: string; sr: string };
        primary: { label: { en: string; sr: string }; href: string };
        secondary?: { label: { en: string; sr: string }; href: string };
      };
    }
  | { type: "featured-release" }
  | { type: "upcoming-shows"; limit: number }
  | { type: "split-media"; imageId: string; href: string };

export const homeBlocks: HomeBlock[] = [
  {
    type: "hero",
    imageId: "live-02",
    campaign: {
      eyebrow: { en: "Sky Hook / Official", sr: "Sky Hook / Zvanično" },
      title: { en: "Gde ptice lete", sr: "Gde ptice lete" },
      body: {
        en: "The debut album. Thirteen songs, one record, no neat little genre box.",
        sr: "Debitantski album. Trinaest pesama, jedna ploča i bez uredne male žanrovske kutije.",
      },
      primary: { label: { en: "Listen now", sr: "Slušaj" }, href: "/listen/gde-ptice-lete" },
      secondary: { label: { en: "Explore music", sr: "Muzika" }, href: "/music" },
    },
  },
  { type: "featured-release" },
  { type: "upcoming-shows", limit: 4 },
  { type: "split-media", imageId: "live-01", href: "/band" },
];
