// JavaScript Document
angular.module('geolocation')
.controller('uploadController', function($scope,$rootScope,Category) {
     
    
})
.directive('uploadDir' , function (){
		return {
            link: function($scope) {
                
                if(localStorage.getItem("newvisit_form")!=null)
                {
                    var new_visit_form =  JSON.parse( localStorage.getItem("newvisit_form") );
                    $('.new_visit span').text(new_visit_form.length);
                }
                if(localStorage.getItem("revisit_form")!=null)
                {
                    var re_visit_form =  JSON.parse( localStorage.getItem("revisit_form") );
                    $('.re_visit span').text(re_visit_form.length);
                }
                /*==================================================================*/
                /*==================================================================*/
                $("body").delegate(".uplaod_list_btn","click",function(){
                    
                    var re_visit_form =  JSON.parse( localStorage.getItem("revisit_form") );
                    var new_visit_form =  JSON.parse( localStorage.getItem("newvisit_form") );
                    
                    /*========================================================================*/   
                    if(localStorage.getItem("revisit_form")!=null)
                    {
                        $.post("http://www.atriatech.ir/geolocation/api/re_visited_up" , {data_post : localStorage.getItem("revisit_form") } , function(data){
                            $('.re_visit span').text(0);
                            localStorage.removeItem("revisit_form");
                        }).
                        fail(function(){
                            alert("عدم برقراری اطلاعات");
                        });
                    }
                    /*========================================================================*/
                   if(localStorage.getItem("newvisit_form")!=null)
                   {
                        $.post("http://www.atriatech.ir/geolocation/api/get_visited_up" , {data_post : localStorage.getItem("newvisit_form") } , function(data){
                            //localStorage.removeItem("newvisit_form");
                            $('.new_visit span').text(0);
                            alert("اطلاعات با موفقیت ذخیره شد");
                        }).
                        fail(function(){
                            alert("عدم برقراری اطلاعات");
                        });
               
                   }
                    /*========================================================================*/
            });
            /*========================================================================*/
            /*========================================================================*/
                    
                    
       
      
  }}});                

          
