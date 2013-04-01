"use strict";
/*global Zepto:false, $:false, define: false, require: false, requirejs: false, async: false, CryptoJS: false, google: false */
/*jshint browser:true */
/*jslint browser:true */


define(['dom', 'underscore', 'md5', 'request'], function ($, _, md5, request) {

	var email = $('[name="email"]').val(),
		formData = localStorage.getItem('form');

	if (!_.isNull(formData)) {
		_.forEach(JSON.parse(formData), function (field) {
			$('[name=' + field.name + ']:not([type=file])').val(field.value);
		});
	}
	if ($("[name=email]:valid").length) {
		$('[name="file"]').prop('disabled', false);
	}

	$(document.body)
		.on('blur', '[name=email]:valid', function () {
			var newEmail = $('[name="email"]').val();
			if (email !== newEmail) {
				email = newEmail;
				$('[name="id"]').val(md5(newEmail).toString());
			}
			$('[name="file"]').prop('disabled', false);
		})
		.on('change', '[name=email]:invalid', function () {
			$('[name="file"]').prop('disabled', true);
		})
		.on('change blur', function () {
			$('[type="submit"], [name="file"]').prop('disabled', ($(':invalid').length > 0));
		})
		.on('googleMap:markerMoved', function (event, lat, lng) {
			$('[name="lat"]').val(lat);
			$('[name="lng"]').val(lng);
		})
		.on('submit', 'form', function (event) {
			localStorage.setItem('form', JSON.stringify($(this).serializeArray()));
		});


	request.get(
		'/index',
		{'id': $('[name="id"]').val()},
		function (payloadEntity) {
			if (_.isUndefined(payloadEntity)) {
				return;
			}
			var $element = $('#imageList');
			var reportEntity = payloadEntity.get('data');
			_(reportEntity.get('files')).each(function (file) {
				$('<img style="height: 100px; border: 1px solid #888;" alt="" />')
					.attr('src', "/files" + file)
					.appendTo($element);
			});
		}
	);
});
