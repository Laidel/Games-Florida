const CACHE_NAME = 'florida-v2'; // Cambié a V2 para forzar actualización

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './TiendaVirtual.html',
                'https://img.icons8.com/color/48/mame.png'
            ]).catch(err => console.log("Fallo al guardar: ", err));
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return caches.match(e.request);
        })
    );
});

// Esto limpia cachés viejas automáticamente al activar
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
});
