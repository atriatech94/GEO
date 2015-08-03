/*====================================================*/
                   $(window).on("hashchange",function(){
               
                       if((geo = getGeoLocation())) {
                                startWatching();
                            } else {
                                alert('Geolocation not supported.')
                            }
                   });

                    function getGeoLocation() {
                        try {
                            if( !! navigator.geolocation ) return navigator.geolocation;
                            else return undefined;
                        } catch(e) {
                            return undefined;
                        }
                    }
                    i =0 ;
                    var s = parseFloat(0.00006) ;
                
                    function show_map(position) {
                        s = s + s
                        
                        var lat = parseFloat(position.coords.latitude) + s ;
                        var lon = parseFloat(position.coords.longitude)  + s ;
                        //alert(lat +" - "+lon);
                        var latlng = new google.maps.LatLng(lat, lon);
                        markers.push(latlng);
                        $('.console').html(i++);
                        polyline_cr(latlng);
                        //JSON.stringify(markers)
                        //
                        if(map)
                        {
                            map.panTo(latlng);
                            mapMarker.setPosition(latlng);
                        }
                        else
                        {
                            var myOptions = {
                                zoom: 18,
                                center: latlng,
                                mapTypeId: google.maps.MapTypeId.ROADMAP,
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
                                        "elementType":"geometry.fill","stylers":[{"color":"#d5fbdd"}]},{"featureType":"transit.line","elementType":
                                        "labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":
                                        "labels.icon","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill",
                                        "stylers":[{"color":"#8be2fc"}]}],
                            };
                            var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                            map.setTilt(0);
                            /*========================*/
                              var polyOptions = {
                                strokeColor: '#000000',
                                strokeOpacity: 1.0,
                                strokeWeight: 3
                              };

                               poly = new google.maps.Polyline(polyOptions);
                              poly.setMap(map);

                            /*==========================*/

                            mapMarker = new google.maps.Marker({
                                position: latlng,
                                title:"You are here."
                            });
                            mapMarker.setMap(map);
                        }
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

                    window.onload = function() {
                        if((geo = getGeoLocation())) {
                            startWatching();
                        } else {
                            alert('Geolocation not supported.')
                        }
                    }
                    
                    b = 0;
                    function polyline_cr(ltnlng)
                    {
                        if(b!=0)
                        {
                            var path = poly.getPath();
                            path.push(ltnlng);
                        }
                        b++;
                    }
				/*====================================================*/