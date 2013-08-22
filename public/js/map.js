function initWebmap(id, div) {
	require([
	  	"esri/arcgis/utils", "esri/map" 
	], function(arcgisUtils, Map ) {
	 	var deferred = arcgisUtils.createMap(id, div, {
	    	mapOptions: {
	      		slider: true
	    	}	  
		});
	});
}

function initLeaflet(div, basemap, layers){
	var map = L.map(div, {fullscreenControl: true});

	// ArcGIS Online Basemaps - Streets, Topographic, Gray, GrayLabels, Oceans, NationalGeographic, Imagery, ImageryLabels
	//L.esri.basemapLayer("Gray").addTo(map);
	L.tileLayer.provider(basemap).addTo(map);

	for (var i = layers.length - 1; i >= 0; i--) {
		if (layers[i].mode == 1){
			console.log('Mode: ' + layers[i].mode)
			console.log('Url: ' + layers[i].url)
			addFeatureLayer(layers[i].url, map);

		}
	};
	function onLocationFound(e) {
		var radius = e.accuracy / 2;
		L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
		L.circle(e.latlng, radius).addTo(map);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

	map.on('fullscreenchange', function () {
		if (map.isFullscreen()) {
				console.log('entered fullscreen');
				$("#map").height('100%');
		} else {
				console.log('exited fullscreen');
				$("#map").height('400px');
		}
	});

	map.locate({setView: true, maxZoom: 14});
}

function addFeatureLayer(url, map) {
	var featureLayer = L.esri.featureLayer(url, {
		onEachFeature: function(geojson, layer){
			createPopup(geojson,layer);		}	
	}).addTo(map);

}

function createPopup(geojson,layer) {
	// Show all data
	if (geojson.properties) {
		var popupText =  "<div style='overflow:hide; max-width:250px; max-height:200px;'>";
		for (prop in geojson.properties) {
			if (prop.indexOf('id') == -1){
				var val = geojson.properties[prop];
				if (val){
					popupText += "<b>" + prop + "</b>: " + val + "<br>";
				}
			}
		}
		popupText += "</div>";
		layer.bindPopup(popupText);
	}
}


function initStamen(div){
			require(["esri/map","esri/layers/WebTiledLayer","js/utils-stamen.js","dojo/domReady!"],
			function(Map, WebTiledLayer, utils) {
				// Create map
				var map = new Map(div,{
					//basemap: "gray",  // Do not specify default basemap
					center: [-122.69, 45.52],
					zoom: 3
				});
				utils.autoRecenter(map);

				// Setup references for tile layer
				var url = "http://{subDomain}.tile.stamen.com/watercolor/{level}/{col}/{row}.jpg";
				var wtl = WebTiledLayer;
				var lyr = new wtl(url, {
					"copyright": "Stamen Designs",
					"id": "Stamen Water Colors",
					"subDomains": ["a", "b", "c","d"]
				});
				map.addLayer(lyr);
			}
		);
}



