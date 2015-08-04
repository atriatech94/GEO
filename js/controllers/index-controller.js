is_open = 0 ;
var vers = 0 ;

angular.module('geolocation')
.controller('IndexController', function($scope,$rootScope,Category) {
            
})
.directive('indexDir' , function (Category){
		return {
			link: function($rootScope) {
				
				/*====================================================*/
                $('#login').on("submit",function(){
                    var form = $(this);
                    form.serialize();
                    $.post("http://www.atriatech.ir/geolocation/api/login",form.serialize(),function(data){
                        use_pp =JSON.parse(data);
                        
                        if(use_pp.not == 0 ){
                            localStorage.setItem('user_data', data);
                            localStorage.setItem("user_pass",form.serialize());
                            window.location.hash = "#/menu" ;
                            return false;
                        }
                        else{
                            alert("نام کاربری یا رمز عبور اشتباه است ");
                            return false;
                        }
                        
                       
                    })
                    .done(function(){
                        
                    })
                    .fail(function(){
                        alert("عدم برقراری اطلاعات")
                    })
                    return false;               
                });
                if(localStorage.getItem("user_pass")!=null)
                {
                    $.post("http://www.atriatech.ir/geolocation/api/login",localStorage.getItem("user_pass"),function(data){
                        localStorage.setItem('user_data', data);
                        window.location.hash = "#/menu" ;
                    })
                }
                
                
            }
}});
                
/*====================================================*/
var addRippleEffect = function (e) {
    var target = e.target;
    if (target.tagName.toLowerCase() !== 'button' ) return false;
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
        ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
        target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px';
    ripple.style.left = left + 'px';
    ripple.classList.add('show');
    return false;
}
    
document.addEventListener('click', addRippleEffect, false);


/*====================================================*/
