/*
 * GET home page.
 */
var arcgis = require('../arcgis');

module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('banded', { title: 'leaflet' })
  });
  app.get('/banded/:webmapid', function(req, res){
    var id = req.params.webmapid;
    console.log('webmapid: ' + id)
    var id2 = arcgis.loadWebmap(id);
    res.render('banded', { title: 'leaflet' })
  });
  app.get('/webmap', function(req, res){
    res.render('banded-webmap', { title: 'arcgis' })
  });
 };
