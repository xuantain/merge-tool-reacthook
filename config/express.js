'use strict';

var join = require('path').join;
var express = require('express');
var session = require('express-session');
var compression = require('compression');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var // multer = require('multer');
var // favicon = require('serve-favicon'),;
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var winston = require('winston');
var cons = require('consolidate');
var pkg = require('../package.json');
var config = require('config');

var env = process.env.NODE_ENV || 'development';

module.exports = function(app, passport) {

  // compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // setup public client-side folder
  // app.use(express.static(join(config.root, 'build', pkg.version)));
  app.use(express.static(join(config.root, 'public')));

  // Use winston on production
  var log;
  if (env !== 'development') {
    log = {
      stream: {
        write: function (message, encoding) {
          winston.info(message, encoding);
        }
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') { app.use(morgan(log)); }

  // setup template engine
  app.engine('html', cons.swig);
  app.set('view engine', 'html');

  // setup views folder
  app.set('views', join(config.root, 'views'));

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  app.use(function (req, res, next) {
    if (req.url === '/favicon.ico') {
      res.writeHead(200, {'Content-Type': 'image/x-icon'} );
      res.end(/* icon content here */);
    } else {
      next();
    }
  });

  // uncomment after placing your favicon in /public
  // app.use(favicon(join(config.root, 'public', 'favicon.ico')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(multer({
  //   dest: join(config.root, 'public', 'uploads'),
  //   rename: function (fieldname, filename) {
  //       return filename + Date.now();
  //   },
  //   onFileUploadStart: function (file) {
  //       console.log(file.originalname + ' is starting ...');
  //   },
  //   onFileUploadComplete: function (file) {
  //       console.log(file.fieldname + ' uploaded to ' + file.path);
  //   }
  // }));
  app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // CookieParser should be above session
  app.use(cookieParser());
  app.use(cookieSession({ secret: 'secret' }));
  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: pkg.name,
    store: new mongoStore({
      url: config.db.mongodb,
      collection : 'sessions'
    })
  }));

  // use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());

};
