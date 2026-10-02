import type { Locale } from "@/i18n/config";

export type NewsCategory = "interview" | "press" | "live";

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  category: NewsCategory;
  url: string;
  featured?: boolean;
  imageId?: string;
  summary: Record<Locale, string>;
};

export const newsItems: NewsItem[] = [
  {
    id: "bold-prvi-beogradski-udar-2026",
    title: "Sky Hook pred prvi beogradski udar 2026.",
    source: "BOLD Magazine",
    publishedAt: "2026-01-10",
    category: "interview",
    url: "https://boldmagazine.rs/sky-hook-pred-prvi-beogradski-udar-2026/",
    featured: true,
    imageId: "live-02",
    summary: {
      en: "A long-form conversation about the debut album, live dynamics, the Niš scene, two vocal perspectives and what Sky Hook wanted to carry into 2026.",
      sr: "Veliki razgovor o debitantskom albumu, dinamici nastupa, niškoj sceni, dva vokalna ugla i onome što Sky Hook želi da ponese u 2026.",
    },
  },
  {
    id: "pressing-dva-lica-jednog-umetnika",
    title: "Koktel od prašine i ritam Sky Hooka: Dva lica jednog umetnika",
    source: "Pressing",
    publishedAt: "2026-04-02",
    category: "interview",
    url: "https://www.pressing-magazine.rs/koktel-od-prasine-dva-lica-umetnika/",
    imageId: "live-01",
    summary: {
      en: "A profile connecting poetry and music through drummer Mihajlo Stojanović, with a wider look at Sky Hook’s sound and plans for the year.",
      sr: "Profil koji spaja poeziju i muziku kroz bubnjara Mihajla Stojanovića, uz širi pogled na zvuk Sky Hooka i planove benda za godinu.",
    },
  },
  {
    id: "bold-sprat-2026",
    title: "Sky Hook & Meklur otvaraju koncertnu 2026. u Sprat Baru",
    source: "BOLD Magazine",
    publishedAt: "2026-01-10",
    category: "live",
    url: "https://boldmagazine.rs/sky-hook-meklur-otvaraju-koncertnu-2026-u-sprat-baru/",
    imageId: "live-02",
    summary: {
      en: "A concert preview for the January 2026 Sprat Bar show in Belgrade, pairing Sky Hook with Meklur under the Zeleni kačket banner.",
      sr: "Najava januarskog koncerta u Sprat Baru u Beogradu, gde Sky Hook i Meklur otvaraju koncertnu 2026. pod okriljem Zelenog kačketa.",
    },
  },
  {
    id: "headliner-debi-album",
    title: "Niška petorka Sky Hook objavila debi album „Gde ptice lete“",
    source: "Headliner",
    publishedAt: "2025-04-05",
    category: "press",
    url: "https://headliner.rs/niska-petorka-sky-hook-objavila-debi-album-gde-ptice-lete/",
    imageId: "live-01",
    summary: {
      en: "Headliner marks the release of the 13-track debut album and traces the record’s themes, visual identity and road from early songs to the final band arrangements.",
      sr: "Headliner beleži izlazak debitantskog albuma sa 13 pesama i prolazi kroz njegove teme, vizuelni identitet i put od ranih ideja do finalnih bendovskih aranžmana.",
    },
  },
  {
    id: "city-klub-fest-2023",
    title: "Pliš // Ubili su Batlera // Sky Hook // Klub Fest // 26.11",
    source: "City Magazine",
    publishedAt: "2023-11-26",
    category: "live",
    url: "https://citymagazine.danas.rs/vodic/plis-ubili-su-batlera-sky-hook-klub-fest-26-11/",
    imageId: "live-02",
    summary: {
      en: "An early Belgrade concert listing that also captures one of the first published descriptions of the band’s mix of britpop, surf rock, new wave and heavier guitar music.",
      sr: "Rana beogradska koncertna najava koja čuva i jedan od prvih objavljenih opisa benda, od britpopa i surf roka do novog talasa i težih gitara.",
    },
  },
];

export function newsCategoryLabel(category: NewsCategory, locale: Locale) {
  const labels: Record<Locale, Record<NewsCategory, string>> = {
    en: { interview: "Interview", press: "Press", live: "Live" },
    sr: { interview: "Intervju", press: "Press", live: "Live" },
  };
  return labels[locale][category];
}
