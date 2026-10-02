import type { Locale } from "@/i18n/config";

type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

export type BandMember = {
  name: string;
  role: Record<Locale, string>;
  imageId?: string;
};

export const bandMembers: BandMember[] = [
  { name: "Member 01", role: { en: "Vocals / instrument", sr: "Vokal / instrument" } },
  { name: "Member 02", role: { en: "Vocals / instrument", sr: "Vokal / instrument" } },
  { name: "Member 03", role: { en: "Instrument", sr: "Instrument" } },
  { name: "Member 04", role: { en: "Instrument", sr: "Instrument" } },
];

type BandCopy = {
  intro: string;
  secondary: string;
  soundTitle: string;
  soundBody: string;
  timelineTitle: string;
  timeline: TimelineItem[];
  nowTitle: string;
  nowBody: string;
  membersTitle: string;
  membersBody: string;
  membersPending: string;
};

export const bandCopy: Record<Locale, BandCopy> = {
  en: {
    intro:
      "Sky Hook grew out of unfinished songs, rehearsal-room noise and the urge to make guitar music that could still surprise us. The band’s roots reach back to 2022, while the identity that people now know as Sky Hook took shape in Niš during 2023.",
    secondary:
      "Melody matters, but so does friction. Britpop-sized hooks can sit next to post-punk tension, surf-rock movement, noise, feedback and heavier guitar textures. The point was never to fit inside one scene. The point was to make songs that survive both headphones and a loud room.",
    soundTitle: "A moving target",
    soundBody:
      "The songs change while they are played. Arrangements are tested live, small details get louder, quiet parts get stranger, and material that started as one thing often ends up somewhere else entirely. That instability is part of the band, not a problem to solve.",
    timelineTitle: "A short history",
    timeline: [
      {
        year: "2022",
        title: "The first shape",
        body:
          "Early demos, riffs and songs start collecting around the project. “Gde ptice lete” is written in this period, long before the album version existed.",
      },
      {
        year: "2023",
        title: "Sky Hook becomes a band",
        body:
          "The lineup and identity take shape, the first club and festival shows arrive, and “Astra” becomes the first released single. The live set starts becoming the real laboratory for the songs.",
      },
      {
        year: "2024",
        title: "Building the language",
        body:
          "More shows, more writing and more recording. “Ostajem” and “Surf” expand the vocabulary while the debut album slowly turns from a folder of songs into one coherent record.",
      },
      {
        year: "2025",
        title: "Gde ptice lete",
        body:
          "The 13-track debut album arrives through Pop Depresija / Zeleni Kačket. The record brings together the different sides of the band and opens a wider run of club and festival dates.",
      },
      {
        year: "2026",
        title: "The next chapter",
        body:
          "More regional shows, new live material and a heavier focus on what comes after the debut. Belgrade, Skopje and bigger festival stages become part of the same story that started in a rehearsal room.",
      },
    ],
    membersTitle: "The band",
    membersBody: "Sky Hook currently operates as a four-piece. The member layer is deliberately data-driven so final names, roles and portraits can be added without touching the page layout.",
    membersPending: "Final profile",
    nowTitle: "Now",
    nowBody:
      "Sky Hook is still treated as a project in motion. New songs, different arrangements, live recordings and future releases can all bend the visual and musical language without resetting the band back to zero.",
  },
  sr: {
    intro:
      "Sky Hook je izrastao iz nedovršenih pesama, buke iz prostorije za probe i potrebe da gitarska muzika i dalje ume da iznenadi i nas same. Koreni projekta sežu u 2022, dok identitet koji danas prepoznajemo kao Sky Hook dobija pravi oblik u Nišu tokom 2023. godine.",
    secondary:
      "Melodija nam je važna, ali i trenje. Refren koji može da ponese britpop širinu može odmah da udari u post-punk nerv, surf pokret, noise, feedback ili težu gitaru. Ideja nikada nije bila da stanemo u jednu fioku, nego da pesme rade i na slušalicama i u glasnoj prostoriji.",
    soundTitle: "Meta koja se pomera",
    soundBody:
      "Pesme se menjaju dok ih sviramo. Aranžmani se testiraju uživo, sitni detalji postaju važniji, mirni delovi postaju čudniji, a ideja koja je krenula u jednom pravcu često završi negde sasvim drugde. Ta nestabilnost je deo benda, ne greška koju treba ispeglati.",
    timelineTitle: "Kratka istorija",
    timeline: [
      {
        year: "2022",
        title: "Prvi oblik",
        body:
          "Prvi demo snimci, rifovi i pesme počinju da se skupljaju oko projekta. “Gde ptice lete” nastaje u ovom periodu, mnogo pre verzije koja će završiti na albumu.",
      },
      {
        year: "2023",
        title: "Sky Hook postaje bend",
        body:
          "Postava i identitet dobijaju pravi oblik, dolaze prvi klupski i festivalski nastupi, a “Astra” postaje prvi objavljeni singl. Bina vrlo brzo postaje glavna laboratorija za nove pesme.",
      },
      {
        year: "2024",
        title: "Gradimo jezik",
        body:
          "Više svirki, više pisanja i više snimanja. “Ostajem” i “Surf” šire zvuk, dok debi album polako prestaje da bude folder pun pesama i postaje jedna celina.",
      },
      {
        year: "2025",
        title: "Gde ptice lete",
        body:
          "Izlazi debitantski album sa 13 pesama za Pop Depresiju / Zeleni Kačket. Ploča spaja različite strane benda i otvara širi krug klupskih i festivalskih nastupa.",
      },
      {
        year: "2026",
        title: "Sledeće poglavlje",
        body:
          "Više regionalnih nastupa, novi materijal uživo i fokus na ono što dolazi posle prvog albuma. Beograd, Skoplje i veće festivalske bine postaju deo iste priče koja je krenula iz prostorije za probu.",
      },
    ],
    membersTitle: "Bend",
    membersBody: "Sky Hook danas funkcioniše kao četvoročlani bend. Sloj za članove je namerno data-driven, tako da finalna imena, uloge i portreti mogu da se dodaju bez diranja layouta.",
    membersPending: "Finalni profil",
    nowTitle: "Sada",
    nowBody:
      "Sky Hook i dalje posmatramo kao projekat u pokretu. Nove pesme, drugačiji aranžmani, live snimci i buduća izdanja mogu da menjaju vizuelni i muzički jezik bez potrebe da svaki put krećemo od nule.",
  },
};
