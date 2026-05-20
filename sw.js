const CACHE = 'portfolio-v2';
const ASSETS = [
 '/FredericoSpinelli-CV/',
 '/FredericoSpinelli-CV/index.html',
 '/FredericoSpinelli-CV/experiences.html',
 '/FredericoSpinelli-CV/competences.html',
 '/FredericoSpinelli-CV/portfolio.html',
 '/FredericoSpinelli-CV/softskills.html',
 '/FredericoSpinelli-CV/blog.html',
 '/FredericoSpinelli-CV/contact.html',
 '/FredericoSpinelli-CV/style.css',
 '/FredericoSpinelli-CV/components.js',
 '/FredericoSpinelli-CV/profile.jpg'
];

self.addEventListener('install', e => {
 self.skipWaiting();
 e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
 e.waitUntil(
 caches.keys().then(keys =>
 Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))
 ).then(() => self.clients.claim())
 );
});

self.addEventListener('fetch', e => {
 e.respondWith(
 fetch(e.request).catch(() => caches.match(e.request))
 );
});
