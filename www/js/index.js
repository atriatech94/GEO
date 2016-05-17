var gpss = 0;
var bb = 0;




document.addEventListener("backbutton",amintest, false);
location_show();
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
   
    if(localStorage.getItem("now_node") != null )
    {
      
        now_node = JSON.parse(localStorage.getItem("now_node")) ;
        bb = now_node.length ;
    }
// device APIs are available
var timer ;
var timer2 ;
document.addEventListener('deviceready', function () {
    
     // Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:'APP IS RUNIING WELL'});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();
    // Called when background mode has been activated
   
}, false);

setInterval(function(){ navigator.geolocation.getCurrentPosition(onSuccessw,onErrorw,{timeout:10000});},3000)
function onSuccessw(){gpss =  1;/*console.log("gps is on");*/}
function onErrorw(){gpss =  0;/*console.log("gps is off");*/}


//geoFindMe();
function geoFindMe() {
    
    if(localStorage.getItem("user_pass")!=null)
    {
        
        if(gpss==0){return false;}
        location_show();
        lat =user_pos.lat;
        lon = user_pos.lon;
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
                                   
    }/*end localstroge*/

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
/*==================================================================================*/

/*==================================================================================*/
var user_pos = new Object();
function location_show(){
    
    navigator.geolocation.getCurrentPosition(GetLocation);
    function GetLocation(location) {
        if(gpss==0){return false;}
        user_pos.lat = location.coords.latitude;
        user_pos.lon = location.coords.longitude;
    }
           
}
/*==================================================================================*/
var markers_n = new Array();
function send_to_server_ul(){
   
    if(localStorage.getItem("user_times") != null ){
      
        if(localStorage.getItem("user_times") == 0)
        {
            console.log("user_times");
            markers_n.push( { "lat" : ( Math.round( user_pos.lat*100000)/100000 ) , "lon" : ( Math.round( user_pos.lon*100000)/100000 )});
            console.log(markers_n);
            if(markers_n.length > 0 )
            {
                console.log(markers.length);
                $.post(base_url+"/api/get_user_distance",{marketer_id : localStorage.getItem("marketer_id"),area_id: localStorage.getItem("area_id"),distance_id: localStorage.getItem("distance_id"), markers: JSON.stringify(markers_n) },function(data){
                    console.log(data);
                    markers_n = [];
                    localStorage.setItem("markers",null)
                })
                .fail(function() {
                    console.log("No Internet Access");  
                })
                console.log(markers_n);
                /*end time outt*/
            }
        }
    }
}
/*==================================================================================*/
$.ajaxSetup({
    timeout: 30000,
});
