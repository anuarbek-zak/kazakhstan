angular.module('myApp')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('glavnaya', {
                url: '/glavnaya',
                templateUrl: 'glavnaya/glavnaya.html',
                controller:'glavnayaCtrl',
                controllerAs:'vm'
            })
            .state('tourism', {
                url: '/tourism',
                templateUrl: 'tourism/tourism.html',
                controller:'tourismCtrl',
                controllerAs:'vm'
            })
            .state('culture', {
                url: '/culture',
                templateUrl: 'culture/culture.html',
                controller:'cultureCtrl',
                controllerAs:'vm'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'about/about.html',
                controller:'aboutCtrl',
                controllerAs:'vm'
            })
        $urlRouterProvider.otherwise('/glavnaya');
    });
