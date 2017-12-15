angular.module('myApp').controller('presidentCtrl',function ($scope,$http,$state,$localStorage,$document) {
	var vm = this;
	vm.currentLang = 'eng';
	vm.isShowVideo = false;
	vm.slides = [1,2,3]

	$scope.$on('changeLang', function (event, data) {
		vm.currentLang = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	});

	$http.get('president/president.json')
	.success(function(data) {
		vm.langsTexts = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	})
	.error(function(err) {
		console.log(err)
	})
});
