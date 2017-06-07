angular.module('myApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('glavnaya', {
                url: '/glavnaya',
                templateUrl: 'glavnaya/glavnaya.html',
                controller:'glavnayaCtrl',
                controllerAs:'vm'
            })
            .state('createCategory', {
                url: '/createCategory?type',
                templateUrl: 'createCategory/createCategory.html',
                controller:'createCategoryCtrl',
                controllerAs:'vm'
            })
            .state('createProduct', {
                url: '/createProduct/:id',
                templateUrl: 'createProduct/createProduct.html',
                controller:'createProductCtrl',
                controllerAs:'vm'
            })
            .state('createArticle', {
                url: '/createArticle/:_id',
                templateUrl: 'createArticle/createArticle.html',
                controller:'createArticleCtrl',
                controllerAs:'vm'
            })
            .state('updateFields', {
                url: '/updateFields/:id',
                templateUrl: 'updateFields/updateFields.html',
                controller:'updateFieldsCtrl',
                controllerAs:'vm'
            })
            .state('showProducts', {
                url: '/showProducts/:category_id?category',
                templateUrl: 'showProducts/showProducts.html',
                controller:'showProductsCtrl',
                controllerAs:'vm'
            })
            .state('adminPanel', {
                url: '/adminPanel',
                templateUrl: 'adminPanel/adminPanel.html',
                controller:'adminPanelCtrl',
                controllerAs:'vm'
            })
            .state('removeCategory', {
                url: '/removeCategory?type',
                templateUrl: 'removeCategory/removeCategory.html',
                controller:'removeCategoryCtrl',
                controllerAs:'vm'
            })
            .state('productInfo', {
                url: '/productInfo/:id',
                templateUrl: 'productInfo/productInfo.html',
                controller:'productInfoCtrl',
                controllerAs:'vm'
            })
            .state('articles', {
                url: '/articles',
                templateUrl: 'articles/articles.html',
                controller:'articlesCtrl',
                controllerAs:'vm'
            })
            .state('card', {
                url: '/card?which?prodId',
                templateUrl: 'card/card.html',
                controller:'cardCtrl',
                controllerAs:'vm'
            })
            .state('articleInfo', {
                url: '/articleInfo/:_id',
                templateUrl: 'articleInfo/articleInfo.html',
                controller:'articleInfoCtrl',
                controllerAs:'vm'
            })
            .state('createAction', {
                url: '/createAction/',
                templateUrl: 'createAction/createAction.html',
                controller:'createActionCtrl',
                controllerAs:'vm'
            });
        $urlRouterProvider.otherwise('/glavnaya');
    });
