const CACHE_NAME = 'florida-games-v3';

// Archivos críticos
const INITIAL_ASSETS = [
    './LimpiezaCache.html',
    './sw.js'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(INITIAL_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
});

// ESTRATEGIA: Intenta red, si hay éxito guarda en caché. Si falla, usa la caché.
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Clonamos la respuesta para guardarla en la caché
                const resClone = res.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(() => caches.match(e.request))
    );
});
