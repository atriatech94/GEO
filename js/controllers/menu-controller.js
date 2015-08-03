// JavaScript Document menuController
angular.module('geolocation')
.controller('menuController', function($scope,$rootScope,Category) {
            
})
.directive('menuDir' , function (Category){
		return {
			link: function($rootScope) {
				
				/*====================================================*/
                $('.upade_data').on("click",function(){
                    var user_pass =  localStorage.getItem("user_pass");
                    $.post("http://www.atriatech.ir/geolocation/api/login",user_pass,function(data){
                        localStorage.setItem('user_data', data);
                        alert("بروز رسانی با موفقیت انجام شد");
                    })
                    .fail(function(){
                        alert("خطا در اتصال به سرور ، مجدد تلاش کنید");
                    })
                    return false;               
                });
                
            }
}})
.directive('helpmeDir' , function (Category){
		return {
			link: function($rootScope) {
               
                    var i = 0;
                    setInterval(function(){
                        $('.append').append("<h1>"+(i++)+"</h1>")
                    },1000);  
            }
}});