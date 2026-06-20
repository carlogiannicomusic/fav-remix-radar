# Remix Radar — FAV®

**From sound to vision.** The FAV-skinned build of Remix Radar — a daily radar of the
fastest-rising songs and sounds to remix, across TikTok · Spotify · YouTube · Shazam.
FAV® · Creative Studio · by Carlo Giannico.

This is a self-contained web app (landing + app). Same engine as the original Remix Radar,
re-skinned to the **FAV. Creative Studio** visual identity.

---

## What's inside

```
index.html              The FAV marketing landing page (root)
app.html                The actual app (Radar / Artists / Sounds / Library)
manifest.webmanifest    PWA manifest (installs straight into app.html)
sw.js                   Service worker (offline shell, network-first data)
feed.json               Snapshot of today's trending feed (songs)
artists.json            Snapshot — trending artists
sounds.json             Snapshot — trending TikTok sounds
brand/                  FAV brand kit used by the site:
  fonts.css             @font-face for Druk Wide + Satoshi
  fonts/                DrukWide-Bold/Medium (.ttf) · Satoshi (.woff2)
  fav-dot-white.png     FAV "fav." katana mark (nav / footer)
  icon-512 / 192 / apple-touch / og.png
```

## Run it

- **Locally:** serve the folder (e.g. `python3 -m http.server` inside it) and open
  `http://localhost:8000/`. Opening `index.html` directly via `file://` works too, but the
  live "Trending right now" strip needs a server to read `feed.json` (it falls back to a
  link otherwise).
- **Host it:** drop the whole folder on any static host (GitHub Pages, Netlify, Vercel,
  the FAV site). The landing is the root; the app lives at `/app.html`.
- **Phone:** open the link in Safari/Chrome → Share → **Add to Home Screen**. It launches
  full-screen straight into the app (the FAV `fav.` icon), and the landing redirects
  installed launches to the app automatically.

## The FAV identity applied here

- **Palette:** matte black `#0A0A0A` · acid green `#B8FF4A` · chrome `#C8C8C8` · silver
  `#E0E0E0` · white `#F5F5F5` (FAV. Creative Studio brandbook).
- **Type:** **Druk Wide** (display / wordmarks) + **Satoshi** (body / UI), self-hosted.
- **Direction:** Maison Margiela × cyberpunk × Japanese minimalism — black dominant,
  chrome metallic, acid green as the single accent.

## Data

`feed.json` / `artists.json` / `sounds.json` are **snapshots**. To keep the radar fresh,
either point the app at a live feed URL or run the daily pipeline that regenerates these
files (the same one that powers the original Remix Radar).

## Notes before a public launch

- **Druk Wide** (Grilli Type) is self-hosted here from the FAV desktop license — fine for
  internal use and this demo. For a public production deploy, confirm a **Druk web license**.
  **Satoshi** is free for web (Fontshare).
- This is a separate **FAV** build; the Digital Renaissance build of Remix Radar is
  unaffected and stays where it is.

*Demo / Beta.*
