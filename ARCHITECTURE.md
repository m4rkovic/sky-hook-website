# Sky Hook website architecture

## Principle

The UI must not own content. Components render typed data; they do not become storage for titles, dates, links or artist information.

## Layers

1. `src/content` — canonical local content and validation schemas.
2. `src/features` — domain logic such as shows/Bandsintown.
3. `src/components` — reusable visual primitives and page sections.
4. `src/app` — routes and route composition only.
5. `public` — brand assets and original media.

## Homepage blocks

`src/content/home.ts` controls homepage composition. Adding a future announcement, tour campaign or video block should mean:

- create one block component,
- add one union type,
- register it in `HomeBlockRenderer`,
- place it in the data array.

It must not require a homepage rewrite.

## Shows provider boundary

The UI consumes the normalized `Show` model. Bandsintown is only one provider.

Today:

`Bandsintown -> adapter -> Show[] -> UpcomingShows`

Possible later source:

`CMS/API/local JSON -> adapter -> Show[] -> UpcomingShows`

The visual component remains unchanged.

## Design system

Brand colors, spacing, header height and typography are semantic tokens in `globals.css`. Do not scatter raw hex colors through JSX.

Core brand and campaign art are separate:

- Core: wordmark, layout grid, type scale, borders, navy/ice palette.
- Campaign: hero media, artwork, temporary accent treatment, release-specific motifs.

A new album era should not require replacing the site shell.

## Routing

Current routes:

- `/`
- `/live`
- `/music`
- `/music/[slug]`
- `/band`
- `/media`
- `/news` (reserved, hidden from main nav for now)
- `/contact`
- `/epk` (reserved outside main nav)

Potential later additions: `/news/[slug]`, `/merch`, `/video/[slug]`, `/live/archive`.

## Static deployment

Next.js is configured with `output: "export"`, so this deploys as static files. There is no custom application backend.

## Rules for future work

- New content belongs in content files or a future content adapter, not JSX.
- New API sources must normalize into domain models before touching UI.
- Avoid one-off colors/spacing when a semantic token should exist.
- Every new page must have metadata and accessible heading structure.
- Every content image must have alt text and a deliberate focal point when cropping matters.
- No animation unless it clarifies hierarchy or interaction.
