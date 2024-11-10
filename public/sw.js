const STATIC_CACHE_NAME = "static-v1";

self.addEventListener("install", (event) => {
  console.log("1. Service worker installing", event);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log("2. Caching static assets", cache);
      return cache.addAll(["/"]);
    })
  );
});

// self.addEventListener("activate", (event) => {
//   console.log("2. Service worker activating", event);
// });

self.addEventListener("fetch", (event) => {
  console.log("3. Service worker fetching", event);
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      console.log("3.1. Service worker cache response", cacheResponse);
      return cacheResponse || fetch(event.request);
    })
  );
});
