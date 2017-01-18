'use strict';

var join = require('path').join;
var extend = require('util')._extend;

var development = require('./env/development');
var production = require('./env/production');
var test = require('./env/test');

var defaults = {
  root: join(__dirname, '..')
};

module.exports = {
  development: extend(development, defaults),
  production: extend(production, defaults),
  test: extend(test, defaults)
}[process.env.NODE_ENV || 'development'];
