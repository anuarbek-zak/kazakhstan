angular.module('myApp').controller('glavnayaCtrl',function ($http,$state,$localStorage,authService) {
    var vm = this;
    vm.selected = "";
    vm.slides = ['slider-1.jpg','slider-2.jpg','slider-3.jpg'];

    $http.get("/api/category/parents",{ cache: true})
        .success(function(response){
            vm.categories = response;
            console.log("CAT",vm.categories);
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
    
});
