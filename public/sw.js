const CACHE_NAME = 'rira-archive-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// 설치 시점에 주요 리소스 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 패치 요청을 가로채서 오프라인 캐시 제공
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});