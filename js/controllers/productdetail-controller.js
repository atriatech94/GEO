// JavaScript Document menuController
angular.module('geolocation')
.controller('productdetailController', function($scope,$rootScope,Category) {
            
})
.directive('productdetailDir' , function ($routeParams,Category){
		return {
			link: function($rootScope) {
                document.getElementById("loading").style.display="none";
                product_id = $routeParams.id;
               
                var user_data =  JSON.parse(localStorage.getItem("user_data"));
                
                var area_now = $.grep((user_data.product ), function (element, index) {
                    return element.id == product_id;
                });
                console.log(area_now);
                $('.header_page_location').text(area_now[0].name);
                 $('.detail_pro').append('<h2>'+area_now[0].name+'</h2>');
                $('.detail_pro').append(area_now[0].description);
                
                

            }
}});