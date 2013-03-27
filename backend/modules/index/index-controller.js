'use strict';

exports.index = function (req, callback) {

	callback(new Error('Aaaa'), { title: 'Express' });
};
