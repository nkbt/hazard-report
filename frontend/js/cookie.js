"use strict";
/*global Zepto:false, $:false, define: false, require: false, requirejs: false, async: false, CryptoJS: false, google: false */
/*jshint browser:true */
/*jslint browser:true */

(function () {

	var cookieSet, cookieGet, cookieDelete;

	cookieSet = function (name, value, days) {
		var expires = "", date;
		if (days) {
			date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		}
		window.document.cookie = name + "=" + value + expires + "; path=/";
	};


	cookieGet = function (name, def) {
		var nameEQ, ca, i, c;

		nameEQ = name + "=";
		ca = document.cookie.split(';');
		for (i = 0; i < ca.length; i = i + 1) {
			c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return c.substring(nameEQ.length, c.length);
			}
		}

		if (def === undefined) {
			def = null;
		}
		return def;
	};


	cookieDelete = function (name) {
		cookieSet(name, "", -1);
	};


	define(function () {
		return {
			get: cookieGet,
			set: cookieSet,
			del: cookieDelete
		};
	});

}());
