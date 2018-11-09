var cacheName = "restaurant-static";

self.addEventListener('install', event => {
    console.log('//Service worker installing');
    
    event.waitUntil(
        caches.open(cacheName)
        .then( cache => {
            return cache.addAll(
                [
                    '/css/styles.css',
                    '/data/restaurants.json',
                    '/img/1_320.jpg',
                    '/img/2_320.jpg',
                    '/img/3_320.jpg',
                    '/img/4_320.jpg',
                    '/img/5_320.jpg',
                    '/img/6_320.jpg',
                    '/img/7_320.jpg',
                    '/img/8_320.jpg',
                    '/img/9_320.jpg',
                    '/img/10_320.jpg ',
                ]
            )
        })
    );
})

self.addEventListener('activate', event => {
    console.log("//Service worker installing");

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
    console.log('Fetching:', event.request.url);

    event.respondWith(
        caches.match(event.request)
        .then( response => {
            return response || fetch(event.request);
        })
    );
})

let detailsBtn = document.querySelector('.btn');

detailsBtn.addEventListener('click', event => {
    event.preventDefault();

    let id = this.dataset.article
})