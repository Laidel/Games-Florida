// ClearCache.js - Manejador de Caché para la Carpeta ARCHIVOS
const CACHE_NAME = 'florida-games-demo-v1';

// Al estar este JS dentro de /ARCHIVOS/, las rutas son relativas a esta carpeta
const INITIAL_ASSETS = [
    './LimpiezaSistema.html',
    './ClearCache.js'
];

// Evento de Instalación: Guarda los archivos en la memoria local
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Instalando activos en /ARCHIVOS/...");
            return cache.addAll(INITIAL_ASSETS);
        }).then(() => self.skipWaiting())
    );
});

// Evento de Activación: Limpia versiones antiguas y toma el control
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("Eliminando caché obsoleta:", key);
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Evento Fetch: Estrategia Network First para permitir actualizaciones
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resClone = res.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(() => caches.match(e.request)) // Si no hay red, entrega lo guardado
    );
});
