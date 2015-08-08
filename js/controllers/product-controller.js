// JavaScript Document menuController
angular.module('geolocation')
.controller('productController', function($scope,$rootScope,Category) {
            
})
.directive('productDir' , function (Category){
		return {
			link: function($rootScope) {
              
                var user_data =  JSON.parse(localStorage.getItem("user_data"));
                user_data = user_data.product ;
                
                user_data.forEach(function(element,index){
                    $('.product_list').append('<a href="#/product_detail/'+element.id+'/" class="product_one"><img src="image/cement.png"><p>'+element.name+'</p></a>');
                });
                    
            }
}});