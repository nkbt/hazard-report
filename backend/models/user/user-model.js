'use strict';


var _ = require('underscore');
var mongo = require('lib').mongo;
var async = require('async');

/**
 * @mixes {AbstractModel}
 */
var UserModel = {

	/**
	 * @this UserModel
	 * @param callback
	 */
	fetchAll: function (callback) {
		return async.waterfall([
			mongo,
			function (db, next) {
				db.collection('user', next);
			},
			function (domain, next) {
				domain.find({}, {_id: false}).toArray(next);
			},
			function (data, next) {
				return next(null, _(data).map(this.createEntity.bind(this)));
			}.bind(this)
		], callback);

	},

	generateFetchAll: function (callback) {

		var count = Math.round(Math.random() * 30), i, entityList = [];
		for (i = 0; i < count; i = i + 1) {
			entityList.push(this.createEntity({
				username: "Username # " + Math.round(Math.random() * 1000),
				firstName: "First # " + Math.round(Math.random() * 1000),
				lastName: "Last # " + Math.round(Math.random() * 1000),
				email: "email" + Math.round(Math.random() * 1000) + '@butenko.me'
			}));
		}
		return callback(null, entityList);

	}

};

exports.Model = UserModel;