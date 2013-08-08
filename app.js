var express  = require('express');
var http = require('http');
var path = require('path');

var app = express();
var server = http.createServer(app);
var routes = require('./routes');


 

// Configuration
 
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'node_modules', 'zurb-foundation' )));
  app.use('/leaflet', express.static(path.join(__dirname, 'node_modules', 'leaflet', 'dist' )));
  app.use('/leaflet', express.static(path.join(__dirname, 'node_modules', 'leaflet-fullscreen', 'dist' )));
  app.use('/leaflet', express.static(path.join(__dirname, 'node_modules', 'leaflet-fullscreen', 'src' )));
  app.use('/esri', express.static(path.join(__dirname, 'node_modules', 'Esri-Leaflet', 'dist' )));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
 
app.configure('production', function(){
  app.use(express.errorHandler());
});

// routes
require('./routes/index')(app);
 
server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", server.address().port,
     app.settings.env);
});