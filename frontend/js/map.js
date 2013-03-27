"use strict";
/*global Zepto:false, $:false, define: false, require: false, requirejs: false, async: false, CryptoJS: false, google: false */
/*jshint browser:true */
/*jslint browser:true */


define(['cookie', 'vendor/require/async!http://maps.googleapis.com/maps/api/js?sensor=false'], function (cookie) {
	var mapOptions,
		googleMap,
		googleMarker;

	$('#googleMap').show();

	mapOptions = {
		zoom: parseInt(cookie.get('zoom', 3), 10),
		center: new google.maps.LatLng(parseFloat(cookie.get('lat', 0)), parseFloat(cookie.get('lng', 0))),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	googleMap = new google.maps.Map($("#googleMap")[0], mapOptions);

	googleMarker = new google.maps.Marker({map: googleMap, position: mapOptions.center, draggable: true});

	google.maps.event.addListener(googleMarker, 'dragend', function () {
		var position = googleMarker.getPosition();
		cookie.set('lat', position.lat(), 30);
		cookie.set('lng', position.lng(), 30);
		$("#googleMap").trigger('googleMap:markerMoved', [position.lat(), position.lng()]);
	});

	google.maps.event.addListener(googleMap, 'zoom_changed', function () {
		cookie.set('zoom', googleMap.getZoom(), 30);
		$("#googleMap").trigger('googleMap:zoomChanged', googleMap.getZoom());
	});

	googleMap.panTo(googleMarker.getPosition());

	return {
		'map': googleMap,
		'marker': googleMarker
	};
});

