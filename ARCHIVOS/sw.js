const CACHE_NAME = 'v1_lidel_cache';

// Asegúrate de que los nombres aquí sean EXACTOS a tus archivos
const ASSETS_TO_CACHE = [
    './',
    './TiendaVirtual.html', 
    'https://img.icons8.com/color/48/mame.png',
    'https://img.icons8.com/color/48/super-nintendo.png'
];

// Instalación
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Intentando guardar archivos...');
            // Usamos addAll pero si uno falla, lanzará error en consola
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Estrategia: Red primero, si falla, Caché
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
