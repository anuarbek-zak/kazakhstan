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
        $urlRouterProvider.otherwise('/glavnaya');
    });
