var http = require('http');
var util = require('util');

function options(id, organization, token){
	var options = {
		host: util.format('http://%s.maps.arcgis.com', organization),
		port: 80,
		path: util.format('/sharing/rest/content/items/%s/data?f=json', id),
		method: 'GET'
	};
	console.log(options);
	return options;
}

module.exports.loadWebmap = function (id){
	http.get(options(id, 'informi', ''), function(res) {
		console.log("Got response: " + res.statusCode);
	}).on('error', function(e){
	   console.log("Error: " + "\n" + e.message); 
	   console.log( e.stack );
	});
	return id;
};

