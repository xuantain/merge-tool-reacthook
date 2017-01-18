'use strict';

var request = require('superagent');
var Promise = require('bluebird');

module.exports = {

  getOrders: function(perPage, page, shopId, status) {
    // Request get orders list
    var url = '/api/orders/'+ perPage +'/'+ page;
    url += shopId ? '/'+ shopId : '';
    url += status ? '/'+ status : '';

    return new Promise(function(fulfill, reject) {
      request.get(url)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err) {
            reject(err);
          } else {
            var data = res.body;

            var pages = Math.floor(data.total/perPage);
            pages += (data.total%perPage > 0) ? 1 : 0;

            data.pages = pages;
            data.perPage = perPage;
            data.page = page;
            data.shopId = shopId;
            data.status = status;

            fulfill(data);
          }
        });
    });
  },

  addNewOrder: function(newOrder) {
    return new Promise(function(fulfill, reject) {
      request.post('/api/orders')
        .set('Accept', 'application/json')
        .send(newOrder)
        .end(function(err, res) {
          if (err) {
            reject(err);
          }
          fulfill(res.body);
        });
    });
  }

};
