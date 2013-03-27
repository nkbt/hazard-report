'use strict';

exports.index = function (req, callback) {

	callback(new Error('Test exception'));
};


exports.domain = function (req, callback) {

	/**
	 * @type {DomainModel}
	 */
	var domainModel = require('gleam').model('domain');
	domainModel.fetchAll(callback);

};


exports.user = function (req, callback) {

	/**
	 * @type {UserModel}
	 */
	var userModel = require('gleam').model('user');
	userModel.fetchAll(callback);
};


exports.ajax = function (req, callback) {

	var domainModel = require('gleam').model('domain'),
		domainEntity = domainModel.createEntity({
			'name': 'test',
			'price': 100,
			'expireTime': new Date()
		}),
		json = JSON.stringify(domainEntity),
		restored = require('gleam').fromJson(json);

	console.log('json', json);
	console.log('restored', restored);
//	JSON.stringify()
	callback(null, domainEntity);
};