"use strict";
/*jshint browser:true */
/*jslint browser:true */


define(['dom', 'underscore'], function ($, _) {

//	var $body = $(document.body),
//		runClickHandler,
//		runFailClickHandler,
//		runMessageClickHandler,
//		run404ClickHandler;
//
//
//	runClickHandler = function (event) {
//		var $element = $(event.target).closest('[data-component="ad"]');
//
//		request.get('/ad', {}, function (payloadEntity) {
//			if (_.isUndefined(payloadEntity)) {
//				return;
//			}
//			var $table = $(table).clone(),
//				$tbody = $table.find('tbody');
//			_(payloadEntity.get('data')).each(function (adEntity) {
//				var $tableRow = $(tableRow).clone();
//				_(adEntity.get()).each(function (value, property) {
//					$tableRow.find('[data-bind="' + property + '"]').html(value);
//				});
//				$tableRow.appendTo($tbody); //.attr('data-bind', "Ad:" + adEntity.get('id'));
//			});
//
//			$element.find('[data-component="ad-table-container"]').html($table);
//
//		});
//	};
//
//	$body.on('click', '[data-component="ad-run"]', runClickHandler);
//	$body.on('click', '[data-component="ad-run-fail"]', runFailClickHandler);
//	$body.on('click', '[data-component="ad-run-404"]', run404ClickHandler);
//	$body.on('click', '[data-component="ad-run-message"]', runMessageClickHandler);

	/**
	 * @class Component
	 * @constructor
	 */
	var Component = function() {};
	/**
	 * @lends Component
	 */
	Component.prototype = {

		/**
		 * @param {String} eventName
		 * @param {String} cssRule
		 * @param {Function} callback
		 * @returns this
		 */
		on: function(eventName, cssRule, callback) {
			var self = this;
			if (cssRule !== null) {
				cssRule = '[data-component="' + this.namespace + '"] ' + cssRule;
			}
			$(document.body).on(eventName, cssRule, function(event) {
				var $target = $(this),
					$element = (cssRule !== null)
						? $target.closest('[data-component="' + self.namespace + '"]')
						: $(document.body);
				callback.apply(self, [event, $element, $target]);
			});
			return this;
		}
	};

	var createComponent = function(Child, proto) {
		Child.prototype = new Component;
		Child.constructor = Child;
		_.extend(Child.prototype, proto);
		return new Child;
	};


	return {
		createComponent: createComponent
	}
});

// http://localhost:3000/js/entity/ad.js