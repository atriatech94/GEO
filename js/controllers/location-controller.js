is_open = 0 ;

var gps = 0 ;
angular.module('geolocation')
.controller('locationController', function($scope,$rootScope,Category) {
     
    
})
.directive('locationDir' , function (){
		return {
            restrict: 'E',
            replace: true,
            link: function($scope) {
               $(document).ready(function(){
                   localStorage.setItem("vers",0);
               /*==============================================================================================*/
                   
                   user_data = JSON.parse(localStorage.getItem('user_data'));
                   localStorage.setItem("marketer_id",user_data.user[0].marketer_id);
                   
                   $.each( (user_data.comission) , function( index, value ) {
                       var data = "<p>منطقه "+value.area_des+"</p><ul>";
                           $.each( (value.distance_full) , function( index, values ) {
                               data += "<li><a class='map_views' href='#/map/"+value.area_id+"/"+values.distance_id+"'>مسیر "+values.distance_name+"</a></li>"
                           });
                       data +="</ul>";
                        $('.location_area').append(data);
                    });
                   
              /*==============================================================================================*/
              
            
                $('.map_views').on("click",function(){   
                    navigator.geolocation.getCurrentPosition(onSuccess, onError);
                   
                    if(gps==1){
                         window.location.href = $(this).attr('href'); ; 
                        return false;
                    }
                    else{
                        alert("ابتدا GPS دستگاه خود را فعال کنید . ");
                        return false;
                    }
                   
                });
            
            /*==============================================================================================*/
                   setInterval(function(){
                       
                       navigator.geolocation.getCurrentPosition(onSuccess,onError,{timeout:10000});
                   
                   },1000)
   
                   function onSuccess()
                   {
                       gps =  1;
                   }
                   function onError()
                   {
                       gps =  0;
                   }
            /*==============================================================================================*/
            /*==============================================================================================*/
            });
        }
}});
