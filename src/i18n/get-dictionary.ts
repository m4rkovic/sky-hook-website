import { en } from "./dictionaries/en";
import { sr } from "./dictionaries/sr";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = { en, sr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
