angular.module('myApp').controller('cultureCtrl',function ($scope,$http,$state,$localStorage,$document) {
	var vm = this;
	vm.currentLang = 'eng';
	vm.query = '';
	vm.sects = [1,2,3,4,5]

	$scope.$on('changeLang', function (event, data) {
		vm.currentLang = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	});

	$http.get('culture/culture.json')
	.success(function(data) {
		console.log('data',data)
		vm.langsTexts = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	})
	.error(function(err) {
		console.log(err)
	})
});
