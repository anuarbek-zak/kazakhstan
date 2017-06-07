angular.module('myApp').controller('showProductsCtrl',function ($http,$state,$localStorage,$stateParams) {
    var vm = this;
    vm.category_id = $stateParams.category_id;
    vm.isAdmin = $localStorage.admin?true:false;
    vm.loaded=false;
    if(!vm.category_id){
        vm.showErr = 'Такой категории не существует';
    }else{

    $http.get("/api/product/getByCategory/"+vm.category_id)
    .success(function(response){
        vm.loaded = true;
        vm.products = response;
    })
    .error(function(err){
        console.log(err);
        vm.showErr = 'Такой категории не существует';
    });

     $http.get("/api/category/parents",{ cache: true})
        .success(function(response){
            vm.categories = response;
        })
        .error(function(err){
            console.log(err);
        }); 

   vm.clickCategory = function(category){
    if(category.children.length>0){
        console.log(category.name);
        if(vm.selected!=category._id) vm.selected=category._id;
        else vm.selected="";
    }else{
        $state.go('showProducts',{category_id:category._id});
    }
   }   

    vm.update = function(e,product){
        e.stopPropagation();
        $state.go('createProduct',{id:product._id});
    };

    vm.remove = function(e,product){
        e.stopPropagation();
        var ok = confirm("Вы уверены что ходите удалить '"+product.name+"' ?");
        if(ok){
            $http.delete("/api/product/"+product._id)
            .success(function(response){
                vm.products.splice(vm.products.indexOf(product),1);
            })
            .error(function(err){
                console.log(err);
            });    
        }
    }; 
    }


    
});
