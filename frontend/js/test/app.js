"use strict";
/*global Zepto:false, $:false, define: false, require: false, requirejs: false, async: false, CryptoJS: false, google: false */
/*jshint browser:true */
/*jslint browser:true */


define(['../map'], function () {

	var idUser = $('[name="idUser"]').val();
	$(document.body)
		.on('blur', '[name="idUser"]:valid', function () {
			var newIdUser = $('[name="idUser"]').val();
			if (idUser !== newIdUser) {
				idUser = newIdUser;
				$('[name="id"]').val(CryptoJS.MD5(newIdUser + (new Date()).toJSON()).toString());
			}
			$('[name="file"]').prop('disabled', false);
		})
		.on('change', '[name="idUser"]:invalid', function () {
			$('[name="file"]').prop('disabled', true);
		})
		.on('change blur', function () {
			$('[type="submit"], [name="file"]').prop('disabled', ($(':invalid').length > 0));
		})
		.on('googleMap:markerMoved', function (event, lat, lng) {
			$('[name="lat"]').val(lat);
			$('[name="lng"]').val(lng);
		});

});
