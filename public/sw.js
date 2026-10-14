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
  // Retire this worker without navigating any open tabs.
  event.waitUntil(self.registration.unregister());
});
