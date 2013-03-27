'use strict';


exports.index = function (req, callback) {

	callback(new Error('Internal error'));
};


exports.notFound = function (req, callback) {

	callback(new Error('404! Not Found'));
};

