is_open = 0 ;

var gps = 0 ;
angular.module('geolocation')
.controller('mydestanceController', function($scope,$rootScope,Category) {
     
    
})
.directive('mydestanceDir' , function (){
		return {
            restrict: 'E',
            replace: true,
            link: function($scope) {
               $(document).ready(function(){
                   localStorage.setItem("vers",0);
                   user_data = JSON.parse(localStorage.getItem('user_data'));
                   var mydistance = user_data.get_distance;
                   mydistance.forEach(function(element,index){
                        var data ='<tr><td>'+( index + 1 )+'</td><td>'+element.area_des+' '+element.distance_name+'</td><td>'+element.date+'</td><td><a href="#/distance/'+element.gd_id+'"><img src="image/detail.png" /></a></td></tr>';
                        $('.mydistance_table').append(data);
                   });
                   
            }); 
        }
}});
