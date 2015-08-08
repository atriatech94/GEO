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
                /*====================================================*/
                $('#exit').click(function(){
                    var r = confirm("آیا برای خروج اطمینان دارید ؟");
                    if (r == true) {
                        localStorage.removeItem("user_pass");
                        navigator.app.exitApp();  
                   }
                    
                    return false;
                });
                
                
                /*====================================================*/
            }
            
            
}})
.directive('helpmeDir' , function (Category){
		return {
			link: function($rootScope) {
               
                    
            }
}})
.directive('helpmeDir' , function (Category){
		return {
			link: function($rootScope) {
               
                    
            }
}});