# Static assets

This folder holds images and SVGs consumed by the Vue app. Paths use the `@/assets/…` alias (see `vue.config.js` / Vue CLI defaults).

## Layout

| Directory | Purpose |
|-----------|---------|
| **`icons/`** | Logos for timeline entries. Each event in `src/data/data.json` can set `"icon": "filename.ext"`; that file must live here. Loaded by `IconHolder.vue` via `require('@/assets/icons/' + icon)`. The dev data editor uploads new timeline icons into this directory only. |
| **`social/`** | Profile and outbound link icons (LinkedIn, GitHub, Devpost, Medium, Strava, Chess.com, resume PDF thumbnail, etc.). Referenced from `Profile.vue` and similar. |
| **`ui/`** | Small chrome images: external-link arrow, GitHub mark on project cards, keyboard hint graphic, headshot. |
| **`brand/`** | One-off branding (e.g. Google sign-in artwork on `Welcome.vue`, legacy `logo.png`). |

## Adding a new timeline icon

1. Add the image file under **`icons/`** (PNG or JPEG is typical).
2. In `data.json`, set the event’s `"icon"` field to that **exact filename** (case-sensitive on some hosts).
3. With `npm run serve`, you can also use **Life map data editor** (`/#/editor`) to upload into `icons/` and assign the slot.

## Public folder

`public/` holds files served as-is at the site root (favicon, `screenshot.png` for Open Graph, etc.). Use it for assets that must have a stable URL without webpack processing.
