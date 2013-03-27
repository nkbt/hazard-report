'use strict';

var path = require('path');

exports.index = function (req, callback) {

	/**
	 * @type {AdModel}
	 */
	var adModel = require('gleam').model('ad');
	callback(null, adModel.fetchAll());

};

exports.fail = function (req, callback) {
	callback(new Error('AAAA! Something happened. Cannot get anything!'));
};

exports.message = function (req, callback) {
	callback(null, {}, 'Everything is OK!');
};

exports.sample = function (req, callback) {
	callback(null, {success: true}, 'Success');
};
