const CACHE_NAME = 'bavgru-ceo-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Vibra-640x640.jpeg',
  './Mapa-estacionamento-full-v3.jpg',
  './Ger Ruan.png',
  './Sup Marcos.png',
  './Foto dionisio, atualizada.png',
  './Tenente André.png',
  './LT Brasil.png',
  './Guarda Idenilson.png',
  './Guarda Marcio.png',
  './Guar Gustavo.png',
  './Seg Graciete.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache parcial:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
