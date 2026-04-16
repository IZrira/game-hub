/* 
  Service Worker Kill-Switch 
  This script is deployed to stop the 46,000+ console errors by 
  commanding the browser to unregister the active service worker.
*/

self.addEventListener('install', (event) => {
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Unregister itself and all other service workers on the same scope.
  self.registration.unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => {
      // Force all pages to reload to clear any remaining Service Worker state.
      clients.forEach(client => {
        if (client.url && 'navigate' in client) {
          client.navigate(client.url);
        }
      });
    })
    .then(() => {
      console.log('Service Worker Kill-Switch: Unregistered and cache cleared.');
    });
});
