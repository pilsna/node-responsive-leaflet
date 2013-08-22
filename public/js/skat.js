
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
		L.marker(e.latlng).addTo(map).bindPopup("Du er her").openPopup();
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

	//map.locate({setView: true, maxZoom: 14});
}

function addFeatureLayer(url, map) {
	var featureLayer = L.esri.featureLayer(url, {
		onEachFeature: function(geojson, layer){
			createPopup(geojson,layer);
		},
		style: style		
	}).addTo(map);

}

function createPopup(geojson,layer) {
	// Show all data
	if (geojson.properties) {
		var popupText =  "<div style='overflow:hide; max-width:250px; max-height:200px;'>";
		var kommune = geojson.properties['KommuneNavn'];
		var beskrivelse = geojson.properties['Beskrivelse'];
		var kilde = geojson.properties['Kilde'];
		popupText += '<b>' + kommune + 's kommune</b><br />';
		popupText += beskrivelse + '<br />';
		popupText += '<a href=\'' + kilde + '\'>Kilde</a>';
	}
	popupText += "</div>";
	layer.bindPopup(popupText);
	
}
/*
OBJECTID: 76
KommuneNavn: Norddjurs
NumeriskVaerdi1: 3
Beskrivelse: Dele af kommunens grundværdiområder er inddelt forkert (fx bycentre, eller fordi der ikke tages hensyn til særlige forhold såsom ejendommenes udsigt mv.). Inddelingen kan, på nær i de problematiske områder, bruges til at fastsætte grundværdier.
Kilde: http://www.rigsrevisionen.dk/media/1943070/den-offentlige-ejendomsvurdering.pdf
*/


function getColor(d) {
	console.log('NumeriskVaerdi1: ' + d);
    return d == '4' ? '#800026' :
           d == '3' ? '#E31A1C' :
           d == '2' ? '#FD8D3C' :
           d == '1' ? '#FED976' :
                   '#FFEDA0';
}
function style(feature) {
	console.log(feature);
    return {
        fillColor: getColor(feature.properties.NumeriskVaerdi1),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

