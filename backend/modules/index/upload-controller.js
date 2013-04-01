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
	var entity = require('gleam').entity('report', req.body);


	reportModel.attach(entity, req.getFiles('file'), req.app.get('uploadRoot'), function (error, entity) {
		reportModel.save(entity, callback);
	});


};