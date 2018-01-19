angular.module('myApp').controller('tourismCtrl',function ($location,$anchorScroll,$scope,$http,$state,$localStorage,$document) {
	var vm = this;
	vm.currentLang = 'eng';
	vm.query = '';
	vm.cards = [1,2,3,4,5,6,7,8];
	vm.currentActiveCard = 0;
	$location.hash('anchor');
	$anchorScroll();

	vm.makeCardActive = function(cardIndex) {
		if(cardIndex==vm.currentActiveCard) vm.currentActiveCard=0;
		else vm.currentActiveCard=cardIndex
	}

$scope.$on('changeLang', function (event, data) {
	vm.currentLang = data;
	vm.currentText = vm.langsTexts[vm.currentLang];
});

$http.get('tourism/tourism.json')
.success(function(data) {
	vm.langsTexts = data;
	vm.currentText = vm.langsTexts[vm.currentLang];
})
.error(function(err) {
	console.log(err)
})

vm.submitQuery = function () {
	window.open('http://google.com/search?q='+vm.query)
}
});
