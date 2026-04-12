const CACHE_NAME = 'v1_lidel_cache';
// Lista de archivos que quieres que funcionen sin internet
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    'https://img.icons8.com/color/48/mame.png'
];

// Paso 1: Instalación (Se ejecuta una sola vez)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Guardando archivos en caché...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Paso 2: Estrategia de carga
// Cuando pides un archivo, el SW intenta buscarlo en internet.
// Si no hay internet, lo saca de la caché automáticamente.
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
