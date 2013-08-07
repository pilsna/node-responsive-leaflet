/*
 * GET home page.
 */
 
module.exports = function(app) {
  app.get('/', function(req, res){
    res.render('index', { title: 'leaflet' })
  });
  app.get('/banded', function(req, res){
    res.render('banded', { title: 'leaflet' })
  });
 };
