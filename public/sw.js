const CACHE = 'network-or-cache-v1';
const timeout = 300;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE).then((cache) => cache.addAll([
                '/static'
            ])
        ));
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fromNetwork(event.request, timeout)
      .catch((err) => {
          console.log(`Error: ${err.message()}`);
          return fromCache(event.request);
      }));
});

function fromNetwork(request, timeout) {
    return new Promise((fulfill, reject) => {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request).then((response) => {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}