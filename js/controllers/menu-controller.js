// JavaScript Document menuController
angular.module('geolocation')
.controller('menuController', function($scope,$rootScope,Category) {
            
})
.directive('menuDir' , function (Category){
		return {
			link: function($rootScope) {
				document.getElementById("loading").style.display="none";
                console.log(JSON.parse(localStorage.getItem('user_data')));
				/*====================================================*/
                $('.upade_data').on("click",function(){
                    document.getElementById("loading").style.display="block";
                    var user_pass =  localStorage.getItem("user_pass");
                    $.post(base_url+"/api/login",user_pass,function(data){
                        localStorage.setItem('user_data', data);
                        document.getElementById("loading").style.display="none";
                        alert("بروز رسانی با موفقیت انجام شد");
                       
                    })
                    .fail(function(){
                        document.getElementById("loading").style.display="none";
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
                $('body').delegate('.loading_click','click',function(){
                    document.getElementById("loading").style.display="block";
                });
               
                
            }/*end*/
            
            
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