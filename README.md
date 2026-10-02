# Sky Hook website — foundation

Long-term static website foundation for Sky Hook.

## Stack

- Next.js 16.3.8 (React framework)
- React 19.3
- TypeScript
- Tailwind CSS 4
- Zod for runtime content/API validation
- Static export: no custom backend

## Start locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Then open `http://localhost:3000`.

Before a production commit:

```bash
npm run check
```

## Bandsintown

The event UI is custom. We are **not** embedding the stock Bandsintown widget.

1. In Bandsintown for Artists, open the Sky Hook profile.
2. Settings → General → get/copy the API key.
3. Prefer the stable artist identifier (`id_123456...`) once known.
4. Put values in `.env.local`:

```env
NEXT_PUBLIC_BANDSINTOWN_APP_ID=your_app_id
NEXT_PUBLIC_BANDSINTOWN_ARTIST=id_123456
```

The browser fetches upcoming dates from Bandsintown and maps them into our internal `Show` model. A short local cache prevents repeated calls; invalid artist responses are cached longer. If Bandsintown is unavailable, the UI falls back to `src/content/shows.local.ts`.

Why client-side? It keeps the deployment fully static while event changes appear without rebuilding the site. The `app_id` is therefore visible in network requests; this matches Bandsintown's public website API model. If we later decide to hide it or prerender event SEO, we can switch the provider implementation without changing the UI.

## Content

- Global site/navigation: `src/content/site.ts`
- Releases: `src/content/releases.ts`
- Members: `src/content/members.ts`
- Media: `src/content/media.ts`
- Local show fallback: `src/content/shows.local.ts`
- Homepage composition: `src/content/home.ts`

The content is validated. Bad data should fail early rather than quietly break the site.

## Assets included

- `public/brand/sky-hook-wordmark.png`
- `public/media/photos/skyhook-live-01.jpg`
- `public/media/photos/skyhook-live-02.jpg`

Photo credits are deliberately `TBD` until the correct photographer credit is confirmed.

## Important

The current hero is a structural placeholder, not the final hero design. It proves that the header, full-bleed media and page system can coexist while the final hero treatment remains open.

Read `ARCHITECTURE.md` before adding major features.
