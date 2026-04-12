const CACHE_NAME = 'Lume-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
];

// Install: Cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch: Serve from cache if network fails
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file OR fetch from network
      return cachedResponse || fetch(event.request);
    }).catch(() => {
      // If both fail (offline), always return index.html
      return caches.match('./index.html');
    })
  );
});