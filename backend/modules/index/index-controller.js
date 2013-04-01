'use strict';

var gleam = require('gleam');

exports.index = function (req, callback) {

	/**
	 * @type {ReportModel}
	 */
	var reportModel = gleam.model('report');

	/**
	 * @type {ReportEntity}
	 */
	var entity = require('gleam').entity('report', {id: req.param('id')});
//	console.log("entity", entity);
//	return callback(null, entity);
	return reportModel.findOne({id: entity.get('id')}, callback);
};
