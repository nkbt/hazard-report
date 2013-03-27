'use strict';

var express = require('express');
var http = require('http');
var app = express();

var puma = require('puma');
puma.setModuleRoot(__dirname + '/modules');

var gleam = require('gleam');
gleam.setModelRoot(__dirname + '/models');

app.set('port', process.env.PORT || 3000);
app.set('case sensitive routing', true);
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.static(__dirname + '/../frontend'));
app.use('/js/entity', gleam.serveEntity);

app.use(puma.bootstrapMiddleware(__dirname + '/../frontend', 'index.html'));

app.use(express.bodyParser()); // {keepExtensions: true}
app.use(express.methodOverride());
app.use(app.router);

app.use(puma.errorHandlerMiddleware);

app.configure('development', function () {
});
app.configure('production', function () {
});

//app.get('/test', puma.route('index', 'index', 'index'));
//app.get('/user/:name', puma.route('user', 'profile', 'index'));
app.all('*', puma.routeDefault);


puma.setRenderer(function (request, response, responseObject) {
	response.set('Content-type', 'application/json');
	response.send(JSON.stringify(responseObject));
});

puma.setResponseDecorators({
	response: function (response) {
		return gleam.entity('response', response);
	},
	payload: function (payload) {
		return gleam.entity('payload', payload);
	},
	message: function (message) {
		return gleam.entity('message', message);
	}
});

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});

