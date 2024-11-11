const STATIC_CACHE_NAME = "miniStoryApp-0.0.0";

self.addEventListener("install", (event) => {
  console.log("1. Service worker installing", event);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(["/"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return keys
        .filter((key) => key !== STATIC_CACHE_NAME)
        .map((key) => caches.delete(key));
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return (
        cacheResponse ||
        fetch(event.request).catch(() => {
          return caches.match("/");
        })
      );
    })
  );
});
