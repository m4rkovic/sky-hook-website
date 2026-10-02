import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "./i18n/config";

const LOCALE_COOKIE = "skyhook_locale";
const ONE_YEAR = 60 * 60 * 24 * 365;

function preferredLocale(request: NextRequest): Locale {
  const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (savedLocale && hasLocale(savedLocale)) return savedLocale;

  const language = request.headers.get("accept-language")?.toLowerCase() ?? "";
  return language.startsWith("sr") ? "sr" : defaultLocale;
}

function localeFromPath(pathname: string): Locale | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return firstSegment && hasLocale(firstSegment) ? firstSegment : null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathLocale = localeFromPath(pathname);
  if (pathLocale) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathLocale, {
      path: "/",
      maxAge: ONE_YEAR,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, preferredLocale(request), {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
