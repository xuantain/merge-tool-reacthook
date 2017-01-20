'use strict';

module.exports = {

  getPageSizes: function () {
    return [
      { key: 5, value: 5 },
      { key: 10, value: 10 },
      { key: 15, value: 15 },
      { key: 20, value: 20 },
      { key: 25, value: 25 }
    ];
  },

  guid: function () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

};
