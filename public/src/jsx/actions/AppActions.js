'use strict';

var AppConstants = require('./../constants/AppConstants'),
    AppDispatcher = require('./../dispatcher/AppDispatcher');

var AppActions = {

  changeTab: function(tabKey) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_TAB,
      tabKey: tabKey
    });
  }

};

module.exports = AppActions;
