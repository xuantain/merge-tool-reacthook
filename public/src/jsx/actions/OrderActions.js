'use strict';

var AppConstants = require('./../constants/AppConstants');
var AppDispatcher = require('./../dispatcher/AppDispatcher');
var ProductAPI = require('./../utils/ProductAPI');
var OrderAPI = require('./../utils/OrderAPI');

var Promise = require('bluebird');

var OrderActions = {

  getOrders: function(perPage, page, shopId, status) {
    var getOrders = OrderAPI.getOrders(perPage, page, shopId, status);
    getOrders.then(function(data) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_ORDERS,
        data: data
      });
    }).catch(function(err) {
      console.error(err.toString());
    });
  },

  getCategories: function() {
    var getCats = ProductAPI.getCategories();
    getCats.then(function(data) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.GET_CATS_FOR_ORDER,
        data: data
      });
    }).catch(function(err) {
      console.error(err.toString());
    });
  },

  getProducts: function(catId, perPage, page) {
    if (catId !== '') {
      var getProducts = ProductAPI.getProducts(catId, perPage, page);
      getProducts.then(function(data) {
        AppDispatcher.handleServerAction({
          actionType: AppConstants.GET_PRODUCTS_FOR_ORDER,
          data: data
        });
      }).catch(function(err) {
        console.error(err.toString());
      });
    } else {
      var data = { products: [] };
      AppDispatcher.handleViewAction({
        actionType: AppConstants.GET_PRODUCTS_FOR_ORDER,
        data: data
      });
    }
  },

  addNewOrder: function(newOrder) {
    var addNewOrder = OrderAPI.addNewOrder(newOrder);
    addNewOrder.then(function(data) {
      AppDispatcher.handleServerAction({
        actionType: AppConstants.ADD_NEW_ORDER,
        data: data
      });
    }).catch(function(err) {
      console.error(err.toString());
    });
  },

  addOrderItem: function(orderItem) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ORDER_ITEM,
      orderItem: orderItem
    });
  },

  removeOrderItem: function(itemIndex) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.REMOVE_ORDER_ITEM,
      itemIndex: itemIndex
    });
  },

  changeTab: function(tabKey) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_TAB,
      tabKey: tabKey
    });
  }

};

module.exports = OrderActions;
