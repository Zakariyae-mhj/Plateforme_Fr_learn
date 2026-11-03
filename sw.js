'use strict';
const CACHE='francais-zakaria-v2-20261103';
const STATIC=['./','./index.html','./manifest.webmanifest','./assets/style.css','./assets/app.js','./assets/lessons.js','./assets/hero-france.svg','./assets/icon.svg','./assets/icon-180.png','./assets/icon-192.png','./assets/icon-512.png','./assets/illustration-study.svg','./assets/illustration-talk.svg','./assets/illustration-review.svg','./assets/illustration-vocab.svg','./assets/illustration-grammar.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('francais-zakaria-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET'||new URL(event.request.url).origin!==location.origin)return;
  event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(x=>x||caches.match('./index.html'))));
});
