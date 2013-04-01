"use strict";
/*jshint browser:true */
/*jslint browser:true */


define(['dom', 'underscore', 'request', 'core'], function ($, _, request, core) {


		/**
		 * @constructor
		 * @class
		 * @extends Component
		 * @this TestComponent
		 */
	var TestComponent = function TestComponent() {
		console.log(this.namespace);

		this.on('click', '[data-component="ad-run"]', this.onClickRun);

		//			$body.on('click', '[data-component="ad-run"]', runClickHandler);


	};

	return core.createComponent(TestComponent,
		/**
		 * @lends TestComponent.prortotype
		 */
		{
			namespace: 'ad',

			/**
			 * @param {Event} event
			 * @param {Array} $element
			 * @param {Array} $target
			 * @this TestComponent
			 */
			onClickRun: function (event, $element, $target) {
				console.log("event", event);
				console.log("$element", $element);
				console.log("$target", $target);
				return;
				request.get('/ad', {}, function (payloadEntity) {
					if (_.isUndefined(payloadEntity)) {
						return;
					}
					var $table = $(table).clone(),
						$tbody = $table.find('tbody');
					_(payloadEntity.get('data')).each(function (adEntity) {
						var $tableRow = $(tableRow).clone();
						_(adEntity.get()).each(function (value, property) {
							$tableRow.find('[data-bind="' + property + '"]').html(value);
						});
						$tableRow.appendTo($tbody); //.attr('data-bind', "Ad:" + adEntity.get('id'));
					});

					$element.find('[data-component="ad-table-container"]').html($table);

				});

			}
		});

	return;
	var $body = $(document.body),
		runClickHandler,
		runFailClickHandler,
		runMessageClickHandler,
		run404ClickHandler;

	runClickHandler = function (event) {
		var $element = $(event.target).closest('[data-component="ad"]');

		request.get('/ad', {}, function (payloadEntity) {
			if (_.isUndefined(payloadEntity)) {
				return;
			}
			var $table = $(table).clone(),
				$tbody = $table.find('tbody');
			_(payloadEntity.get('data')).each(function (adEntity) {
				var $tableRow = $(tableRow).clone();
				_(adEntity.get()).each(function (value, property) {
					$tableRow.find('[data-bind="' + property + '"]').html(value);
				});
				$tableRow.appendTo($tbody); //.attr('data-bind', "Ad:" + adEntity.get('id'));
			});

			$element.find('[data-component="ad-table-container"]').html($table);

		});
	};

	runFailClickHandler = function () {
		request.get('/ad/fail', {}, function () {
		});
	};

	run404ClickHandler = function () {
		request.get('/ad/404', {}, function () {
		});
	};

	runMessageClickHandler = function () {
		request.get('/ad/message', {}, function () {
		});
	};

	$body.on('click', '[data-component="ad-run"]', runClickHandler);
	$body.on('click', '[data-component="ad-run-fail"]', runFailClickHandler);
	$body.on('click', '[data-component="ad-run-404"]', run404ClickHandler);
	$body.on('click', '[data-component="ad-run-message"]', runMessageClickHandler);
});

// http://localhost:3000/js/entity/ad.js