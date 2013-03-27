'use strict';


var _ = require('underscore');

/**
 * @mixes {AbstractModel}
 */
var AdModel = {

	fetchAll: function () {

		var count = Math.round(Math.random() * 30), i, entityList = [];
		for (i = 0; i < count; i = i + 1) {
			entityList.push(this.createEntity({
				name: "Item # " + Math.round(Math.random() * 1000),
				value: Math.round(Math.random() * 100),
				createdOn: new Date()
			}));
		}
		return entityList;

	}

};

exports.Model = AdModel;
