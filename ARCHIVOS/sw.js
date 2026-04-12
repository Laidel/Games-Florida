const CACHE_NAME = 'florida-v1';
const ASSETS = [
    './TiendaVirtual.html',
    'https://img.icons8.com/color/48/mame.png',
    'https://img.icons8.com/color/48/super-nintendo.png',
    'https://img.icons8.com/color/48/game-boy-advance.png'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
        .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
