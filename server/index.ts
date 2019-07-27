import cookieParser from 'cookie-parser';
// import cookieSession from 'cookie-session';
import express from 'express';
// import session from 'express-session';
import next from 'next';
// import join from 'path';
// import compression from 'compression';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import methodOverride from 'method-override';
// import multer from 'multer';
// import favicon from 'serve-favicon';
// import mongoStore from 'connect-mongo';
// import flash from 'connect-flash';
// import winston from 'winston';
// import pkg from '../package.json';
// import config from './config/config';

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './client', dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();

    const server = express();

    // compression middleware (should be placed before express.static)
    // server.use(compression({
    //   threshold: 512
    // }));

    // setup public client-side folder
    // server.use(express.static(join(config.root, 'build', pkg.version)));
    // server.use(express.static(join(config.root, 'public')));

    // Use winston on production
    // var log: any;

    // if (!dev) {
    //   log = {
    //     stream: {
    //       write: function (message: any, encoding: any) {
    //         winston.info(message, encoding);
    //       }
    //     }
    //   } || {};
    // }

    // Do log during tests
    // Logging middleware
    // if (dev) {
    //   server.use(morgan(log));
    // }

    // expose package.json to views
    // server.use(function (req, res, next) {
    //   res.locals.pkg = pkg;
    //   res.locals.env = process.env.NODE_ENV;
    //   next();
    // });

    // server.use(function (req, res, next) {
    //   if (req.url === '/favicon.ico') {
    //     res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    //     res.end(/* icon content here */);
    //   } else {
    //     next();
    //   }
    // });

    // uncomment after placing your favicon in /public
    // server.use(favicon(join(config.root, 'public', 'favicon.ico')));
    // server.use(bodyParser.json());
    // server.use(bodyParser.urlencoded({ extended: true }));

    // server.use(multer({
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

    // server.use(methodOverride(function (req) {
    //   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    //     // look in urlencoded POST bodies and delete it
    //     var method = req.body._method;
    //     delete req.body._method;
    //     return method;
    //   }
    // }));

    // CookieParser should be above session
    server.use(cookieParser());
    // server.use(cookieSession({ secret: 'secret' }));
    // server.use(session({
    //   resave: true,
    //   saveUninitialized: true,
    //   secret: pkg.name,
    //   // store: new mongoStore({
    //   //   connect: session.MemoryStore,
    //   //   url: config.db.mongodb,
    //   //   collection : 'sessions'
    //   // })
    // }));

    // use passport session
    // server.use(passport.initialize());
    // server.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    // server.use(flash());

    server.get('/product/:handle', (req, res) => {
      const actualPage = '/product';
      const queryParams = { handle: req.params.handle };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
    });
  }
  catch (error) {
    console.error(error.stack); // eslint-disable-line
    process.exit(1);
  }
})();
