# Sky Hook website

Long-term official website foundation for Sky Hook.

## Stack

- Next.js 16.3.8
- React 19.3
- TypeScript
- Tailwind CSS 4
- Zod
- EN / SR locale routing
- Thin serverless API adapters for Bandsintown and setlist.fm

## Local start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`. The proxy redirects to `/en` or `/sr` based on browser language.

Before a production commit:

```bash
npm run check
```

## Upcoming shows — Bandsintown

The website uses custom Sky Hook UI, not the stock Bandsintown widget. Configure:

```env
BANDSINTOWN_APP_ID=your_artist_api_key
BANDSINTOWN_ARTIST=Sky Hook
```

Prefer the stable Bandsintown artist ID when available. The browser never receives this credential directly; it calls `/api/shows/upcoming`.

## Past shows and statistics — setlist.fm

Configure:

```env
SETLISTFM_API_KEY=your_key
SETLISTFM_ARTIST_MBID=3d1204e0-b00c-4b17-80fc-e55b7f4690b0
```

The server adapter loads Sky Hook setlists, normalizes them, derives documented live statistics and returns them to `/live`. The UI includes source links and setlist.fm attribution.

Important: setlist.fm states that free API use is for non-commercial projects. Before public production use on the official band site, confirm that your intended use is covered or obtain the appropriate permission from setlist.fm.

## Releases

Edit `src/content/releases.ts`. Artwork is stored as optimized WebP files in `public/media/releases`.

Each release automatically participates in:

- the release catalogue
- filter/sort UI
- `/{locale}/music/[slug]`
- `/{locale}/listen/[slug]`

Add streaming URLs to the release's `streaming` object when they are ready. The smart-link page only renders configured services, so missing providers never appear as fake "coming soon" rows.

## Languages

Translations live in:

- `src/i18n/dictionaries/en.ts`
- `src/i18n/dictionaries/sr.ts`

Do not duplicate page components for each language.

## Assets

- `public/brand/sky-hook-wordmark.png`
- `public/media/photos/skyhook-live-01.jpg`
- `public/media/photos/skyhook-live-02.jpg`

Photo credits are omitted until confirmed rather than shown as placeholders.

See `ARCHITECTURE.md` before adding major features.

## Songs and lyrics

`src/content/songs.json` is the shared source for all 13 songs: stable slug, title,
duration, original Serbian lyrics and recording credits. Import `songs` or
`getSong(slug)` from `src/content/songs.ts` to reuse this content. Track order and
durations follow the official Bandcamp album. Lyrics and credits come from the
supplied text files; lyrics retain their original wording and stanza breaks.

Releases refer to songs via `tracks[].songSlug`. Singles render the lyrics below
the release details. On the album, click a track to open its lyrics inline;
keyboard users can use Tab and Enter/Space. Both interface languages display the
original Serbian lyrics, with `lang="sr"` set on the text.

Photos and artwork are registered in `src/content/media.ts` and available in the
media archive filters. Supplied historical portraits remain archival photos;
they are not used to infer the current lineup. Full-size uploaded originals are
not needed in the repository.
