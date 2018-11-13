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
        caches.keys().then( keys => {
            return Promise.all(
                keys.map( (key, i ) => {
                    if (key !== cacheName) {
                        return caches.delete(keys[i]);
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then( response => {
            if(response) {
                return response;
            }
            requestBackend(event);
        })
    )
});

function requestBackend(event) {
    var url = event.request.clone();
    return fetch(url)
        .then( response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }
            
            let response = response.clone();

            cache.open(cacheName)
            .then( cache => {
                cache.put(event.request, response);
            });

            return response;
        })
}