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
  imageUrl?: string;
  summary: Record<Locale, string>;
};

export const newsItems: NewsItem[] = [
  {
    id: "zeleni-kacket-intervju-aleksa",
    title: "„Ideja iza muzike koju stvaram je da bude što jednostavnija u odnosu na ono što se svira u okruženju”: Razgovor sa Aleksom (Sky Hook)",
    source: "Zeleni Kačket",
    publishedAt: "2025-12-09",
    category: "interview",
    url: "https://www.zelenikacket.rs/projects/projekti-4/225306/ideja-iza-muzike-koju-stvaram-je-da-bude-sto-jednostavnija-u-odnosu-na-ono-sto-se-svira-u-okruzenju-razgovor-sa-aleksom-sky-hook.html",
    imageUrl: "https://www.zelenikacket.rs/itsinbox/thumbnail/Sky_Hook_10.png?contentType=image%2Fpng&fileSize=0&thumbId=999395",
    summary: {
      en: "A long conversation about making the debut album independently, the band’s influences, Niš, songwriting and the direction after Gde ptice lete.",
      sr: "Veliki razgovor o samostalnom nastanku debitantskog albuma, uticajima, Nišu, pisanju pesama i smeru benda posle Gde ptice lete.",
    },
  },
  {
    id: "danas-nove-generacije-domaci-rok",
    title: "Sky Hook: Nove generacije ponovo žele da slušaju domaći rok",
    source: "Danas",
    publishedAt: "2025-06-11",
    category: "interview",
    url: "https://www.danas.rs/kultura/scena/sky-hook-nove-generacije-ponovo-zele-da-slusaju-domaci-rok/",
    imageUrl: "https://www.danas.rs/wp-content/uploads/2025/04/Sky-Hook-10-Mateja-Ilicfoto-e1749652999389-1000x560.jpg",
    summary: {
      en: "An interview about the debut album, the newer Serbian guitar scene, the band’s writing process, influences and the story behind the name Sky Hook.",
      sr: "Intervju o debitantskom albumu, novijoj domaćoj gitarskoj sceni, procesu pisanja, uticajima i priči iza imena Sky Hook.",
    },
  },
  {
    id: "highwaystar-melburn",
    title: "Niški bend Sky Hook i Aleksa Paskaš predstavljaju „Melburn”",
    source: "Highwaystar Magazine",
    publishedAt: "2025-04-04",
    category: "press",
    url: "https://highwaystarmagazine.org/niski-bend-sky-hook-i-aleksa-paskas-predstavljaju-melburn/",
    imageUrl: "https://highwaystarmagazine.org/wp-content/uploads/2025/04/Sky-Hook-10-1024x683.png",
    summary: {
      en: "Highwaystar presents Melburn, its origins with Aleksa Paskaš and the video filmed near Niš at Gradac.",
      sr: "Highwaystar predstavlja Melburn, nastanak pesme sa Aleksom Paskašem i spot snimljen kod Gradca u okolini Niša.",
    },
  },
  {
    id: "highwaystar-debi-album",
    title: "Niška petorka Sky Hook objavila debi album „Gde Ptice Lete”",
    source: "Highwaystar Magazine",
    publishedAt: "2025-04-05",
    category: "press",
    url: "https://highwaystarmagazine.org/niska-petorka-sky-hook-objavila-debi-album-gde-ptice-lete/",
    imageUrl: "https://highwaystarmagazine.org/wp-content/uploads/2025/04/%D0%BF%D1%80%D0%B5%D1%83%D0%B7%D0%B8%D0%BC%D0%B0%D1%9A%D0%B5-95-1024x697.png",
    summary: {
      en: "A release feature on the 13-track debut album, its visual language and the record's path from early songs to finished arrangements.",
      sr: "Tekst o debitantskom albumu sa 13 pesama, njegovom vizuelnom jeziku i putu od ranih pesama do finalnih aranžmana.",
    },
  },
  {
    id: "zeleni-kacket-gde-ptice-lete",
    title: "Sky Hook predstavlja singl „Gde ptice lete”",
    source: "Zeleni Kačket",
    publishedAt: "2025-02-22",
    category: "press",
    url: "https://www.zelenikacket.rs/projects/projekti-4/225187/sky-hook-predstavlja-singl-gde-ptice-lete.html",
    imageUrl: "https://www.zelenikacket.rs/itsinbox/thumbnail/sky_hook_promo_photo_single_motion_2_%281%29.png?contentType=image%2Fpng&fileSize=0&thumbId=998445",
    summary: {
      en: "Zeleni Kačket introduces the title-track single ahead of the debut album and traces how the song changed from its early 2022 form.",
      sr: "Zeleni Kačket predstavlja naslovni singl pred album i beleži kako se pesma menjala od prve verzije nastale 2022.",
    },
  },
  {
    id: "balkanrock-svasta-ima-po-grad",
    title: "Podkast „Svašta ima po grad“ slavi prvi rođendan u klubu AKC Fuzz",
    source: "Balkanrock",
    publishedAt: "2023-08-31",
    category: "live",
    url: "https://balkanrock.com/vesti/najave/podkast-svasta-ima-po-grad-slavi-prvi-rodjendan-u-klubu-akc-fuzz/",
    imageId: "live-02",
    summary: {
      en: "An early Balkanrock concert announcement featuring Sky Hook and Lufter at AKC Fuzz in Niš.",
      sr: "Rana Balkanrock najava nastupa Sky Hooka i Luftera u niškom AKC Fuzz-u.",
    },
  },
  {
    id: "bold-prvi-beogradski-udar-2026",
    title: "Sky Hook pred prvi beogradski udar 2026.",
    source: "BOLD Magazine",
    publishedAt: "2026-01-10",
    category: "interview",
    url: "https://boldmagazine.rs/sky-hook-pred-prvi-beogradski-udar-2026/",
    featured: true,
    imageUrl: "https://boldmagazine.rs/wp-content/uploads/2026/01/1-8.png",
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
