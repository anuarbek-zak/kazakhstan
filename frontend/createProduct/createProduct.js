angular.module('myApp').controller('createProductCtrl',function ($http,$stateParams,Upload,$location,$anchorScroll) {
	var vm = this;
	vm.id = $stateParams.id;
	vm.showSubCat=false;
	vm.product={};
	vm.currentSubCategory={};
	vm.currentCategory={};

	      $location.hash('anchor');
  $anchorScroll();

	$http.get("/api/category/parents")
	.success(function(response){
			console.log(response);
			vm.categories = response;
	})
	.error(function(err){
			console.log(err);
	});

	if(vm.id){
	 $http.get("/api/product/"+vm.id)
        .success(function(response){
            vm.product = response[0];

        })
        .error(function(err){
            console.log(err);
        });
	}

	vm.makeMain = function(i,img){
		vm.product.images.splice(i,1);
		vm.product.images.unshift(img);
		console.log(img);
		console.log("images",vm.product.images);

	}

	vm.categorySelected = function(val) {
		vm.subcategories = val.children;
		vm.currentCategory = val;
		if(vm.subcategories.length>0) vm.showSubCat=true;
		else 	vm.showSubCat=false;
	}

	vm.clear = function () {
		vm.product={};
		vm.currentCategory={};
		vm.currentSubCategory={};
		vm.showCreated = false;
		vm.file = null;
	};

	vm.removeImg = function(i,img){
		 vm.product.images.splice(i,1);
		$http.delete("/api/product/"+vm.id+"/img/"+img)
        .success(function(response){
            console.log('res');
           
        })
        .error(function(err){
            console.log(err);
        });
	};

	vm.update = function(){
		var data = {file: vm.file,product:vm.product};
		console.log("sending",data);
		console.log("images",vm.product.images);
		Upload.upload({
			      data: data,
            url: '/api/product/'+vm.id
        }).then(function (resp) {
            console.log(resp.data);
            vm.showCreated = true;
            vm.product.images = resp.data.images;
            vm.file = null;
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
           
        });
	}
	

	vm.create = function() {
		vm.product.categoryId = vm.showSubCat?vm.currentSubCategory._id:vm.currentCategory._id;

		if((vm.product.categoryId===null||vm.product.categoryId===undefined)
			||(vm.product.name===null||vm.product.name===undefined||vm.product.name==='')
			||(vm.product.description===null||vm.product.description===undefined||vm.product.description==='')
			||!vm.file) {
					vm.showErr = true;
					return;
		}
		console.log(vm.file);
		vm.showErr = false;

			Upload.upload({
            url: '/api/product/',
            data: {file: vm.file,product:vm.product}
        }).then(function (resp) {
            console.log(resp.data);
            vm.showCreated = true;

        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
           
        });
	};

});