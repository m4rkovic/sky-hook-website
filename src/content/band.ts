import type { Locale } from "@/i18n/config";

type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

type BandCopy = {
  headline: string;
  location: string;
  navigation: { story: string; sound: string; history: string; live: string };
  facts: { formed: string; tracks: string; debut: string };
  soundNotes: { title: string; body: string }[];
  albumTitle: string;
  albumBody: string;
  liveTitle: string;
  liveBody: string;
  photoCaption: string;
  portraitCaption: string;
  bookingTitle: string;
  bookingBody: string;
  pressLink: string;
  galleryLink: string;
  intro: string;
  secondary: string;
  soundTitle: string;
  soundBody: string;
  timelineTitle: string;
  timeline: TimelineItem[];
  nowTitle: string;
  nowBody: string;
};

export const bandCopy: Record<Locale, BandCopy> = {
  en: {
    headline: "From Niš. Turned up.",
    location: "Niš, Serbia / Alternative rock",
    navigation: { story: "The band", sound: "The sound", history: "The story", live: "On stage" },
    facts: { formed: "Band formed", tracks: "Debut tracks", debut: "First album" },
    soundNotes: [
      { title: "Melody", body: "Vocal hooks and guitar lines give the songs a centre, even when the arrangements pull in different directions." },
      { title: "Friction", body: "Post-punk tension, surf rhythms, noise and feedback keep the edges rough." },
      { title: "Volume", body: "Two guitars, bass and drums. The live room is where the arrangements get tested." },
    ],
    albumTitle: "The first record.",
    albumBody: "Gde ptice lete gathers those different directions into 13 songs. Released in April 2025 through Pop Depresija / Zeleni Kačket, it is the starting point for everything that follows.",
    liveTitle: "The songs leave the room.",
    liveBody: "From clubs in Niš and Belgrade to Skopje and festival stages, playing live brings the songs into focus. Guitar parts shift, dynamics open up, and the set keeps moving with the band.",
    photoCaption: "Sky Hook / Live archive",
    portraitCaption: "Sky Hook / Rehearsal room",
    bookingTitle: "See you in front of the stage.",
    bookingBody: "For concerts, festivals and collaborations, get in touch. Photos and band information are collected in the press kit.",
    pressLink: "Press kit",
    galleryLink: "More photos & videos",

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
    nowTitle: "Now",
    nowBody:
      "Sky Hook is still treated as a project in motion. New songs, different arrangements, live recordings and future releases can all bend the visual and musical language without resetting the band back to zero.",
  },
  sr: {
    headline: "Iz Niša. Pojačano.",
    location: "Niš, Srbija / Alternativni rok",
    navigation: { story: "O bendu", sound: "Zvuk", history: "Priča", live: "Na bini" },
    facts: { formed: "Nastanak benda", tracks: "Pesama na debiju", debut: "Prvi album" },
    soundNotes: [
      { title: "Melodija", body: "Vokalni refreni i gitarske linije drže pesme na okupu, čak i kada aranžmani vuku na različite strane." },
      { title: "Trenje", body: "Post-punk nerv, surf ritam, noise i feedback ostavljaju zvuku hrapave ivice." },
      { title: "Glasnoća", body: "Dve gitare, bas i bubnjevi. Aranžmani prolaze pravi test tek kada ih odsviramo uživo." },
    ],
    albumTitle: "Prva ploča.",
    albumBody: "Gde ptice lete skuplja te različite pravce u 13 pesama. Objavljen u aprilu 2025. za Pop Depresiju / Zeleni Kačket, album je polazna tačka za sve što dolazi posle njega.",
    liveTitle: "Pesme izlaze iz sobe.",
    liveBody: "Od klubova u Nišu i Beogradu do Skoplja i festivalskih bina, pesme dobijaju jasniji oblik uživo. Gitarske deonice se menjaju, dinamika se otvara, a set raste zajedno sa bendom.",
    photoCaption: "Sky Hook / Arhiva nastupa",
    portraitCaption: "Sky Hook / Prostorija za probe",
    bookingTitle: "Vidimo se ispred bine.",
    bookingBody: "Za koncerte, festivale i saradnje, pišite nam. Fotografije i informacije o bendu nalaze se u press kitu.",
    pressLink: "Press kit",
    galleryLink: "Još fotografija i videa",

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
    nowTitle: "Sada",
    nowBody:
      "Sky Hook i dalje posmatramo kao projekat u pokretu. Nove pesme, drugačiji aranžmani, live snimci i buduća izdanja mogu da menjaju vizuelni i muzički jezik bez potrebe da svaki put krećemo od nule.",
  },
};
