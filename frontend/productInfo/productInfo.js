angular.module('myApp').controller('productInfoCtrl',function ($http,$state,$localStorage,$stateParams,$location,$anchorScroll) {
    var vm = this;
    vm.id = $stateParams.id;
    vm.product = {};

    $location.hash('anchor');
    $anchorScroll();

    if(!vm.id){
        vm.showErr='Такого товара не существует';
    }else{
         $http.get("/api/product/"+vm.id)
        .success(function(response){
            vm.product = response[0];
            vm.mainImg = vm.product.images[0];

        })
        .error(function(err){
            console.log(err);
            vm.showErr='Такого товара не существует';
        });

        vm.goBack = function(e){
            e.preventDefault();
            window.history.go(-1);
        }
    }

        
    
});
