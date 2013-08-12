var http = require('http');
var util = require('util');

function options(id, organization, token){
	
	var options = {
  		host: util.format('http://%s.maps.arcgis.com', organization),
  		port: 80,
  		path: util.format('/sharing/rest/content/items/%d/data?f=json&token=%s', id, token)
	};

}

function loadWebmap(id){
	http.get(options(id, 'informi', ''), function(res) {
		console.log("Got response: " + res.statusCode);
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}

