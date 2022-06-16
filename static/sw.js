const version = "1.0.0";
const cacheName = `timeless-${version}`;


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/?projects',
                '/?waifus',
                '/?socials',
                '/css/styles.css',
                '/js/main.js',
                '/svg/waves.svg',
                '/svg/waves-mobile.svg'
            ]);
        })
    );
});