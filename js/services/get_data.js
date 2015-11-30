angular.module('geolocation')
.factory('Category', function($http){
return {
        all : function(){
            return $http.get("http://hidoctor.ir/app/category.php")
        }
        
    }   
});
/*.factory('Sale', function($http){
    return {
        all : function(){
            return $http.get("http://app.shoooma.com?callback2=sdfsdfds432343")
        }
        
    }   
 
})
.factory('Special', function($http){
    return {
        all : function(){
            return $http.get("http://app.shoooma.com?callback3=sdrtee6QWfg343")
        }
        
    }   
 
})

*/
  