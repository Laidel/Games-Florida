// ClearCache.js - Manejador de Caché para la Demo
const CACHE_NAME = 'florida-games-demo-v1';

// Archivos esenciales que la demo guardará para funcionar sin internet
const INITIAL_ASSETS = [
    './LimpiezaSistema.html',
    './ClearCache.js'
];

// Evento de Instalación: Guarda los archivos en la memoria del navegador
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Instalando activos de la demo...");
            return cache.addAll(INITIAL_ASSETS);
        }).then(() => self.skipWaiting()) // Fuerza la activación inmediata
    );
});

// Evento de Activación: Limpia versiones antiguas de caché para evitar conflictos
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
        }).then(() => self.clients.claim()) // Toma el control de la página actual inmediatamente
    );
});

// Evento Fetch: Estrategia "Network First" (Intenta red, si falla usa caché)
// Esto permite que si haces un cambio en GitHub, se vea al estar online,
// pero si no hay señal, cargue lo que tiene guardado.
self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Si la respuesta es válida, guardamos una copia actualizada en caché
                const resClone = res.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, resClone);
                });
                return res;
            })
            .catch(() => caches.match(e.request)) // Si falla el internet, entrega el archivo guardado
    );
});
