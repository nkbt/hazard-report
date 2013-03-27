"use strict";
/*jshint browser:true */
/*jslint browser:true */


var table = '<table data-component="ad-table" style="width: 100%;">'
	+ '<thead><tr><th>Name</th><th>Value</th><th>Created On</th></tr></thead>'
	+ '<tbody></tbody>'
	+ '</table>';

var tableRow = '<tr>'
	+ '<td data-bind="name"></td>'
	+ '<td data-bind="value"></td>'
	+ '<td data-bind="createdOn"></td>'
	+ '</tr>';

define(['dom', 'underscore', 'request', 'entity/ad', 'entity/message'], function ($, _, request, AdEntity, MessageEntity) {
	var $body = $(document.body);
	$body.on('click', '[data-component="ad"]', function (event) {
		var $element = $(event.target).closest('[data-component="ad"]');
//		var messageEntity = new MessageEntity({
//			isMessage: true,
//			text: "OMG!!!!!11"
//		});
//		$body.trigger('messenger:show', [messageEntity]);

		request.get('/ad', {}, function (payloadEntity) {
			var adEntityList = _(payloadEntity.data).map(function (item) {
					return new AdEntity(item);
				}),
				$table = $(table).clone(),
				$tbody = $table.find('tbody');

			_(adEntityList).each(function (adEntity) {
				var $tableRow = $(tableRow).clone();
				_(adEntity.get()).each(function (value, property) {
					$tableRow.find('[data-bind="' + property + '"]').html(value);
				});
				$tableRow.appendTo($tbody);
			});

			$element.find('[data-component="ad-table-container"]').html($table);

		});

	});
});

// http://localhost:3000/js/entity/ad.js