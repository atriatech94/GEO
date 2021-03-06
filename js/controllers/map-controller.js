is_open = 0 ;
var a = 0 ;
var record = 0 ;
var timer;
var timeout = 6000;	
/*====================================================*/
var watchID;
var geo;    // for the geolocation object
var  polyOptions , poly;    // for the google map object
var mapMarker,geocoder;  // the google map marker object
var markers = [];
var markers_visti = [];
var last_lat = 0;
var last_lon = 0;
// position options
var MAXIMUM_AGE = 200; // miliseconds
var TIMEOUT = 300000;
var HIGHACCURACY = true;
var gps ; 


angular.module('geolocation')
.controller('MapController', ['$geolocation', '$scope', function($geolocation, $scope) {
    
}])
.directive('mapDir' , [ '$routeParams'  , function ($routeParams,$scope){
		return  function($scope) {

                document.getElementById("loading").style.display="none";
                area_id = $routeParams.map_id;
                distance_id = $routeParams.distance_id;
                var flightPath , flightPathh , area_id , center_mp  , last_points , directionsDisplay;
               
                var markers = [];
                var other , first_loc = null ;
                var b = 0;
                var counter = 0 ;
                var rendererOptions = {
                      //draggable: true
                    }; 
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
                var is_click = 0 ; 
                
                user_data = JSON.parse(localStorage.getItem('user_data'));

                var area_now = $.grep((user_data.comission), function (element, index) {
                    return element.area_id == area_id;
                });
                
                $('.map_header_text').text("منطقه "+ area_now[0].area_des+' ،  محدوده  '+area_now[0].distance_full[0][0].distance_name);
                var distance_full = area_now[0].distance_full;
                var distance_now_1 = $.grep(distance_full, function (element, index) {
                    return element[0].distance_id == distance_id;
                });
                var distance_now =  distance_now_1[0];
                
                /*====================select_product======================*/
                var user_product = user_data.product;
                var select_product;
                user_product.forEach(function(element,index){
                    select_product +='<option value="'+element.id+'">'+element.name+'</option>';
                });
                /*==========================================*/
            
                /*===================bargir=======================*/
                var bargir = user_data.bargir;
                var city = user_data.city;

                var point_type = $.grep((user_data.bargir), function (element, index) {
                    return element.pre_code == "j";
                });
            
                var visittype = $.grep((user_data.bargir), function (element, index) {
                    return element.pre_code == "m";
                });
            
                var siman_enemy = $.grep((user_data.bargir), function (element, index) {
                    return element.pre_code == "k";
                });
            
                /*-----------------------------------------------*/
                var point_type_select;
                point_type.forEach(function(element,index){
                    point_type_select +='<option value="'+element.cod+'">'+element.bargir+'</option>';
                });
                
                var visittype_select;
                visittype.forEach(function(element,index){
                    visittype_select +='<option value="'+element.cod+'">'+element.bargir+'</option>';
                });


                var siman_enemy_select;
                siman_enemy.forEach(function(element,index){
                    siman_enemy_select +='<option value="'+element.cod+'">'+element.bargir+'</option>';
                });
              
                var city_select;
                city.forEach(function(element,index){
                    city_select +='<option value="'+element.CityCode+'">'+element.City_Desc+'</option>';
                });
                /*==========================================*/
                
                var n_point = JSON.parse(distance_now[0].distance_markers);
                
                var n_shape = distance_now[0].distance_type;
                console.log(n_point);
                console.log(n_shape);
                /*==========================================*/


                localStorage.setItem("shapes", 'null');
                /*================================================================================*/
                function initialize() 
                {
                    
                    /*====================================*/
                    /*====================================*/
                    
                     var directionsService = new google.maps.DirectionsService();
                    geocoder = new google.maps.Geocoder();
                    var mapProp = {
                        center:new google.maps.LatLng(29.6543875,52.5155067),
                        zoom:13,
                        scrollwheel: false,
                        disableDoubleClickZoom: true,
                        mapTypeId:google.maps.MapTypeId.ROADMAP,
                        styles:[{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"on"}]},
                        {"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"visibility":"on"},
                        {"color":"#a7baa4"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},
                        {"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#58564a"}]},
                        {"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#fefdee"}]},
                        {"featureType":"landscape.natural","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},
                        {"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"visibility":"on"},
                        {"color":"#f8f6e8"}]},{"featureType":"poi.attraction","elementType":"geometry.fill","stylers":[{"visibility":"on"},
                        {"color":"#78bfbb"}]},{"featureType":"poi.attraction","elementType":"geometry.stroke","stylers":[{"lightness":"-61"}]},
                        {"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park",
                        "elementType":"geometry.fill","stylers":[{"color":"#d5fbdd"}]},{"featureType":"transit.line","elementType":"labels.text.stroke",
                        "stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"visibility":"on"}]},
                        {"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#8be2fc"}]}],
                    };
                  
                    
                    flightPathh = null;
                    map = new google.maps.Map(document.getElementById("map_canvas2"),mapProp);
                    
                    mapMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(29.6543875,52.5155067),
                        map: map,
                        visible:false,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 10,
                            color: 'yellow',
                        },
                       labelAnchor: new google.maps.Point(50, 0),
                    });
                    google.maps.event.addListener(map, 'click', function() {
                        
                    });
                    area_rr();
                    /*================================= click map for add ============================================*/
                    /*===================================Add All visitor icon ======================================*/ 

                    markers_vi = user_data.visited ;
                    console.log(markers_vi);
                    var pointers = [];
                    for (var i = 0; i < markers_vi.length; i++) {

                            var ppoi = JSON.parse(decodeURI(markers_vi[i].visited_latlon));
                            // var dataPhoto = data.photos[i];
                            var latLng = new google.maps.LatLng(ppoi.A,ppoi.F);

                            var markere = new google.maps.Marker({
                                position: latLng ,
                                icon : icon(markers_vi[i].visited_type),
                                title : markers_vi[i].visited_id,
                                customInfo : '<div class="map_det"><h3 class="name">'+markers_vi[i].visited_name+'</h3><button class="btn_visit_product" target="_blank" visited_id="'+markers_vi[i].visited_id+'" class="link" >ثبت سفارش</a><div>',
                            });
                                                    
                            pointers.push(markere);
                        
                            google.maps.event.addListener(pointers[i], 'click', function() {
                                
                                content_ifo = this.customInfo;
                                var infowindow = new google.maps.InfoWindow({
                                    content: content_ifo   ,
                                });
                                infowindow.open(map,this);
                                
                            });
                            
                            /*==============================marker click option===============================*/
                        
                    }
                    /*================================visit_click function=====================================*/
                    $('body').delegate('.btn_visit_product','click',function(){
                        visit_click($(this).attr('visited_id'))
                        return false;
                    });
                    function visit_click(id)
                    {
                        var boxes ='<form class="visit_mark" id="re_visit_mark">';
                        boxes +='<h2>سفارش خرید</h2>';
                        boxes +='<input  value="'+id+'" type="hidden" name="visited_id">';     
                        boxes +='<input type="hidden" name="marketer_id" value="'+localStorage.getItem("marketer_id")+'">';
                        boxes +='<label><select name="VisitType"><option  value="nulli" selected disable> نوع وزیت را انتخاب کنید</option>'+visittype_select+'</select></label>';
                        boxes +='<label><select name="C1"><option  value="nulli" selected disable>C1</option>'+siman_enemy_select+'</select></label>';
                        boxes +='<label><select name="C2"><option  value="nulli" selected disable>C2</option>'+siman_enemy_select+'</select></label>';
                        boxes +='<label><select name="C3"><option  value="nulli" selected disable>C3</option>'+siman_enemy_select+'</select></label>';
                        boxes +='<label><select name="C4"><option  value="nulli" selected disable>C4</option>'+siman_enemy_select+'</select></label>';
                        boxes +='<label><input  type="text" name="description" placeholder="توضیخات"></label>';
                        //boxes +='<label><select ><option selected disable>محصول انتخاب کنید</option>'+select_product+'<select></label>';
                        boxes +='<label><button type="submit">ارسال و دخیره ی اطلاعات</button></label>';
                        boxes +='</form>';
                        $.fancybox.open(
                            boxes,
                            { 
                                autoSize : false,
                                width    : "93%" ,
                                height:"75%;",
                            }
                        );
                    }
                    /*========================end visit_click function=============================================*/
                    mcOptions = {maxZoom: 16, ignoreHidden: true , styles: [{
                                    height: 53,
                                    url:  "image/m1.png",
                                    width: 53
                                },
                                {
                                    height: 56,
                                    url:  "image/m2.png",
                                    width: 56
                                },
                                {
                                    height: 66,
                                    url:  "image/m3.png",
                                    width: 66
                                },
                                {
                                    height: 78,
                                    url:  "image/m4.png",
                                    width: 78
                                },
                                {
                                    height: 90,
                                    url:  "image/m5.png",
                                    width: 90
                                }]};
                    var mc = new MarkerClusterer(map, pointers, mcOptions);
                    
                    for(var i = 0; i < pointers.length; i++) {
                        pointers[i].setMap(map);
                    }
                    
                    var show_hide_ponits = 1 ;
                    $('.show_hide').on("click",function(){
                      map_zoom = map.getZoom();
                       if(show_hide_ponits==1)
                        {
                             for(var i = 0; i < pointers.length; i++) {
                                 pointers[i].setVisible(false);
                             }
                            
                            $(this).css("background-image","url('image/eopen.svg')");
                            show_hide_ponits = 0;
                                                        
                        }else{
                            
                            for(var i = 0; i < pointers.length; i++) {
                                 pointers[i].setVisible(true);
                            }                            
                            $(this).css("background-image","url('image/eclose.svg')");
                            show_hide_ponits = 1;
                            
                            
                        }
                        map.setZoom((map_zoom-1));
                        setTimeout(function(){map.setZoom(map_zoom)},1);
                    });
                    /*===================================Add All visitor icon ======================================*/ 
                    /*================================= click map for add ==========================================*/
                    if(n_shape =="route")
                    {
                        
                        last_points = new Object();
                        first_loc = n_point.origin;
                        other = n_point.waypoints ;
                        last_points = n_point.destination;
                        
                        other[0].location = new google.maps.LatLng(  parseFloat( other[0].location.split(",")[0] ) , parseFloat( other[0].location.split(",")[1] ) );	
                        for(s=1;s < other.length-1 ;s++)
                        {
                            other[s].location = new google.maps.LatLng(  parseFloat( other[s].location.split(",")[0] ) , parseFloat( other[s].location.split(",")[1] ) );	
                        }
                        other[other.length - 1].location = new google.maps.LatLng(parseFloat( other[other.length - 1].location.split(",")[0] ) ,parseFloat( other[other.length - 1].location.split(",")[1] ) );

                        //console.log(other);
                        routing();

                    }
                    else
                    {
                        polyline_s(n_point)

                    }
                /*===============================================================================*/
                    function area_rr(){
                        
                        area =  [{id : area_now[0].area_id, shapes : area_now[0].area_shape , vals :  area_now[0].area_points }];  
                        
                        
                        if(area[0].shapes == "polygon")
                        {

                            var data = JSON.parse(area[0].vals);
                            var shapes;
                            for(i=0;i<data.length;i++)
                            {	
                                var po = new google.maps.LatLng(data[i].A, data[i].F);
                                if(i==0)
                                    shapes =[po];
                                else
                                    shapes.push(po);
                            }

                            flightPath = new google.maps.Polygon({
                                path: shapes,
                                geodesic: true,
                                fillColor:'#4BC1D2',
                                fillOpacity : .09 ,
                                strokeColor: '#4BC1D2',
                                strokeOpacity: 1,
                                strokeWeight: 3 ,
                            });
                            center_mp = shapes[0];  

                        }/*end if polygan*/
                        else if(area[0].shapes == "circle")
                        {

                            var data = JSON.parse(area[0].vals);
                            //console.log(data);

                            flightPath = new  google.maps.Circle({
                                strokeColor: '#96A831',
                                strokeOpacity: 1,
                                strokeWeight: 2,
                                fillColor: '#96A831',
                                fillOpacity: 0.15,
                                center: new google.maps.LatLng( data[0].lat , data[0].lon ),
                                radius:  data[0].radius ,
                            });
                            /**/
                            // Add the circle for this city to the map.
                            center_mp =  new google.maps.LatLng( data[0].lat , data[0].lon );
                        }
                        else if(area[0].shapes == "rectangle")
                        {

                            var data = JSON.parse(area[0].vals);
                            //console.log(data.ra.A);
                            band_A = new google.maps.LatLng(  data.za.A , data.ra.A);
                            band_B = new google.maps.LatLng(data.za.j  , data.ra.j );

                            var bounds = new google.maps.LatLngBounds(band_B , band_A);

                            //console.log(data);  console.log(band_B);  

                            flightPath = new google.maps.Rectangle({
                                strokeColor: '#4A93B5',
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: '#4A93B5',
                                fillOpacity: 0.15,
                                bounds: bounds ,
                            });	

                            center_mp = new google.maps.LatLng( data.za.A + .010 , data.ra.A - .03 );
                        }//rectangle
                        else if(area[0].shapes == "polyline")
                        {

                            var data = JSON.parse(area[0].vals);
                            var shapes;
                            for(i=0;i<data.length;i++)
                            {	
                                var po = new google.maps.LatLng(data[i].A, data[i].F);
                                if(i==0)
                                    shapes =[po];
                                else
                                    shapes.push(po);
                            }

                            flightPath = new google.maps.Polyline({
                                path: shapes,
                                geodesic: true,
                                fillColor:'#4BC1D2',
                                fillOpacity : .09 ,
                                strokeColor: '#4BC1D2',
                                strokeOpacity: 1,
                                strokeWeight: 3 ,
                            });
                            center_mp = shapes[0];
                        }//end polyline
                        setTimeout(function(){
                            map.setZoom(13);
                            map.setCenter( center_mp ); 
                        },500);


                        flightPath.setMap(map);

                        google.maps.event.addListener(flightPath, 'dblclick', function(event) {
                        
                            addMarker(event.latLng);
                        });
                    }

                    function map_clear(vars){
                        vars.setMap(null)
                        setAllMap(null);
                        //document.getElementById('btn_pol_route').style.display="none";
                    }


                }
                /*========================= remove_all ===============================*/
                    /*Remove all polyline and markers*/
                    function remove_all()
                    {
                        $("#btn_pol_route button").prop("disabled", true);
                        is_click = 1;
                        localStorage.setItem("destance", 'null');
                        localStorage.setItem("shapes", 'null');

                        if( flightPathh != null  )
                            flightPathh.setMap(null);

                        setAllMap(null);
                        flightPathh = null;
                        markers = new Object();
                        first_loc = [];
                        other = [];
                        last_points = [];
                        console.log(markers);
                        counter = 0;
                        directionsDisplay.setMap(null);
                    }
                /*====================== ADD MARKERS ===========================*/
                    function addMarker(location) {
                        latlon = JSON.stringify(location);
                        var marker = new google.maps.Marker({
                            position: location,
                            map: map ,
                        });
                        
                        var save_location = {"A":marker.position.lat() , "F":marker.position.lng() };
                        
                        markers_visti.push(marker);
                        var boxes ='<form class="visit_mark" id="visit_mark">';
                        boxes +='<h2>یک مکان جدید اضاف کنید</h2>';
                        boxes +='<input  value="'+encodeURI(JSON.stringify(save_location))+'" type="hidden" name="visited_latlon">';     
                        boxes +='<input type="hidden" name="marketer_id" value="'+localStorage.getItem("marketer_id")+'"><input type="hidden" name="area_id" value="'+area_id+'"><input type="hidden" name="distance_id" value="'+distance_id+'">';
                        boxes +='<label><input  name="visited_name" type="text" placeholder="نام "></label>';
                        boxes +='<label><select name="visited_type"><option value="nulli" selected disable>نوع محل را انتخاب کنید</option>'+point_type_select+'</select></label>';
                        boxes +='<label><select name="visited_perms"><option value="nulli" selected disable>وضعیت مشتری را انتخاب کنید</option><option value="1">حقیقی</option><option value="2">حقوقی</option></select></label>';
                        boxes +='<label><select name="visited_city"><option value="nulli" selected disable>شهر را انتخاب کنید</option>'+city_select+'</select></label>';
                        boxes +='<label><input  name="visited_address" type="text" placeholder="آدرس دقیق"></label>';
                        boxes +='<label><input id="not_imp" name="visited_pointzone" type="number" min="0" max="15" placeholder="درجه - 0 تا 15"></label>';
                        boxes +='<label><input  name="visited_mobile" type="number" placeholder="تلفن همرا"></label>';
                        boxes +='<label><input id="not_imp" name="visited_email" type="text" placeholder="پست الکترونیک"></label>';
                        boxes +='<label><input id="not_imp" name="visited_desc" type="text" placeholder="توضیحات"></label>';
                        boxes +='<label><select name="visited_type_m"><option  value="nulli" selected disable>نوع مشتری</option><option value="0">بتن آماده</option><option value="1">مشتریان بالقوه</option><option value="2">مشتریان فعلی</option></select></label>';
                        boxes +='<label><button type="submit">ارسال و دخیره ی اطلاعات</button></label>';
                        
                        boxes +='</form>';
                        $.fancybox.open(
                            boxes,
                            { 
                                autoSize : false,
                                width    : "93%" ,
                                height:"75%;",
                                afterClose: function() {
                                    clearMarkers();
                                },
                            }
                        );
                    }

                    /*Sets the map on all markers in the array.*/
                    function setAllMap(map) {
                        for (var i = 0; i < markers_visti.length; i++) {
                          markers_visti[i].setMap(map);
                        }
                    }

                    /* Removes the markers from the map, but keeps them in the array.*/
                    function clearMarkers() {
                        setAllMap(null);
                    }

                    /*Shows any markers currently in the array.*/
                    function showMarkers() {
                        setAllMap(map);
                    }

                    /*Deletes all markers in the array by removing references to them.*/
                    function deleteMarkers() {
                        clearMarkers();
                        markers_visti = [];

                    }

            /*=================================================*/
            
            /*=================================================*/

            function polyline_s(shapes)
            {

                is_click = 0;
                for(l=0;l<shapes.length;l++)
                {
                    shapes[l] = new google.maps.LatLng(shapes[l].A,shapes[l].F);	      
                }
                        
                localStorage.setItem("destance", JSON.stringify(shapes));
                localStorage.setItem("shapes", 'polyline');
                flightPathh = new google.maps.Polyline({
                    path: shapes,
                    geodesic: true,
                    fillColor:'#648A8E',
                    fillOpacity : .09 ,
                    strokeColor: '#D90000',
                    strokeOpacity: 1,
                    strokeWeight: 3 ,
                });

                google.maps.event.addListener(flightPathh.getPath(), 'set_at' ,function(){
                    var data = [] ;
                    var data = flightPathh.getPath().getArray();
                    localStorage.setItem("destance", JSON.stringify(data));
                });
                google.maps.event.addListener(flightPathh.getPath(), 'insert_at' ,function(){
                    var data = [] ;
                    var data = flightPathh.getPath().getArray();
                    localStorage.setItem("destance", JSON.stringify(data));
                });

                flightPathh.setMap(map);
                if(markers.length > 0)
                    setAllMap(null);

            }/*end poliline*/
            /*===============================================================================================*/
            function routing()
            {
                is_click = 0;
                var destance = new Object();
                
                var request = {
                    origin: first_loc,
                    destination:last_points,
                    waypoints: other ,
                    optimizeWaypoints: true,
                    travelMode: google.maps.TravelMode.WALKING  
                };

                destance.origin = first_loc ;
                destance.destination = last_points ;
                destance.waypoints = other;
                console.log(destance);
                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        var route = response.routes[0];
                        // For each route, display summary information.
                    }
                });
                directionsDisplay.setMap(map);
                directionsDisplay.setMap(map);
                directionsDisplay.setPanel(document.getElementById('directionsPanel'));

                    

                //if(flightPathh != null || flightPathh !== "undefined"  )
                //map_clears(flightPathh);
                
            }/*end routing*/
                   
            function map_clears(vars)
            {
                vars.setVisible(false);
            }
            initialize() ;
            /*===================================chech item after refresh or going page======================================*/    
            /*===================================chech item after refresh or going page======================================*/    
            if(localStorage.getItem('last_lat') == null)
                localStorage.setItem('last_lat',0);
            if(localStorage.getItem('last_lon') == null)
                localStorage.setItem('last_lon',0);
                
            if(localStorage.getItem('record') == null )
            {
                localStorage.setItem('record',0);
                localStorage.setItem('last_lon',0);
                localStorage.setItem('last_lat',0);
                
            }
            if(localStorage.getItem('record') == 2)
            {
                $('.record').addClass("active").text("Resume recording");
                $('.record').children('a').children('img').attr('src',"url('image/play.png')");
                 markers = localStorage.getItem('markers') ;
                console.log(markers);
                other_map();
                                
            }
            if(localStorage.getItem('record') == 1)
            {
                $('.record').addClass("active").text("play");
                $('.record').children('a').children('img').attr('src',"url('image/pause.png')");
                markers = localStorage.getItem('markers') ;
                other_map();
            }
            function other_map(){
                  if(localStorage.getItem('area_id') != area_id || localStorage.getItem('distance_id') != distance_id  )  {
                      $('.footer').hide(0)
                  }
            }
            
           
            /*=========================================================================*/
            var a = 0
            function getGeoLocation() {
                try {
                    if( !! navigator.geolocation ) return navigator.geolocation;
                    else return undefined;
                } catch(e) {
                    return undefined;
                }
            }
            
            function show_map(position) {
                
                /*if( ((position.coords.latitude*10000) - (localStorage.getItem('last_lat')) ) > 1 || ((position.coords.longitude*10000) - localStorage.getItem('last_lon') ) > 1 )
                {
                   */ 
                    markers.push( { "lat" : ( Math.round( position.coords.latitude*100000)/100000 ) , "lon" : ( Math.round( position.coords.longitude*100000)/100000 )});
                    marker_ls = JSON.stringify(markers);
                    localStorage.setItem("markers",marker_ls);
                    localStorage.setItem("last_lat",position.coords.latitude*100000);
                    localStorage.setItem("last_lon",position.coords.longitude*100000);
                //}
                
            }

            function geo_error(error) {
                stopWatching();
                switch(error.code) {
                    case error.TIMEOUT:
                        alert('Geolocation Timeout');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('Geolocation Position unavailable');
                        break;
                    case error.PERMISSION_DENIED:
                        alert('Geolocation Permission denied');
                        break;
                    default:
                        alert('Geolocation returned an unknown error code: ' + error.code);
                }
            }

            function stopWatching() {
                if(watchID) geo.clearWatch(watchID);
                watchID = null;
            }

            function startWatching() {
                watchID = geo.watchPosition(show_map, geo_error, {
                    enableHighAccuracy: HIGHACCURACY,
                    maximumAge: MAXIMUM_AGE,
                    timeout: TIMEOUT
                });
            }
            /*=========================================================================*/
            
            $('.stop').click(function(){
                if(localStorage.getItem('record') != 0 && localStorage.getItem('record') != null )
                {
                    if(markers.length > 0 )
                    {
                        $.post(base_url+"/api/get_user_distance",{marketer_id : localStorage.getItem("marketer_id"),area_id: localStorage.getItem("area_id"),distance_id: localStorage.getItem("distance_id"), markers: JSON.stringify(markers) },function(data){
                            console.log(data);
                            markers = [];
                            localStorage.setItem('record',0) ;
                            localStorage.setItem('markers',null) ;
                            localStorage.setItem('last_lon',0);
                            localStorage.setItem('last_lat',0);
                            $('.record').addClass("active").text("Record");
                            $('.record').css('background-image',"url('image/recoord.png')");
                            send_to_server(1);
                        })
                        .fail(function() {
                           alert("خطا در برقراری اطلاعات");

                        });
                    }
                    else
                    {
                        send_to_server(1);
                        $('.record').addClass("active").text("شروع");
                        $('.record').css('background-image',"url('image/recoord.png')");
                        localStorage.setItem('record',0) ;
                        localStorage.setItem('markers',null) ;
                        localStorage.setItem('last_lon',0);
                        localStorage.setItem('last_lat',0);
                    }
                }
                return false;
            });
            /*=========================================================================*/
            $('.record').on("click",function(){
                //alert(record);
                if(localStorage.getItem('record') == 0){
                    start();
                    send_to_server(0);
                    localStorage.setItem('record', 1) ;
                    localStorage.setItem("area_id",area_id);
                    localStorage.setItem("distance_id",distance_id);
                    $(this).addClass("active").text("recording");
                    $(this).css('background-image',"image/pause.png")
                }else if(localStorage.getItem('record') == 1){
                    pause();
                    localStorage.setItem('record', 2);
                    $(this).removeClass("active").text("Resume Record");
                    $(this).css('background-image',"url('image/play.png')")
                }
                else{
                    start();
                    localStorage.setItem('record', 1) ;
                    localStorage.setItem("distance_id",distance_id);
                    $(this).addClass("active").text("recording");
                    $(this).css('background-image',"url('image/pause.png')");
                   
                }

            });
             $('.pause').on("click",function(){
                 send_to_server(1);
                 console.log('pause')
                  pause();
                 record = 0;
             });
            function pause()
            {
                
            }
            function restart()
            {
                
            }
            function start()
            {
                if( ( geo = getGeoLocation() ) ) 
                     startWatching(1);
                else
                    alert('Geolocation not supported.');
            }
            function send_to_server(times)
            {
                localStorage.setItem("user_times",times);
            }
            /*==============================ver am i===========================================*/
            
            
            /*==============================ver am i===========================================*/
            
            $('.imap').click(function(){
                user_location(1);
               
            });
            
            setInterval(function(){ navigator.geolocation.getCurrentPosition(onSuccessw,onErrorw,{timeout:1000}); },500);
                            
                                
            function onSuccessw(){gpss =  1;navigator.geolocation.getCurrentPosition(GetLocations);/*console.log("gps is on");*/}
            function onErrorw(){gpss =  0;/*console.log("gps is off");*/}
                
            var user_pos = new Object();
                
                
            // navigator.geolocation.getCurrentPosition(GetLocation);
                
            function GetLocations(location) 
            {
                console.log(location.coords.latitude,location.coords.longitude);
                user_pos.lat = location.coords.latitude;
                user_pos.lon = location.coords.longitude;
            }
                
                
            
            
            function user_location(pant_too)
            {
                
                if(gpss == 1){ 
                   
                    var imap = new google.maps.LatLng(user_pos.lat,user_pos.lon);
                    geocoder.geocode({'location': imap}, function(results, status) {
                        if (status === google.maps.GeocoderStatus.OK) {
                            
                            mapMarker.setPosition(imap);
                            mapMarker.setVisible(true);
                            if(pant_too == 1){map.panTo(imap);}
                            
                        }else{
                            alert('عدم برقراری اطلاعات با ماهواره gps , مجدد تلاش نمایید .'); 
                        }
                    });
                    
                }else{
                   alert('عدم برقراری اطلاعات با ماهواره gps , مجدد تلاش نمایید .'); 
                }
                                    
                    
            }
            /*======================================add place===================================*/
            $("body").delegate('label.empty input , label.empty select ','change',function(){
                $(this).parent('label').removeClass('empty');
            });
            /*======================================add place===================================*/
            var new_place_visit = [];
            $('body').delegate('#visit_mark','submit',function(){
				$('*label.empty').removeClass('empty');
                var form = $(this);
                var count_error = 0;
                form.children('label').each(function(index,element){
                    
                   vals = element.children[0].value ;
                    
                   if(element.children[0].getAttribute("id") != "not_imp")
                   {
                    
                       if(element.children[0].tagName.toLowerCase() == "input" || element.children[0].tagName.toLowerCase() == "textarea" )
                       {   

                           if(vals.trim() == ""  || vals.trim() === undefined || vals.trim() == null  )
                           {
                               element.className += ' empty';
                               count_error++;
                           }
                       }
                        else if(element.children[0].tagName.toLowerCase() == "select")
                        {
                            if(vals.trim() == 'nulli' || vals.trim() == ""  || vals.trim() === undefined )
                            {
                                element.className += ' empty';
                                count_error++;
                            }
                        }
                   }
                });
               if(count_error > 0)
               {
                return false;
               }
                 
                var pointers2 = [];
                document.getElementById("loading").style.display="block";
                $.post(base_url+"/api/get_visited",form.serialize(),function(data){
                    //clearMarkers();
                    document.getElementById("loading").style.display="none";
                    var jd1 = JSON.parse(data);
                    console.log(jd1.insert_id);
                    if (typeof user_data.visited != "undefined") {
                        var dp = {
                           visited_address:$('input[name="visited_address"]').val(),
                           visited_email:$('input[name="visited_email"]').val(),
                           visited_id: jd1.insert_id ,
                           visited_latlon: decodeURI($('input[name="visited_latlon"]').val()),
                           visited_mobile:$('input[name="visited_mobile"]').val(),
                           visited_type:$('input[name="visited_type"]').val(),
                           visited_name:$('select[name="visited_type_m"] option:selected').val(),
                          
                       };
                        
                        
                        user_data.visited.push(dp);
                        localStorage.setItem('user_data', JSON.stringify(user_data));
                
                    }
                    
                    $.fancybox.close();
                    alert("اطلاعات با موفقیت ذخیره شد");
                    
                })
                .fail(function(){
                    document.getElementById("loading").style.display="none";
                    localStorage.setItem("new_place_visit",form.serialize());
                    var boxes = '<div class="alert_not_post"><p> . عدم برقراری با سرور <br>  . اطلاعات ارسال نشد</p>';
                    boxes +='<button class="send_new_again" >تلاش مجدد</button><button class="save_new_in" >ذخیره در آپلود ها</button>';
                    boxes +='<div>';
                    $.fancybox.open(boxes,
                        {
                            autoSize : false,
                            width    : "93%" ,
                            height:"29%;",
                            modal : true,
                       }
                    );
                });
                return false;
            });
            
            
                    
            
             $('body').delegate('.send_new_again','click',function(){
                 $('body').delegate('#visit_mark button').trigger("click");
            });
            
            $('body').delegate('.save_new_in','click',function(){
                if(localStorage.getItem('newvisit_form') != null )
                {
                   new_place_visit =  JSON.parse(localStorage.getItem('newvisit_form'));
                }
                new_place_visit.push(localStorage.getItem("new_place_visit"));
                localStorage.setItem("now_place_visit",null);
                localStorage.setItem('newvisit_form',JSON.stringify(new_place_visit));
                console.log(localStorage.getItem('newvisit_form'));
                alert("اطلاعات در برنامه ذخیر شد ، شما می توانید اطلاعات را در قسمت آپلود مشاهده نمایید ");
                $.fancybox.close();
            });
            /*=====================================================================================*/
            /*===========================================re visit_plce==============================*/
                var revisit_form = [];
                
                 $('body').delegate('#re_visit_mark','submit',function(){
                     $('*label.empty').removeClass('empty');
                     var form = $(this);
                     var count_error = 0;
                     form.children('label').each(function(index,element){

                         vals = element.children[0].value ;
                         
                         if(element.children[0].tagName.toLowerCase() == "input" || element.children[0].tagName.toLowerCase() == "textarea" )
                         {   
                             
                             if(vals.trim() == ""  || vals.trim() === undefined || vals.trim() == null  )
                             {
                                 element.className += ' empty';
                                 count_error++;
                             }
                         }
                         else if(element.children[0].tagName.toLowerCase() == "select")
                         {
                             if(vals.trim() == 'nulli' || vals.trim() == ""  || vals.trim() === undefined )
                             {
                                 element.className += ' empty';
                                 count_error++;
                             }
                         }
                             
                     });
                     if(count_error > 0)
                     {
                         return false;
                     }
                     
                     form.serialize();
                     document.getElementById("loading").style.display="block";
                     $.post(base_url+"/api/re_visited",form.serialize(),function(data){
                         document.getElementById("loading").style.display="none";
                            $.fancybox.close();
                            alert("اطلاعات با موفقیت ذخیره شد");
                        })
                        .fail(function(){
                            document.getElementById("loading").style.display="none";
                            localStorage.setItem("now_place_visit",form.serialize());
                            var boxes = '<div class="alert_not_post"><p> . عدم برقراری با سرور <br>  . اطلاعات ارسال نشد</p>';
                            boxes +='<button class="send_again" >تلاش مجدد</button><button class="save_in" >ذخیره در آپلود ها</button>';
                            boxes +='<div>';
                            $.fancybox.open(boxes,
                                    {
                                        autoSize : false,
                                        width    : "93%" ,
                                        height:"29%;",
                                        modal : true,
                                    }
                                );
                            
                        });
                        return false;
                    });
                     
            $('body').delegate('.send_again','click',function(){
                 $('body').delegate('#re_visit_mark button').trigger("click");
            });
            
            $('body').delegate('.save_in','click',function(){
                if(localStorage.getItem('revisit_form') != null )
                {
                   revisit_form =  JSON.parse(localStorage.getItem('revisit_form'));
                }
                revisit_form.push(localStorage.getItem("now_place_visit"));
                localStorage.setItem("now_place_visit",null);
                localStorage.setItem('revisit_form',JSON.stringify(revisit_form));
                console.log(localStorage.getItem('revisit_form'));
                alert("اطلاعات در برنامه ذخیر شد ، شما می توانید اطلاعات را در قسمت آپلود مشاهده نمایید ");
                $.fancybox.close();
            });
            /*=====================================================================================*/
            /*=========================================================================*/
           
}}]);
function icon(one_visit_type)
{
    if(one_visit_type == "0")
    {
        return one_img_address = "image/marker_pink_2.png";
    }
    else if(one_visit_type == "1")
    {
        return one_img_address = "image/marker_gerrn_2.png";
    }
    else
    {
        return one_img_address = "image/marker_blue_2.png" ;
    }
}
