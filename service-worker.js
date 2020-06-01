// gérer le cache
const cacheName = 'pwa-tuto';
const filesToCache =[
	'/tutoriels/pwa-tuto/',
	'/tutoriels/pwa-tuto/index.html',
	'/tutoriels/pwa-tuto/pwa.html',
	'/tutoriels/pwa-tuto/service-launcher.js'
];
// mettre en cache le contenu de l'app
self.addEventListener ('install', function (event){
	event.waitUntil (caches.open (cacheName).then (function (cache){
		return cache.addAll (filesToCache);
}));});
// rendre le contenu de l'app hors-ligne
self.addEventListener ('fetch', function (event){
	event.respondWith (
	caches.match (event.request).then (function (response){
		return response || fetch (event.request);
}));});
