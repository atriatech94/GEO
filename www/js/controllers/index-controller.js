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
                    document.getElementById("loading").style.display="block";
                    var form = $(this);
                    form.serialize();
                    
					window.plugins.imeiplugin.getImei(callback1);
					                                
					function callback1(imei) {
						   localStorage.setItem("IMEI",imei);
						}
					
                    //localStorage.setItem("IMEI","863439021363607");
                    $.post(base_url+"api/login",{marketer_user:$('#username').val(),marketer_pass:$('#password').val(),marketer_imei:localStorage.getItem('IMEI')},function(data){
                        use_pp = JSON.parse(data);
                        
                        if(use_pp.not == 0 ){
                            localStorage.setItem('user_data', data);
                            localStorage.setItem("user_id",(use_pp.user[0].marketer_id));
                            localStorage.setItem("username",$('#username').val());
                            localStorage.setItem("password",$('#password').val());
                            
                            
                            window.location.hash = "#/menu" ;
                            document.getElementById("loading").style.display="none";
                            return false;
                        }
                        else{
                            document.getElementById("loading").style.display="none";
                            alert("نام کاربری یا رمز عبور اشتباه است ");
                            return false;
                        }
                        
                       
                    })
                    .done(function(){
                        document.getElementById("loading").style.display="none";
                    })
                    .fail(function(){
                        document.getElementById("loading").style.display="none";
                        alert("عدم برقراری اطلاعات");
                    })
                    return false;               
                });
				
                if(localStorage.getItem("user_pass")!=null)
                {
					
                    document.getElementById("loading").style.display="block";
                    $.post(base_url+"/api/login",{marketer_user:localStorage.getItem('username'),marketer_pass:localStorage.getItem('password'),marketer_imei:localStorage.getItem('IMEI')},function(data){
                        use_pp =JSON.parse(data);
                        localStorage.setItem("user_id", (use_pp.user[0].marketer_id));
                        localStorage.setItem('user_data', data);
                        window.location.hash = "#/menu" ;
                    }).fail(function(){
                        document.getElementById("loading").style.display="none";
                        alert("عدم برقراری اطلاعات");
                    })
					
                
                 }
                
            }/*end */
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
