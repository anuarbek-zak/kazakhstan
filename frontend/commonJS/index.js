angular.module('myApp').controller('rootCtrl',function ($scope) {
	var vm = this;	
});

angular.module('myApp').controller('headerCtrl',function ($scope,$http,$stateParams,authService) {
	var vm = this;
	
	vm.langs = {'eng':'English','rus':'Русский','kaz':'Қазақ'}
	vm.currentLang = 'eng';
	vm.isShowMenu = false;
	vm.langsTexts = [];

	$http.get('commonJS/index.json')
	.success(function(data) {
		vm.langsTexts = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	})
	.error(function(err) {
		console.log(err)
	})

	vm.changeLang = function(name) {
		vm.currentLang = name;
		vm.currentText = vm.langsTexts[vm.currentLang];
		$scope.$parent.$broadcast('changeLang',name);
	}


});


angular.module('myApp').controller('footerCtrl',function ($http,$stateParams,$localStorage,authService,$state,$scope) {
	var vm = this;
	vm.currentYear = (new Date()).getFullYear();

});