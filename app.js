var express  = require('express');
var path = require('path');
var app = express();
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
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
 
app.configure('production', function(){
  app.use(express.errorHandler());
});

// routes
require('./routes/index')(app);
 
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode",
     app.settings.env);
});