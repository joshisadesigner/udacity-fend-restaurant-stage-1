var cacheName = "restaurant-static";

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then( cache => {
            return cache.addAll([
                "/index.html",
                "/restaurant.html",
                "/favicon.ico",
                "/css/styles.css",
                "/data/restaurants.json",
                "/img/1_320.jpg",
                "/img/2_320.jpg",
                "/img/3_320.jpg",
                "/img/4_320.jpg",
                "/img/5_320.jpg",
                "/img/6_320.jpg",
                "/img/7_320.jpg",
                "/img/8_320.jpg",
                "/img/9_320.jpg",
                "/img/10_320.jpg "
            ]);
        })
    );
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            return Promise.all(
                cacheNames.filter( name => {
                    return name.startsWith("restaurant-") && name != cacheName;
                })
                .map( name => {
                    return caches.delete( name );
                })
            )
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
})