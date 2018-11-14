self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('restaurants-v1')
            .then(cache => {
                return cache.addAll([
                    "/",
                    "/css/styles.css",
                    "/js/main.js",
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
                    "/img/10_320.jpg",
                    "/index.html",
                    "/restaurant.html"
                ]);
            })
    );
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then( response => {
                if (response) return response;
                return fetch(event.request);
            })
    )
});