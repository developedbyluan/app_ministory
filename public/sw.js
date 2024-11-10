const STATIC_CACHE_NAME = "static-v0";

self.addEventListener("install", (event) => {
  console.log("1. Service worker installing", event);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      console.log("1.1. Caching static assets", cache);
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("2. Service worker activating", event);
  caches.keys().then((keys) => {
    console.log("2.1. Service worker cache keys", keys);
    return keys
      .filter((key) => key !== STATIC_CACHE_NAME)
      .map((key) => caches.delete(key));
  });
});

self.addEventListener("fetch", (event) => {
  console.log("3. Service worker fetching", event);
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      console.log("3.1. Service worker cache response", cacheResponse);
      return (
        cacheResponse ||
        fetch(event.request).catch(() => {
          console.log("3.2. Service worker cache miss", event.request);
          return caches.match("/");
        })
      );
    })
  );
});
