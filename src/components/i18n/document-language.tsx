"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export function DocumentLanguage({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "sr" ? "sr-Latn" : "en";
  }, [locale]);

  return null;
}
