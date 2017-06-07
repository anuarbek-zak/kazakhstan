angular.module('myApp').controller('articlesCtrl',function ($http,$state,$localStorage,$stateParams,$location,$anchorScroll) {
    var vm = this;
    vm.isAdmin = $localStorage.admin?true:false;
      $location.hash('anchor');
  $anchorScroll();

    $http.get("/api/article")
    .success(function(response){
        vm.articles = response;
    })
    .error(function(err){
        console.log(err);
    });    


    vm.remove = function(e,i,article){
      e.preventDefault(); 
      var ok = confirm("Вы действительно хотите удалить статью '"+article.name+"' ?");
      if(!ok) return;
      $http.delete("/api/article/"+article._id)
      .success(function(response){
        vm.articles.splice(i,1);
    })
      .error(function(err){
        console.log(err);
    }); 
  };   

  vm.update = function(e,article){
     e.preventDefault(); 
     $state.go('createArticle',{_id:article._id});
 };    
});
