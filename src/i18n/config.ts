export const locales = ["en", "sr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localizedHref(locale: Locale, href: string) {
  if (/^https?:\/\//.test(href)) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}

export function intlLocale(locale: Locale) {
  return locale === "sr" ? "sr-Latn-RS" : "en-GB";
}
