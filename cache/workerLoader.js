navigator.serviceWorker.register(
    '/cache/appCache.js'
 ).then(function(registration) {
     console.log('ServiceWorker registration', registration);
 }).catch(function(err) {
     throw new Error('ServiceWorker error: ' + err);
});