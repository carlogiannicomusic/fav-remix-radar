// Remix Radar — FAV. Creative Studio — PWA service worker.
// Strategy:
//  - HTML / navigation  -> NETWORK-FIRST  (latest UI when online; cached shell offline)
//  - feed / data JSON   -> NETWORK-FIRST  (fresh data, cached fallback)
//  - static assets      -> CACHE-FIRST    (fonts/marks/icons, versioned by SHELL)
const SHELL = "fav-rr-shell-v9";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./app.html",
  "./manifest.webmanifest",
  // FAV brand assets (fonts, marks, icons)
  "./brand/fonts.css",
  "./brand/fonts/DrukWide-Bold.ttf",
  "./brand/fonts/DrukWide-Medium.ttf",
  "./brand/fonts/Satoshi-Regular.woff2",
  "./brand/fonts/Satoshi-Medium.woff2",
  "./brand/fonts/Satoshi-Bold.woff2",
  "./brand/fonts/Satoshi-Black.woff2",
  "./brand/fav-dot-white.png",
  "./brand/icon-192.png",
  "./brand/icon-512.png",
  "./brand/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== SHELL).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

function isNavigation(req) {
  return req.mode === "navigate" ||
         (req.method === "GET" && (req.headers.get("accept") || "").includes("text/html"));
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // HTML / navigation: network-first; cache per-path; offline falls back to app, then landing.
  if (isNavigation(req)) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(SHELL).then((c) => c.put(req, copy));
        return res;
      }).catch(async () =>
        (await caches.match(req)) ||
        (await caches.match("./app.html")) ||
        (await caches.match("./index.html")) ||
        (await caches.match("./"))
      )
    );
    return;
  }

  // Data feeds: network-first.
  if (url.pathname.endsWith("/feed.json") || url.pathname.endsWith("/artists.json") || url.pathname.endsWith("/sounds.json")) {
    const key = "./" + url.pathname.split("/").pop();
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(SHELL).then((c) => c.put(key, copy));
        return res;
      }).catch(() => caches.match(key))
    );
    return;
  }

  // Static assets: cache-first.
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
