/* ==========================================================================
   LivraPro — service worker
   À INCRÉMENTER À CHAQUE MODIFICATION DE index.html :
   ========================================================================== */
const VERSION = 'livrapro-v11';

/* Fichiers mis en cache dès l'installation. */
const SHELL = [
  './',
  './index.html',
  './app.html',
  './boutique.html',
  './l.html',
  './livreur.html',
  './s.html',
  './suivi.html',
  './manifest.json',
  './og.png',
  './robots.txt',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      /* addAll échoue en bloc si un seul fichier manque : on les ajoute un par un. */
      .then(c => Promise.all(SHELL.map(u => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Le client peut demander l'activation immédiate d'une nouvelle version. */
self.addEventListener('message', e => {
  if (e.data === 'skip-waiting') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;

  /* On ne touche qu'aux GET de notre propre site.
     Firestore et tout le reste passent directement au réseau. */
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* Pages et fichiers du site : réseau d'abord, cache en secours.
     Ainsi une mise à jour de index.html arrive dès la prochaine ouverture,
     même si la version du cache n'a pas été incrémentée. */
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(hit => hit || caches.match('./index.html'))
      )
  );
});
