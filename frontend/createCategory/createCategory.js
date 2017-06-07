angular.module('myApp').controller('createCategoryCtrl',function ($http,$stateParams,$state) {
	var vm = this;
	vm.type = $stateParams.type;
	vm.name='';
	vm.created = false;

	if(vm.type=='subcategory'){
		$http.get("/api/category/parents")
		.success(function(response){
			vm.categories = response;
		})
		.error(function(err){
			console.log(err);
		});
	}


	vm.create = function() {
		if(vm.name==''||(vm.type=='subcategory'&&vm.parent==undefined)) {
			vm.showErr = true;
			return;
		}
		$http.post("/api/category",{name:vm.name,parent:vm.parent})
		.success(function(response){
			console.log("response",response);
			vm.created = true;
			vm.showErr=false;
		})
		.error(function(err){
			console.log(err);
		});
	};

	vm.getByCategory = function() {
		$http.post("/api/product/")
		.success(function(response){
			console.log("response",response);
		})
		.error(function(err){
			console.log(err);
		});
	};

});
