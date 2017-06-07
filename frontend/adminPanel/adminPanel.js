angular.module('myApp').controller('adminPanelCtrl',function ($http,$state,$localStorage,authService,$location,$anchorScroll) {
    var vm = this;
    vm.admin=$localStorage.admin?true:false;
     vm.name='';
  	vm.password='';

	$location.hash('anchor');
	$anchorScroll();

  	vm.logout = function(){
  		authService.logout();
  		$localStorage.admin = null;
  		$state.go('glavnaya');

  	}

	  vm.login = function () {
	    if(vm.name!='Ая'||vm.password!='amabilisdu'){
	    	vm.errorText='Не верный логин или пароль';
	     }else{
	     	 vm.errorText='';
					vm.admin=true;
					$localStorage.admin={name:'AMABILIS'};
				}
	  };
});
