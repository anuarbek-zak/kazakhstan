angular.module('myApp').controller('rootCtrl',function ($scope) {
	var vm = this;	
});

angular.module('myApp').controller('headerCtrl',function ($scope,$http,$stateParams,authService,$localStorage) {
	var vm = this;
	
	vm.langs = {'eng':'English','kaz':'Қазақ'}
	vm.currentLang = $localStorage.currentLang;
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
		$localStorage.currentLang = name;
		$scope.$parent.$broadcast('changeLang',name);
	}

});


angular.module('myApp').controller('footerCtrl',function ($http,$stateParams,$localStorage,authService,$state,$scope) {
	var vm = this;
	vm.currentYear = (new Date()).getFullYear();
});