angular.module('myApp').controller('glavnayaCtrl',function ($http,$state,$localStorage) {
	var vm = this;
	vm.langs = {'eng':'English','rus':'Русский','kaz':'Қазақ'}
	vm.currentLang = 'eng';
	vm.slides = [{src:'../assets/img/expo1.jpg'},{src:'../assets/img/expo2.jpg'},{src:'../assets/img/expo3.jpg'}]


	$http.get('glavnaya/lang.json')
	.success(function(data) {
		vm.langsTexts = data;
		vm.currentText = vm.langsTexts[vm.currentLang];
	})
	.error(function(err) {
		console.log(err)
	})

	vm.changeLang = function(name) {
		vm.currentText = vm.langsTexts[name];
		vm.currentLang = name;
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
