# Sky Hook website architecture

## Goal

This is a long-lived official band website, not a one-off landing page. New releases, tours, photos, languages and campaign eras should be additive changes rather than reasons to rebuild the shell.

## Principles

1. **UI does not own content.** Components render typed data; titles, dates, links and release metadata live in content/config layers.
2. **External services sit behind adapters.** The UI consumes Sky Hook domain models, not raw Bandsintown or setlist.fm response shapes.
3. **Brand core and campaign art are separate.** Navigation, grid, typography, borders and color tokens remain stable while release-era visuals can change.
4. **Routes are products.** Music, live archive, smart links and EPK are independent surfaces that can evolve without changing the homepage.
5. **No invented content.** Unknown artwork, credits, stream URLs or future shows remain empty until real data is supplied.

## Stack

- Next.js 16 / App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Zod for runtime content and API validation
- Serverless route handlers only where a third-party API key must stay off the client

There is no database, CMS or custom application server.

## Layers

- `src/content` — canonical local content and schemas.
- `src/i18n` — locale config and EN/SR dictionaries.
- `src/features` — domain logic and external providers.
- `src/components` — reusable layout, release and live UI.
- `src/app/[locale]` — localized routes and route composition.
- `src/app/api` — thin serverless adapters for third-party APIs.
- `public` — brand assets and original media.

## Internationalization

Public pages are locale-prefixed:

- `/en/...`
- `/sr/...`

`src/proxy.ts` redirects an unprefixed URL to Serbian when the browser language starts with `sr`, otherwise English. The language switcher preserves the current route.

All user-facing shared UI strings belong in `src/i18n/dictionaries`, not inside reusable components.

## Routing

- `/{locale}` — editorial homepage
- `/{locale}/live` — upcoming shows + historical archive + live stats
- `/{locale}/music` — filterable release catalogue
- `/{locale}/music/[slug]` — release detail, tracklist and credits
- `/{locale}/listen/[slug]` — standalone smart-link page for social sharing
- `/{locale}/band`
- `/{locale}/media`
- `/{locale}/news` — reserved, hidden from main navigation until useful
- `/{locale}/contact`
- `/{locale}/epk`

Future routes such as merch or news articles should reuse the same locale/content boundaries.

## Releases

`src/content/releases.ts` is the current source of truth. A release can contain:

- slug/title/type/year/date
- optional artwork path
- localized description
- streaming links
- tracklist
- credits
- featured flag

The catalogue and release pages consume the same model. Adding an artwork later means adding its asset path to the release object, not changing components.

## Smart links

`/{locale}/listen/[slug]` intentionally uses a separate route group without the full site header/footer. It is a focused, shareable "choose your music service" surface while still using the same release data and brand tokens.

## Live providers

### Upcoming

`Bandsintown -> server adapter -> Show[] -> UpcomingShows`

The browser calls `/api/shows/upcoming`; the Bandsintown key stays server-side. If Bandsintown is unavailable, the route returns the local fallback list.

### Archive

`setlist.fm -> server adapter -> ArchiveShow[] + LiveStats -> SetlistArchive`

The setlist.fm key is never shipped to the browser. Data is normalized immediately and short-cached. Every rendered setlist links back to the source and the archive contains the required attribution.

Derived statistics are based only on setlist.fm-documented data: total shows, unique cities, countries, unique performed songs and top documented songs.

## Design system

Brand colors, spacing, header height and typography are semantic tokens in `globals.css`. Do not scatter raw hex values through JSX.

Core palette:

- near black / background
- deep navy
- indigo
- ice blue
- light ice
- off-white paper
- muted grey
- electric blue for small interaction accents

Campaign-specific visuals may introduce temporary art treatment without replacing these core tokens.

## Rules for future work

- New content belongs in content files or a future content adapter, not JSX.
- New API sources normalize into domain models before reaching UI.
- Keep secrets out of `NEXT_PUBLIC_*` variables.
- Every new page must support EN/SR from day one.
- Every content image gets alt text and a deliberate focal point when cropping matters.
- Add artwork as files/metadata, never as one-off CSS backgrounds when it is actual content.
- Prefer CSS interaction over animation libraries unless motion improves hierarchy or comprehension.
- `npm run check` must pass before production deployment.
