import type { MetadataRoute } from "next";
import { releases } from "@/content/releases";
import { showSlug } from "@/content/show-utils";
import { fetchSetlistArchive } from "@/features/shows/providers/setlistfm.server";
import { locales } from "@/i18n/config";

const staticRoutes = ["", "/live", "/music", "/band", "/media", "/news", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!siteUrl) return [];

  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      changeFrequency: route === "/news" || route === "/live" ? "weekly" as const : "monthly" as const,
      priority: route === "" ? 1 : route === "/music" || route === "/live" ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}/en${route}`,
          sr: `${siteUrl}/sr${route}`,
          "x-default": `${siteUrl}/en${route}`,
        },
      },
    })),
  );

  const releaseEntries = locales.flatMap((locale) =>
    releases.flatMap((release) => [
      {
        url: `${siteUrl}/${locale}/music/${release.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${siteUrl}/en/music/${release.slug}`,
            sr: `${siteUrl}/sr/music/${release.slug}`,
            "x-default": `${siteUrl}/en/music/${release.slug}`,
          },
        },
      },
      {
        url: `${siteUrl}/${locale}/listen/${release.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
        alternates: {
          languages: {
            en: `${siteUrl}/en/listen/${release.slug}`,
            sr: `${siteUrl}/sr/listen/${release.slug}`,
            "x-default": `${siteUrl}/en/listen/${release.slug}`,
          },
        },
      },
    ]),
  );

  let liveEntries: MetadataRoute.Sitemap = [];
  try {
    const { shows } = await fetchSetlistArchive();
    liveEntries = locales.flatMap((locale) =>
      shows.map((show) => {
        const slug = showSlug(show);
        return {
          url: `${siteUrl}/${locale}/live/${slug}`,
          changeFrequency: "yearly" as const,
          priority: 0.55,
          alternates: {
            languages: {
              en: `${siteUrl}/en/live/${slug}`,
              sr: `${siteUrl}/sr/live/${slug}`,
              "x-default": `${siteUrl}/en/live/${slug}`,
            },
          },
        };
      }),
    );
  } catch {
    liveEntries = [];
  }

  return [...staticEntries, ...releaseEntries, ...liveEntries];
}
