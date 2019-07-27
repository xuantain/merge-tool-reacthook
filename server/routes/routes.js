// 'use strict';

// var users = require('../../api/controllers/Users');
//     // auth = require('./middlewares/authorization');

// /**
//  * Expose routes
//  */
// module.exports = function (app, passport) {

//   app.get('/', function(req, res) {
//     res.render('index', { title: 'hello' });
//   });

// // apply using express.router
//   var productRouter = require('./routes/products');
//   var categoryRouter = require('./routes/categories');
//   var orderRouter = require('./routes/orders');

//   app.use('/api/products', productRouter);
//   app.use('/api/categories', categoryRouter);
//   app.use('/api/orders', orderRouter);

//   // user routes
//   app.get('/login', users.login);
//   // app.get('/signup', users.signup);
//   // app.get('/logout', users.logout);
//   // app.post('/users', users.create);
//   // app.post('/users/session',
//   //   passport.authenticate('local', {
//   //     successRedirect : '/users/show',
//   //     failureRedirect: '/login',
//   //     failureFlash: 'Invalid email or password.'
//   //   }), users.session);
//   // app.get('/users/:userId', users.show);
//   // app.param('userId', users.load);

//   app.get('/admin', function(req, res) {
//     res.render('admin', { title: 'admin' });
//   });

//   // Error handling
//   app.use(function (err, req, res, next) {
//     // treat as 404
//     if (err.message &&
//           (~err.message.indexOf('not found') ||
//             (~err.message.indexOf('Cast to ObjectId failed')))) {
//       return next();
//     }
//     console.error(err.stack);
//     // error page
//     res.status(500).render('500', { error: err.stack });
//   });

//   // assume 404 since no middleware responded
//   app.use(function (req, res) {
//     res.status(404).render('404', {
//       url: req.originalUrl,
//       error: 'Not found'
//     });
//   });
// };
