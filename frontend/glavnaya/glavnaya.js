angular.module('myApp').controller('glavnayaCtrl',function ($http,$state,$localStorage) {
  var vm = this;
 	vm.langs = {'eng':'English','rus':'Русский','kaz':'Қазақ'}
 	vm.currentLang = 'eng';

 	$http.get('glavnaya/lang.json')
 		.success(function(data) {
 			vm.langsTexts = data;
 			vm.currentText = vm.langsTexts[vm.currentLang];
 			console.log(vm.currentText)
 		})
 		.error(function(err) {
 				console.log(err)
 		})

 	vm.changeLang = function(name) {
 		vm.currentText = vm.langsTexts[name];
 		vm.currentLang = name;
 	}
});
