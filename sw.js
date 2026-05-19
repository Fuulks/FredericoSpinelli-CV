const CACHE = 'portfolio-v1';
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

self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE).then(c => c.addAll(ASSETS))
));

self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => r || fetch(e.request))
));