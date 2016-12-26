'use strict';

var AppConstants = require('./../constants/AppConstants'),
    AppDispatcher = require('./../dispatcher/AppDispatcher'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),

    OrderForm = require('./../forms/OrderForm'),
    OrderOutForm = require('./../forms/OrderExportForm'),
    LoginForm = require('./../forms/LoginForm'),
    ProductForm = require('./../forms/ProductForm');

var CHANGE_EVENT = 'change';

var _tabs =  [
  {
    key: 'Products',
    content: ProductForm
  },{
    key: 'Orders',
    content: OrderForm
  },{
    key: 'CreateOrder',
    content: OrderOutForm
  },{
    key: 'Login',
    content: LoginForm
  }
];
var DEFAULT_TAB = _tabs[0];
var _currentTab = DEFAULT_TAB;

var AppStore = _.extend({}, EventEmitter.prototype, {

  getState: function() {
    return {
      tabs: _tabs,
      currentTab: _currentTab
    };
  },

  changeTab: function(tabKey) {
    var tabObj = _tabs.filter(function(tab) {
      return tab.key === tabKey;
    })[0];

    _currentTab  = tabObj || DEFAULT_TAB;

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

});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.CHANGE_TAB:
      AppStore.changeTab(action.tabKey);
      break;

    default:
      return true;
      // throw new Error('No handler found');
  }

  return true;

});

module.exports = AppStore;
