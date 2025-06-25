const CACHE_NAME = 'handwerker-images-v1'
const HERO_IMAGES = [
  '/images/branchen/fliesenleger/hero/desktop/hero_background_desktop.png',
  '/images/branchen/fliesenleger/hero/mobile/hero_background_mobile.png'
]

// Install Service Worker und cache Hero-Bilder
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching hero images')
        return cache.addAll(HERO_IMAGES)
      })
      .catch((error) => {
        console.log('Service Worker: Cache failed', error)
      })
  )
  self.skipWaiting()
})

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache')
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Fetch Event - Cache First Strategy für Bilder
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('Service Worker: Serving from cache', event.request.url)
            return response
          }
          
          return fetch(event.request)
            .then((response) => {
              // Nur erfolgreiche Responses cachen
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseClone)
                  })
              }
              return response
            })
        })
        .catch(() => {
          // Fallback für offline
          console.log('Service Worker: Image fetch failed, offline')
        })
    )
  }
}) 