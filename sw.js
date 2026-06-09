const CACHE_NAME = 'peitao-de-pombo-v36';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/peitao-data.json',
  './pdfs/regua-do-peito.pdf',
  './pdfs/engenharia-do-peito.pdf',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // API calls sempre network — sem cache
  if (e.request.url.includes('/api/')) {
    e.respondWith(fetch(e.request, { cache: 'no-store' }));
    return;
  }
  // navegação: network-first com fallback offline
  if (e.request.url.includes('index.html') || e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // cache-first pros assets
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
