'use strict';

var join = require('path').join;
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var promise = require('bluebird');
var mongoose = promise.promisifyAll(mongoose);
var config = require('config');

var app = express();
var port = process.env.PORT || 3000;

// setup connect to mongodb
var connect = function() {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db.mongodb, options, function() {
    console.log('connect to mongodb successfully');
  });
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

// Bootstrap passport config
require('./config/passport')(passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap swagger config
require('./config/swagger')(app);

// app.use('/', app.router);
// Bootstrap routes
require('./config/routes')(app, passport);

// setup Server
app.listen(port, function() {
  console.log('Server started at http://localhost:%d', port);
  console.log('Swagger-ui is available on http://localhost:%d/docs', port);
});

module.exports = app;
