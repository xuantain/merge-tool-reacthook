'use strict';

var mongoose = require('mongoose'),
    promise = require('bluebird'),
    mongoose = promise.promisifyAll(mongoose),
    Order = require('./../models/Order'),
    Product = require('./../models/Product');

/**
 * Load all products
 */
exports.loadAllProducts = function (req, res, next) {
  var options = { select: '_id productName category price stock description image createdAt' };
  var getProducts = Product.list(options);

  getProducts.then(function (products) {
      res.json({ products: products });
    }, function(err) {
      next(err);
    });
};

/**
 * List products per page
 */
exports.loadAllProductsByCat = function (req, res, next) {
  var _criteria = req.params.catId ? { category: req.params.catId } : '';
  var _page = req.params.page ? req.params.page : 0;
  _page = _page > 0 ? _page - 1 : 0;
  var _perPage = req.params.perPage ? req.params.perPage : 20;
  _perPage = req.params.perPage > 0 ? req.params.perPage : 20;
  var options = {
    criteria: _criteria,
    select: '_id productName category price stock description image createdAt',
    perPage: _perPage,
    page: _page
  };

  var getList = Product.list(options);
  getList.then(function (products) {
      var count = Product.count({ criteria: _criteria });
      count.then(function(total) {
        res.json({ products: products, total: total });
      }, function(err) {
        console.log(err);
        res.json({ products: products });
      });
    }, function(err) {
      next(err);
    });
};

/**
 * Create an Product
 * Upload an image
 */
exports.create = function (req, res, next) {
  // check conflict
  var oldProduct = Product.load({ criteria: {productName: req.body.productName} });
  oldProduct.then(function (product) {
    if (product) {
      next(new Error('This product was existed!'));
    }
    else {
      var newProduct = new Product(req.body);
      var images = req.file ? [req.file] : undefined;

      var insertNew = newProduct.uploadAndSave(images);
      insertNew.then(function (product) {
        res.json({ product: product });
      }, function (err) {
        next(err);
      });
    }
  }, function (err) {
    next(err);
  });
};

/**
 * Update Product
 */
exports.update = function (req, res, next) {
  var product = new Product(req.body);
  var images = req.file ? [req.file] : undefined;

  var updateProduct = product.uploadAndSave(images);
  updateProduct.then(function (product) {
    res.json({ product: product });
  }, function (err) {
    next(err);
  });
};

/**
 * Delete an Product
 */
exports.delete = function (req, res, next) {
  var productId = req.params.productId;
  var orderCheck = Order.findOne({ 'orderItems.product': productId });

  orderCheck.then(function (order) {
      if (order) {
        next(new Error('This product has related with some Order'));
      }
      return Product.findByIdAndRemove(productId).exec();
    }, function (err) {
      next(err);
    })
    .then(function (product) {
      res.json({ product: product });
    }, function (err) {
      next(err);
    });
};
