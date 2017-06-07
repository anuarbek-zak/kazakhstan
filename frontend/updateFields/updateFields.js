angular.module('myApp').controller('updateFieldsCtrl',function ($http,$stateParams,$location,$anchorScroll) {
	var vm = this;
	vm.fields = {};


	$location.hash('anchor');
	$anchorScroll();

	
		$http.get("/api/contacts")
			.success(function(response){
				vm.fields = response[0];
			})
			.error(function(err){
				console.log(err);
			});

vm.update = function () {
		$http.put("/api/contacts",{fields:vm.fields})
			.success(function(response){
				console.log(response);
				vm.updated = true;
			})
			.error(function(err){
				console.log(err);
			});
}

});