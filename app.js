
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  servicesApi = require('./routes/servicesApi'),
  driversApi = require('./routes/api'),
  appsApi = require('./routes/appsApi'),
  session = require('express-session');
var app = module.exports = express.createServer();
var sess;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(session({secret: 'Tr@ckmy5ch001Bu5'}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(function(req, res, next) {
    if(req.url.indexOf("/login")==0)
      next()
    else{
      if(req.session.userProile){
        next();
      }
      else{
        res.redirect('/login');
      }
    }
  });
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/partials/:name', routes.partials);

app.get('/api/drivers/getList', driversApi.getList);
app.post('/api/drivers/save', driversApi.save);
app.put('/api/drivers/:id', driversApi.update);
app.delete('/api/drivers/:id', driversApi.delete);

app.get('/api/driverapps/getList', appsApi.getList);
app.post('/api/driverapps/save', appsApi.save);
app.put('/api/driverapps/:id', appsApi.update);
app.delete('/api/driverapps/:id', appsApi.delete);

app.get('/api/services/getList', servicesApi.getList);
app.post('/api/services/save', servicesApi.save);
app.put('/api/services/:id', servicesApi.update);
app.delete('/api/services/:id', servicesApi.delete);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
