/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


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
<<<<<<< HEAD
        setInterval(function(){geoFindMe();},50000);
=======
        setTimeout(geoFindMe,50000); 
>>>>>>> origin/master
    }
}, false);
    //
            function geoFindMe() {
               
                if(localStorage.getItem("user_pass")!=null)
                {
                    var output = document.getElementById("out");
                    if (!navigator.geolocation){
                        return;
                    }
                    function success(position) {

                        now_node.push({'mn_lat':position.coords.latitude ,'mn_lon':position.coords.longitude,'mn_date':  js_yyyy_mm_dd_hh_mm_ss() ,"marketer_id" : localStorage.getItem("user_id") });
                        jnow_node = JSON.stringify(now_node);
                        localStorage.setItem("now_node",jnow_node);
                        bb++;
                        if(bb > 5)
                        {
                           $.post('http://www.simanfars.ir/marketer/api/marketer_now/nima564321/',{ponits : localStorage.getItem("now_node") },function(){
                               localStorage.removeItem("now_node");
                               bb = 0;
                               now_node = [] ;
                               
                           }).fail(function(){
                               console.log("Fail");            
                           });
                        }
                       
                        
                    };
                    function error() {};
                    navigator.geolocation.getCurrentPosition(success, error);
                }/*end localstroge*/
                
            }/*end function*/
            
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
<<<<<<< HEAD
=======
                        
        }/*GetLocation*/
       
                   
    }/*end localstroge*/
     setTimeout(geoFindMe,50000);

}/*end function*/

/*==================================================================================*/
/*==================================================================================*/
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
    
>>>>>>> origin/master
