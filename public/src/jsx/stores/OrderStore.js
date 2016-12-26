'use strict';

var AppDispatcher = require('./../dispatcher/AppDispatcher'),
    AppConstants = require('./../constants/AppConstants'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash');

var CHANGE_EVENT = 'change',
    ADD_ORDER_SUCCESS_EVENT = 'add order success',
    ORDERS_CHANGE_EVENT = 'update orders';

var _orders = [], _orderItems = [], _cats = [], _products = [], _shops = [],
    _currentStatus = 'all', _currentShop = 'all',
    _pages = 1, _perPage = 5, _currentPage = 1;

var OrderStore = _.extend({}, EventEmitter.prototype, {

  getState: function() {
    return {
      orders: _orders,
      shops: _shops,
      currentShop: _currentShop,
      currentStatus: _currentStatus,
      pages: _pages,
      currentPage: _currentPage,
      perPage: _perPage
    };
  },

  getOrderItems: function() {
    return _orderItems;
  },

  getCategories: function() {
    return _cats;
  },

  getProducts: function() {
    return _products;
  },

  getShops: function(defaultShop) {
    // shops were got from database
    _shops = [
      {
        key: 'danang',
        value: 'Da Nang'
      },{
        key: 'hanoi',
        value: 'Ha Noi'
      },{
        key: 'hcm',
        value: 'Ho Chi Minh'
      }
    ];
    _shops = defaultShop ? [defaultShop].concat(_shops) : _shops;
    return _shops;
  },

  getOrderStatusList: function(defaultStatus) {
    var orderStatus = [
      {
        key: 'opening',
        value: 'Opening'
      },{
        key: 'processing',
        value: 'Processing'
      },{
        key: 'finish',
        value: 'Finish'
      },{
        key: 'depending',
        value: 'Depending'
      },{
        key: 'fail',
        value: 'Fail'
      }
    ];
    orderStatus = defaultStatus ? [defaultStatus].concat(orderStatus) : orderStatus;
    return orderStatus;
  },

  onReceiveCategories: function(data) {
    _cats = data.categories;
    _cats.splice(0, 0, { _id: '', categoryName: 'Choose' });
    this.emitChange();
  },

  onReceiveProducts: function(data) {
    _products = (data.products.length > 0) ? [{}].concat(data.products) : [];
    this.emitChange();
  },

  onReceiveOrders: function(data) {
    _orders = data.orders;
    _pages = data.pages;
    _perPage = data.perPage;
    _currentPage = data.page;
    _currentShop = data.shopId;
    _currentStatus = data.status;

    this.emit(ORDERS_CHANGE_EVENT);
  },

  onAddOrderSuccess: function(order) {
    console.log('add success Order: ' + JSON.stringify(order));
    _orderItems = [];
    _currentShop = '';
    this.emitChange();
    this.emit(ADD_ORDER_SUCCESS_EVENT);
  },

  onAddOrderItem: function(orderItem) {
    _orderItems.push(orderItem);
    this.emitChange();
  },

  onRemoveOrderItem: function(itemIndex) {
    _orderItems.splice(itemIndex, 1);
    this.emitChange();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  addSuccessListener: function(callback) {
    this.on(ADD_ORDER_SUCCESS_EVENT, callback);
  },

  removeSuccessListener: function(callback) {
    this.removeListener(ADD_ORDER_SUCCESS_EVENT, callback);
  },

  addOrdersChangeListener: function(callback) {
    this.on(ORDERS_CHANGE_EVENT, callback);
  },

  removeOrdersChangeListener: function(callback) {
    this.removeListener(ORDERS_CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.ADD_NEW_ORDER:
      OrderStore.onAddOrderSuccess(action.order);
      break;

    case AppConstants.ADD_ORDER_ITEM:
      OrderStore.onAddOrderItem(action.orderItem);
      break;

    case AppConstants.REMOVE_ORDER_ITEM:
      OrderStore.onRemoveOrderItem(action.itemIndex);
      break;

    case AppConstants.GET_CATS_FOR_ORDER:
      OrderStore.onReceiveCategories(action.data);
      break;

    case AppConstants.GET_PRODUCTS_FOR_ORDER:
      OrderStore.onReceiveProducts(action.data);
      break;

    case AppConstants.GET_ORDERS:
      OrderStore.onReceiveOrders(action.data);
      break;

    default:
      return true;
      // throw new Error('No handler found');
  }

  return true;
});

module.exports = OrderStore;
