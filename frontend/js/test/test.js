"use strict";
/*global define: false, require: false, requirejs: false */
/*jshint browser:true */
/*jslint browser:true */


define(['entity/from-json'], function (fromJson) {

	var json = '{' +
		'	"redirect":null,' +
		'	"message":[],' +
		'	"payload":[{' +
		'		"id":null,' +
		'		"data":[' +
		'			{"name":"test1","price":100,"expireTime":"2013-02-25T07:15:53.238Z","bid":{"max":2,"min":1,"internal":1,"external":2,"next":3},"__ns":"domain"},' +
		'			{"name":"test2","price":50,"expireTime":"2014-02-25T07:15:53.238Z","bid":{"max":20,"min":10,"internal":11,"external":12,"next":13},"__ns":"domain"}' +
		'		],' +
		'		"type":"domain",' +
		'		"__ns":"payload"' +
		'	}],' +
		'	"__ns":"response"' +
		'}';
	fromJson(json, console.log.bind(console));
});

// http://localhost:3000/js/entity/ad.js