'use strict';


var _ = require('underscore');
var mongo = require('lib').mongo;
var file = require('lib').file;
var async = require('async');
var path = require('path');

/**
 * @mixin {AbstractModel}
 */
var ReportModel = {


	/**
	 * @this ReportModel
	 * @param {Object} conditions
	 * @param {Function} callback
	 */
	findOne: function (conditions, callback) {
		return async.waterfall([
			async.apply(mongo.collection, 'nkbt', 'report'),
			function (collection, next) {
				collection.findOne(conditions, {_id: false}, next);
			}.bind(this),
			function (item, next) {
				return next(null, this.createEntity(item));
			}.bind(this)
		], callback);

	},

	/**
	 * @this ReportModel
	 * @param {Object} conditions
	 * @param {Function} callback
	 */
	find: function (conditions, callback) {
		return async.waterfall([
			async.apply(mongo.collection, 'nkbt', 'report'),
			function (collection, next) {
				collection.find(conditions, {_id: false}).toArray(next);
			},
			function (data, next) {
				return next(null, _(data).map(this.createEntity.bind(this)));
			}.bind(this)
		], callback);

	},

	/**
	 * @param {AbstractEntity} entity
	 * @param {Array} files
	 * @param {String} uploadRoot
	 * @param callback
	 */
	attach: function (entity, files, uploadRoot, callback) {
		file.saveUploadedFiles(files, path.join(uploadRoot, entity.get('id')), function (error, savedFiles) {
			entity.set({files: savedFiles.map(function (file) {
				return file.replace(uploadRoot, '').replace(/\\/g, '/');
			})});
			callback(error, entity);
		});
	},

	/**
	 * @param {ReportEntity} entity
	 * @param {Function} callback
	 * @returns {*}
	 */
	save: function (entity, callback) {
		return mongo.collection('nkbt', 'report', function (error, collection) {
			if (error) {
				return callback(error, entity);
			}
			return async.waterfall([
				function (next) {
					collection.findOne({id: entity.get('id'), lat: entity.get('lat'), lng: entity.get('lng')}, next);
				},
				function (item, next) {
					if (_.isNull(item)) {
						item = entity.get();
					} else {
						entity.get('files').forEach(function (file) {
							item.files.push(file);
						});
					}
					collection.save(item, function (error) {
						if (error) {
							return next(error);
						}
						return next(null, entity);
					});
				}.bind(this)
			], callback);

		});
	}
};

exports.Model = ReportModel;