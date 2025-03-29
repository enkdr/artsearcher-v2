const CACHE_NAME = 'artsearcher-cache-v1.2.02';
const urlsToCache = [
    '/', // Add any specific URLs you want to cache upfront
];

self.skipWaiting();

// Install event: caching predefined assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          return cacheName !== currentCacheName;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

// Fetch event: dynamically caching files
// self.addEventListener('fetch', event => {
//     const requestUrl = new URL(event.request.url);

//     if (requestUrl.pathname.startsWith('/assets/')) {
//         event.respondWith(
//             caches.match(event.request)
//                 .then(response => {
//                     if (response) {
//                         return response; // Return cached version if available
//                     }

//                     return fetch(event.request).then(networkResponse => {
//                         return caches.open(CACHE_NAME).then(cache => {
//                             cache.put(event.request, networkResponse.clone());
//                             return networkResponse;
//                         });
//                     });
//                 })
//         );
//     } else {
//         // Default behavior for other requests
//         event.respondWith(
//             caches.match(event.request)
//                 .then(response => {
//                     return response || fetch(event.request);
//                 })
//         );
//     }
// });

