var gpss = 0;
bb= 0;
document.addEventListener("backbutton",amintest, false);
function amintest(){
    
    var loc =   window.location.hash;
    loc = loc.replace("#/", "");
    
    loc = loc.split('/');
    loc = loc[0] ;
    if($.fancybox.isOpen)
	{
		$.fancybox.close();
		return false;
	}
    if(loc == "menu" )
    {
       /*navigator.app.exitApp();*/
        return false;
    }
    else if(loc == "map")
    {
         window.location.hash = "#/location";
    }
    else if(loc == "product_detail")
    {
         window.location.hash = "#/product";
    }
    else if(loc == "")
    {
        navigator.app.exitApp();
    }
    else
    {
	    window.location.hash = "#/menu";
    }
    return false;
    
}

 //document.addEventListener("deviceready", onDeviceReady, false);
      var now_node = new Array();
            var bb = 0;
           if(localStorage.getItem("now_node")!=null)
            {
                now_node = JSON.parse(localStorage.getItem("now_node")) ;
                bb = now_node.length ;
            }
           
    // device APIs are available
    document.addEventListener('deviceready', function () {
    // Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:'APP IS RUNIING WELL'});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        setInterval(function(){geoFindMe()},50000); 
        
    }
}, false);

setInterval(function(){   navigator.geolocation.getCurrentPosition(onSuccessw,onErrorw,{timeout:10000});},1000)
function onSuccessw(){gpss =  1;console.log("gps is on");}
function onErrorw(){gpss =  0;console.log("gps is off");}
setTimeout(function(){geoFindMe()},5000); 
function geoFindMe() {
        
    if(localStorage.getItem("user_pass")!=null)
    {
                   
        navigator.geolocation.getCurrentPosition(GetLocation);
                     
        function GetLocation(location) {
            
            if(gpss==0){return false;}
            
            lat = location.coords.latitude;
            lon = location.coords.longitude;
           
            now_node.push({'mn_lat':lat ,'mn_lon': lon,'mn_date':  js_yyyy_mm_dd_hh_mm_ss() ,"marketer_id" : localStorage.getItem("user_id") });
            jnow_node = JSON.stringify(now_node);
            localStorage.setItem("now_node",jnow_node);
            bb++;
            if(bb > 5)
            {
                $.post(base_url+'/api/marketer_now/nima564321/',{ponits : localStorage.getItem("now_node") },function(){
                    localStorage.removeItem("now_node");
                    localStorage.setItem("now_node",null);
                    bb = 0;
                    now_node = [] ;
                     console.log("send");

                }).fail(function(){
                    console.log("Fail");            
                });
            }
                        
        }/*GetLocation*/
       
                   
    }/*end localstroge*/
    setTimeout(function(){geoFindMe()},5000); 
}/*end function*/

/*==================================================================================*/

function js_yyyy_mm_dd_hh_mm_ss () 
{
    now = new Date();
    year = "" + now.getFullYear();
    month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
    day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
    hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
    minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
    second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
/*==================================================================================*/
/*==================================================================================*/
$(function(){
    $(window).resize(function(){
       $('body,html').height( $(window).height());
        $.fancybox.update();
    });
});