angular.module('myApp').controller('cardCtrl',function ($http,$location,$stateParams,$anchorScroll) {
	var vm = this;
	vm.which = $stateParams.which;
	vm.user = {};
vm.prodId = $stateParams.prodId;
	$location.hash('anchor');
	$anchorScroll();

	if($stateParams.prodId){
		$http.get("/api/product/"+$stateParams.prodId)
		.success(function(response){
			vm.productName = response[0].name;
		})
		.error(function(err){
			console.log(err);
		});
	}

	switch(vm.which){
		case 'action':				
		$http.get("/api/action/")
		.success(function(response){
			vm.action = response[0];
		})
		.error(function(err){
			console.log(err);
		});
		break;
	}  


	vm.sendEmail = function(){
		if((vm.user.name==null||vm.user.name==undefined||vm.user.name=='')
			||(vm.user.email==null||vm.user.email==undefined||vm.user.email=='')
			||(vm.user.number==null||vm.user.number==undefined||vm.user.number=='')){
			vm.showErr = true;
		return;
	}
	console.log("sended")
	$http.post("/api/zakaz",{user:vm.user,product:{_id:vm.prodId}})
	.success(function(response){
		console.log("prodId",response);
	})
	.error(function(err){
		console.log(err);
	});
	
	vm.showErr = false;
	vm.updated=true;
}

});