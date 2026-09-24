// Service worker — Ets. STD & Frères Facturation
// Stratégie "network-first" : toujours essayer le réseau en premier
// (pour avoir les dernières factures), et se replier sur le cache
// hors-ligne uniquement si le réseau échoue.

const NOM_CACHE = "std-freres-facturation-v2";
const FICHIERS_A_METTRE_EN_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./icon-180.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(NOM_CACHE).then((cache) =>
      // On met en cache fichier par fichier : si l'un d'eux manque,
      // l'installation du service worker n'échoue pas pour autant.
      Promise.all(
        FICHIERS_A_METTRE_EN_CACHE.map((fichier) =>
          cache.add(fichier).catch((e) => console.warn("Non mis en cache :", fichier, e))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((noms) =>
      Promise.all(noms.filter((n) => n !== NOM_CACHE).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // On ne traite que les requêtes GET
  if (event.request.method !== "GET") return;

  // On ne met jamais en cache les appels à Firestore : on veut toujours les données à jour
  if (event.request.url.includes("firestore.googleapis.com")) return;

  event.respondWith(
    fetch(event.request)
      .then((reponse) => {
        const copie = reponse.clone();
        caches.open(NOM_CACHE).then((cache) => cache.put(event.request, copie));
        return reponse;
      })
      .catch(() =>
        caches.match(event.request).then((cache) => cache || caches.match("./index.html"))
      )
  );
});
