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
            controller: 'productController',
        })
        .when('/product_detail/:id', {
            templateUrl: 'pages/product_detail/index.html', 
            controller: 'productdetailController',
        })
        .when('/upload', {
            templateUrl: 'pages/upload/index.html',
            controller: 'uploadController',
        })
        .when('/help_me', {
            templateUrl: 'pages/help_me/index.html',
            controller: 'helpController',
        })
        .when('/menu', {
            templateUrl: 'pages/menu/index.html',
            controller: 'menuController',
        })
        .when('/location', {
            templateUrl: 'pages/location/index.html',
            controller : "locationController",
        })
        .when('/mydestance', {
            templateUrl: 'pages/mydestance/index.html',
            controller : "mydestanceController",
        })
        .when('/distance/:id', {
            templateUrl: 'pages/distance/index.html',
            controller : "distanceController",
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