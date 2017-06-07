angular.module('myApp').controller('createActionCtrl',function ($http,$stateParams,$location,$anchorScroll) {
	var vm = this;
		vm.action = {};

	$location.hash('anchor');
	$anchorScroll();


			vm.clear = function () {
				vm.article={};
				vm.showCreated = false;
			};

				$http.get("/api/action")
			.success(function(response){
				vm.action = response[0];
				console.log(vm.action);
			})
			.error(function(err){
				console.log(err);
			});

			vm.create = function() {
			if((vm.action.title===null||vm.action.title===undefined||vm.action.title==='')
				||(vm.action.description===null||vm.action.description===undefined||vm.action.description==='')
				||(vm.action.date===null||vm.action.date===undefined||vm.action.date==='')) {
						vm.showErr = true;
						return;
			}
			console.log(vm.action);
		vm.showErr = false;
		$http.put("/api/action",vm.action)
			.success(function(response){
				console.log("response",response);
				vm.showCreated = true;
			})
			.error(function(err){
				console.log(err);
			});
	}


});