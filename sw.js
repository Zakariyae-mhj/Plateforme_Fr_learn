const CACHE = 'francais-zm-60-v1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './assets/style.css', './assets/lessons.js', './assets/app.js',
  './assets/hero-france.svg', './assets/illustration-study.svg',
  './assets/illustration-vocab.svg', './assets/illustration-grammar.svg',
  './assets/illustration-talk.svg', './assets/illustration-review.svg',
  './assets/icon.svg', './assets/icon-180.png', './assets/icon-192.png', './assets/icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
    if (res.ok) {const copy = res.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy));}
    return res;
  })));
});
