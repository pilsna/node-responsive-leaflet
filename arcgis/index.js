var http = require('http');
var request = require('request');
var util = require('util');

function options(id, organization, token){
	var options = {
		host: util.format('%s.maps.arcgis.com', organization),
		port: 80,
		path: util.format('/sharing/rest/content/items/%s/data?f=json', id),
		method: 'GET'
	};
	console.log(options);
	return options;
}


var loadWebmap = function (id){
	var json = '';
	var req = http.get(options(id, 'informi', ''), function(res) {
		console.log("Got response: " + res.statusCode);
		
		res.on('data', function (chunk){
			json += chunk;
		});

		res.on('end', function() {
			return json;
		});
	});
	req.on('error', function(e){
	   console.log("Error: " + "\n" + e.message); 
	   console.log( e.stack );
	   return null;
	});
	
};

function getWebmap(id, organization, callback) {
	var urlOptions = options(id, organization, '');
	request({ url: 'http://' + urlOptions.host + urlOptions.path, json:true}
		, function(error, response, body) {
		callback(JSON.parse(body));
	});
}

module.exports.loadWebmap = getWebmap;