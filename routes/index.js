/*
 * GET home page.
 */
 
module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('banded', { title: 'leaflet' })
  });
  app.get('/banded', function(req, res){
    res.render('banded', { title: 'leaflet' })
  });
  app.get('/webmap', function(req, res){
    res.render('banded-webmap', { title: 'arcgis' })
  });
 };
