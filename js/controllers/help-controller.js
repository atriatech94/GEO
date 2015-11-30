// JavaScript Document menuController
angular.module('geolocation')
.controller('helpController', function($scope,$rootScope,Category) {
            
})
.directive('helpmeDir' , function (Category){
		return {
			link: function($rootScope) {
                document.getElementById("loading").style.display="none";
                    
            }
}});