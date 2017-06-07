angular.module('myApp').controller('articleInfoCtrl',function ($http,$state,$localStorage,$stateParams) {
    var vm = this;

    $http.get("/api/article/"+$stateParams._id)
      .success(function(response){
          vm.article = response;
      })
      .error(function(err){
          console.log(err);
      });

});
