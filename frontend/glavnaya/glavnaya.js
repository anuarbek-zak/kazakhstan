angular.module('myApp').controller('glavnayaCtrl',function ($http,$state,$localStorage) {
  var vm = this;
 	vm.langs = {'eng':'Eglish','rus':'Русский','kaz':'Қазақ'}
 	vm.currentLang = 'eng'
});
