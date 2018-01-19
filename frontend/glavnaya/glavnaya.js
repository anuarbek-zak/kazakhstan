angular.module('myApp').controller('glavnayaCtrl',function ($scope,$http,$state,$localStorage,$document) {
	var vm = this;
	vm.scrollCards = {'news':'3','about':'4','president':'5','kz2050':'6','expo':'7'};
	vm.selectedSection = vm.scrollCards['news'];
	vm.isShowVideo = false;
	vm.currentLang = $localStorage.currentLang;

	vm.openLink = function() {
		window.open("https://www.tourister.ru/world/asia/kazakhstan/map#('groups':['10'])",'_blank')
	}

	$http.get('glavnaya/glavnaya.json')
	.success(function(data) {
		vm.langsTexts = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	})
	.error(function(err) {
		console.log(err)
	})

	$scope.$on('changeLang', function (event, data) {
    vm.currentLang = data;
    vm.currentText = vm.langsTexts[vm.currentLang];
  });

	vm.submitQuery = function () {
		window.open('http://google.com/search?q='+vm.query)
	}

	vm.goToSection = function (sect) {
		vm.selectedSection = sect;
		$document.scrollToElement(angular.element(document.getElementById('section-'+sect)), 0,1000);
	}

	$('.slider').carousel({
  // the number of images to display
  num: 5, 
  // max width of the active image
  maxWidth: 600,
  // min width of the active image
  maxHeight: 400, 
  autoPlay: false,
  // 0.0 - 1.0
  scale: 0.8,
  // the distance between images
  distance: 120
});

});
