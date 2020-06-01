// afficher l'état de l'appli. facultatif
function showResponse (responseMessage){
	console.log (responseMessage);
	var responseTag = document.getElementById ('worker-state');
	responseTag.innerHTML = responseMessage;
}
// vérifier si le service-worker est installable
window.onload = function(){
	'use strict';
	var responseMessage = 'votre navigateur ne supporte pas de service-worker';
	if ('serviceWorker' in navigator){
		navigator.serviceWorker.register ('./service-worker.js');
		responseMessage = 'votre navigateur supporte le service-worker';
	}
	showResponse (responseMessage);
}
// rendre mon application installable
var buttonInstall = document.getElementsByTagName ('button')[0];
var deferredPrompt;
window.addEventListener ('beforeinstallprompt', function (event){
	// empêcher l'affichage de la popup d'installation
	event.preventDefault();
	deferredPrompt = event;
	// indiquer que l'appli est installable
	buttonInstall.innerHTML = 'installez-moi';
	showResponse ("vous pouvez installer l'appli");
});
buttonInstall.addEventListener ('click', function(){
	if (! deferredPrompt) showResponse ("l'application est déjà installée");
	else{
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then (function (choiceResult){
			if (choiceResult.outcome === 'accepted') responseMessage = "l'application s'installe";
			else responseMessage = "l'application n'est pas installée";
			showResponse (responseMessage);
});}});
// vérifier si l'appli est installée
window.addEventListener ('appinstalled', function (event){ showResponse ("l'application est installée"); });
