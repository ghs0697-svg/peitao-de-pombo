const CACHE_NAME = 'peitao-de-pombo-v99';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/peitao-data.json',
  './data/seca-panca-data.json',
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

// ── Web Push: avisos do Peitão (novidades e condições de aluno; mesmo desenho do treino-app/CRM) ──
self.addEventListener('push', e => {
  let data = { title: 'Peitão de Pombo', body: 'Novidade no teu app. Abre aí.', tag: 'peitao-aviso', url: './' };
  try { if (e.data) data = Object.assign(data, e.data.json()); } catch (_) {}
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'assets/icon-192.png',
    badge: 'assets/icon-192.png',
    tag: data.tag,
    renotify: true,
    data: { url: data.url || './' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes(self.registration.scope) && 'focus' in c) return c.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
