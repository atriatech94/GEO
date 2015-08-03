angular.module('geolocation')
    .config(function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'pages/home/index.html',
            controller: 'IndexController',
        })
        .when('/markers', {
            templateUrl: 'pages/markers/index.html',
        })
        .when('/visit_list', {
            templateUrl: 'pages/visit_list/index.html',
        })
        .when('/product', {
            templateUrl: 'pages/product/index.html',
        })
        .when('/upload', {
            templateUrl: 'pages/upload/index.html',
            controller: 'uploadController',
        })
        .when('/help_me', {
            templateUrl: 'pages/help_me/index.html',
        })
        .when('/menu', {
            templateUrl: 'pages/menu/index.html',
            controller: 'menuController',
        })
        .when('/location', {
            templateUrl: 'pages/location/index.html',
            controller : "locationController",
        })
        .when('/map/:map_id/:distance_id', {
            templateUrl: 'pages/map/index.html',
            controller: 'MapController',
        })
		.when('/', {
            templateUrl: 'pages/home/index.html',
            controller: 'IndexController',
		})
		.otherwise({ redirectTo: '/' });
});