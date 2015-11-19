'use strict';

var mongoose = require('mongoose'),
		promise = require('bluebird'),
		mongoose = promise.promisifyAll(mongoose),
		Order = mongoose.model('Order');

/**
 * Load all Orders
 */
exports.loadAllOrders = function (req, res, next) {
	var _criteria = {};
	var _page = (req.params.page > 0 ? req.params.page : 1) - 1;
	var _perPage = req.params.perPage > 0 ? req.params.perPage : 20;
	var options = {
		criteria: _criteria,
		sort: {createdAt: -1},
		perPage: _perPage,
		page: _page
	};

	var getList = Order.list(options);
	getList.then(function (orders) {
			var count = Order.count({ criteria: _criteria });
			count.then(function(total) {
				res.json({ orders: orders, total: total });
			}, function(err) {
				console.log(err);
				res.json({ orders: orders });
			});
		}, function(err) {
			next(err);
		});
};

/**
 * Create an Order
 */
exports.create = function (req, res) {
	var order = new Order(req.body);
	order.save(function (err) {
		if (!err) {
			console.log('Create successfully');
			return res.json(200, { message: 'successfully' });
		}
		console.log('Could not create order. Error');
		res.json(500, { message: 'Could not create order. Error: ' + err });
	});
};

/**
 * Edit an Order
 */
// exports.edit = function (req, res) {
// 	res.json();
// };

/**
 * Delete a Order
 */
// exports.destroy = function (req, res) {
// 	var order = req.order;
// 	order.remove(function (err) {
// 		res.json({ success: true });
// 	});
// };
