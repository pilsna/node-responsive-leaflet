
function initWebmap(id, div){
  require([
    "dojo/parser",
    "dojo/ready",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/dom",
    "esri/map", 
    "esri/urlUtils",
    "esri/arcgis/utils",
    //"esri/dijit/Legend",
    //"esri/dijit/Scalebar",
    "dojo/domReady!"
  ], function(
    parser,
    ready,
    BorderContainer,
    ContentPane,
    dom,
    Map,
    urlUtils,
    arcgisUtils,
    Legend,
    Scalebar
  ) {
    ready(function(){

    parser.parse();


    arcgisUtils.createMap(id, div).then(function(response){
      //update the app 
      dom.byId("title").innerHTML = response.itemInfo.item.title;
      dom.byId("subtitle").innerHTML = response.itemInfo.item.snippet;

      var map = response.map;



      //add the scalebar 
      /* 
      var scalebar = new Scalebar({
        map: map,
        scalebarUnit: "english"
      });


      //add the legend. Note that we use the utility method getLegendLayers to get 
      //the layers to display in the legend from the createMap response.
      var legendLayers = arcgisUtils.getLegendLayers(response); 
      var legendDijit = new Legend({
        map: map,
        layerInfos: legendLayers
      },"legend");
      legendDijit.startup();
*/

    });


    });

      });
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