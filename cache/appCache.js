  this.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('cache-iai').then(function(cache) {
        return cache.addAll([
            '/',
            '/index.js',
            '/index.css',
            '/xbox.json',
            '/img/',
            '/img/3.jpg',
            '/img/4.jpeg',
            '/img/5.jpeg',
            '/icons/',
            '/icons/arrow_back.svg',
            '/icons/arrow_forward.svg',
            '/icons/cross.svg',
            '/icons/minus.svg',
            '/icons/plus.svg',
            '/icons/time.svg',
            '/icons/done_black.svg',
        ]);
      })
    );
  });
  
  this.addEventListener('fetch', function(event) {
    var response;
    event.respondWith(caches.match(event.request).catch(function() {
      return fetch(event.request);
    }).then(function(r) {
      response = r;
      caches.open('cache-iai').then(function(cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    }).catch(function() {
      return caches.match('/xbox.json');
    }));
  });