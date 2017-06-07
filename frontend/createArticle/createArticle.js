angular.module('myApp').controller('createArticleCtrl',function ($http,$stateParams,$location,$anchorScroll) {
	var vm = this;
		vm.article = {};

			$location.hash('anchor');
	$anchorScroll();

	if($stateParams._id) {
		vm.id = $stateParams._id;
		$http.get("/api/article/"+vm.id)
			.success(function(response){
				console.log("response",response);
				vm.article = response;
			})
			.error(function(err){
				console.log(err);
			});	
	}

	vm.clear = function () {
		vm.article={};
		vm.showCreated = false;
	};

	vm.create = function() {
		if((vm.article.name===null||vm.article.name===undefined||vm.article.name==='')
			||(vm.article.description===null||vm.article.description===undefined||vm.article.description==='')) {
					vm.showErr = true;
					return;
		}
		vm.showErr = false;
		$http.post("/api/article",vm.article)
			.success(function(response){
				console.log("response",response);
				vm.showCreated = true;
			})
			.error(function(err){
				console.log(err);
			});
	}

	vm.update = function() {
		$http.put("/api/article/"+vm.id,vm.article)
			.success(function(response){
				console.log("response",response);
				vm.showCreated = true;
			})
			.error(function(err){
				console.log(err);
			});
	}

});