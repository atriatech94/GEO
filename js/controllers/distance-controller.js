is_open = 0 ;

var gps = 0 ;
angular.module('geolocation')
.controller('distanceController', function($scope,$rootScope,Category) {
     
    
})
.directive('distanceDir'  , [ '$routeParams' , function ($routeParams,$scope){
		return {
            restrict: 'E',
            replace: true,
            link: function($scope) {
               $(document).ready(function(){
                   localStorage.setItem("vers",0);
                   var flightPath , flightPathh, flight_Pathh , area_id , center_mp , map , last_points , directionsDisplay;
                   var markers = [];
                   var distance_f;
                   var other , first_loc = null ;
                   var b = 0;
                   var counter = 0 ;
                   var rendererOptions = {}; 
                   var count_click = 0 ;
                   var directionsService = new google.maps.DirectionsService();
                   var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
                   var is_click = 0 ; 
           /*==============================================================================================*/
                   
                   document.getElementById("loading").style.display="none";
                   localStorage.setItem("vers",0);
                   user_data = JSON.parse(localStorage.getItem('user_data'));
                   var mydistance = user_data.get_distance;
            /*==============================================================================================*/
                   var flightPathh;
                   function initialize_des() 
                   {
                        
                       directionsService = new google.maps.DirectionsService();
                       mapProp = {
                           center:new google.maps.LatLng(29.6543875,52.5155067),
                           zoom:12,
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
                       map = new google.maps.Map(document.getElementById("map_canvas3"),mapProp);
           /*==============================================================================================*/

                       var distance_id_get = $routeParams.id;

                       distance_f = $.grep(mydistance, function( a ) {
                            return a.gd_id == distance_id_get;
                       });
                       
                       area_rr(1);
                       
                       n_shape = distance_f[0].distance_type;
                       n_point = JSON.parse(distance_f[0].distance_markers);	

                      if(n_shape =="route")
                      {
                          last_points = new Object();
                          first_loc = n_point.origin;
                          other = n_point.waypoints ;
                          last_points = n_point.destination;
                          for(s=1;s < other.length-1 ;s++)
                          {
                              other[s].location = new google.maps.LatLng(  parseFloat( other[s].location.split(",")[0] ) , parseFloat( other[s].location.split(",")[1] ) );	
                          }
                          other[0].location = new google.maps.LatLng(  parseFloat( other[0].location.split(",")[0] ) , parseFloat( other[0].location.split(",")[1] ) );	
                          other[other.length - 1].location = new google.maps.LatLng(parseFloat( other[other.length - 1].location.split(",")[0] ) ,parseFloat( other[other.length - 1].location.split(",")[1] ) );

                            routing();

                        }else
                        {
                            polyline_s(n_point)
                        }

                        distance_vals = JSON.parse(distance_f[0].markers);
                        distance_points = new Array();

                       
                       
                        distance_vals.forEach(function(element,index){
                                                        
                                if( (element.length) > 0)
                                distance_points.push({lat: element[0].lat,lon:element[0].lon});
                                else
                                distance_points.push({lat: element.lat,lon:element.lon});
                       
                        });
                       console.log(distance_points);
                        
                       polyline_s_get(distance_points);
            /*==============================================================================================*/
                       
                   }
            /*==============================================================================================*/
                 
               
        /*================================================================================*/
        /*======================ROUTING===========================*/
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

                       localStorage.setItem("destance", JSON.stringify(destance));
                       
                       localStorage.setItem("shapes", 'route');
                       
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
                       
                    google.maps.event.addListener(directionsDisplay, 'directions_changed', function(){

                        destance.origin = directionsDisplay.getDirections().request.origin ;
                        destance.destination = directionsDisplay.getDirections().request.destination ;
                        destance.waypoint = directionsDisplay.getDirections().request.waypoints;
                          
                    });
                       
                   }/*end routing*/
                  
                   function map_clears(vars)
                   {
                       vars.setVisible(false);
                   }

                   initialize_des();
                  
            /*----------=================================================-----------------*/
           /*======================POLYLINE===========================*/
                   function polyline_s(shapes)
                   {

                        is_click = 0;

                        for(l=0;l<shapes.length;l++)
                        {
                            shapes[l] = new google.maps.LatLng(parseFloat(shapes[l].A),parseFloat(shapes[l].F));	  

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

                        flightPathh.setMap(map);
                        if(markers.length > 0)
                        setAllMap(null);
                        
                       
                   }/*end poliline*/
                  
            /*=================================================*/
            /*=================================================*/
            function polyline_s_get(shapes_get){
                    console.log(shapes_get);
                    
                    is_click = 0;
                  
                    for(l=0;l<shapes_get.length;l++)
                    {
                        shapes_get[l] = new google.maps.LatLng(shapes_get[l].lat,shapes_get[l].lon);	 
                    }
                   
                
                    map.panTo(shapes_get[0]);
                    flight_Pathh = new google.maps.Polyline({
                        path: shapes_get,
                        geodesic: true,
                        fillColor:'#41CDF5',
                        fillOpacity : .09 ,
                        strokeColor: '#41CDF5',
                        strokeOpacity: 1,
                        strokeWeight: 4 ,
                    });



                    flight_Pathh.setMap(map);
                    if(markers.length > 0)
                        setAllMap(null);

                }/*end poliline*/
                   
            /*=================================================*/
                   function area_rr()
                   {
                       var area = new Array();
                       area.push({shapes: distance_f[0].area_shape , vals :distance_f[0].area_points })

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


                   }

                   function map_clear(vars){
                       vars.setMap(null)
                       setAllMap(null);
                       //document.getElementById('btn_pol_route').style.display="none";
                   }
            /*==============================================================================================*/
            /*==============================================================================================*/
            /*==============================================================================================*/
            /*==============================================================================================*/
            /*==============================================================================================*/
            });
        }
}}]);
