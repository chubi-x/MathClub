var cacheName = 'mathclubv1';
var cacheFiles = [
    'index.html',
    'math.jpg',
    'math.png',
    'mathclub.webmanifest'
];
self.addEventListener('install',(e)=>{
    console.log('[Service Worker] install');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[Service Worker] caching all files');
            return cache.addAll(cacheFiles);
        })
    )
});
self.addEventListener('fetch',(e)=>{
    e.respondWith(
        caches.match(e.request).then(
            (r)=>{
                //download file if it is not in the cache
                return r ||fetch(e.request).then((response)=>{
                    //add new files to the cache
                    return caches.open(cacheName).then((cache)=>{
                        cache.put(e.request,response.clone());
                        return response;        
                    })
                })
            }
        )
    )
})