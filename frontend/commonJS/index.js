angular.module('myApp').controller('headerCtrl',function ($http,$stateParams,authService) {
	var vm = this;
	vm.hello = "hello";
	$http.get("/api/contacts")
        .success(function(response){
        	vm.contacts = response[0];
        		console.log(vm.contacts);
        })
        .error(function(err){
            console.log(err);
        });
        // authService.signup('Ая','amabilisdu');

});




angular.module('myApp').controller('footerCtrl',function ($http,$stateParams,$localStorage,authService,$state,$scope) {
	var vm = this;
	vm.isAdmin=false;

		$http.get("/api/contacts")
        .success(function(response){
        	vm.contacts = response[0];
        		console.log('footer',vm.contacts);

        })
        .error(function(err){
            console.log(err);
        });

	if($localStorage.admin!=undefined)	vm.isAdmin=true;
	console.log(vm.isAdmin);
	vm.logout = function(){
		$localStorage.admin = undefined;
		$state.got('glavnaya');
	}
});