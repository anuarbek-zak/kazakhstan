angular.module('myApp', ['ngAnimate','duScroll','ui.router','ngStorage','mgcrea.ngStrap'])
.run(function($localStorage) {
	$localStorage.currentLang = $localStorage.currentLang?$localStorage.currentLang:'eng';
})

