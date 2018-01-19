angular.module('myApp').controller('aboutCtrl',function ($location,$anchorScroll,$scope,$http,$state,$localStorage,$document) {
	var vm = this;
	vm.currentLang = 'eng';
	vm.isShowVideo = false;
	$location.hash('anchor');
	$anchorScroll();

	$scope.$on('changeLang', function (event, data) {
		vm.currentLang = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	});

	$http.get('about/about.json')
	.success(function(data) {
		vm.langsTexts = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	})
	.error(function(err) {
		console.log(err)
	})
});
