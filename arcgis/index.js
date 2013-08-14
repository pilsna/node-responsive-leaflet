
function Arcgis(webmapid) {
	function map(webmapid){
		var req = http.request(options, function(response) {
			response.on("data", function(data) {
		 		console.log("some data from the response", data);
			});
			response.on("end", function() {
		    	console.log("response ended");
			});
		});
		req.end();
	}
	return webmapid;
}

module.exports.arcgis = Arcgis;
