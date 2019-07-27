// 'use strict';

// var mongoose = require('mongoose');
// var promise = require('bluebird');
// var mongoose = promise.promisifyAll(mongoose);
// var Category = require('./../models/Category');
// var utils = require('utils');

// /**
//  * Load all Categories
//  */
// exports.loadAllCategories = function (req, res, next) {
//   var options = { select: '_id categoryName' };
//   var getCategories = Category.list(options);

//   getCategories.then(function (categories) {
//       res.json({ categories: categories });
//     }, function(err) {
//       next(err);
//     });
// };

// /**
//  * Create an Category
//  */
// exports.create = function (req, res) {
//   var category = new Category(req.body);
//   category.save(function (err) {
//     if (err) {
//       return res.render({ errors: utils.errors(err) });
//     }
//     // manually login the user once successfully signed up
//     return res.redirect('/');
//   });
// };

// /**
//  * Edit an Categorie
//  */
// // exports.edit = function (req, res) {
// //   res.json({});
// // };

// /**
//  * Delete a Category
//  */
// // exports.destroy = function (req, res) {
// //   var category = req.category;
// //   category.remove(function (err) {
// //     res.json({ success: true });
// //   });
// // };
