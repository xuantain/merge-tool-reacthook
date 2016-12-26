'use strict';

var _ = require('lodash');

/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */
exports.errors = function (errors) {
  if (typeof errors === 'string') { return [errors]; }

  errors = errors || {};
  var keys = Object.keys(errors);
  var errs = [];

  // if there is no validation error, just display a generic error
  if (!keys) {
    errs.push('Oops! There was an error');
    return errs;
  }

  for(var key in keys) {
    if (errors[key]) { errs.push(errors[key].message); }
  }

  return errs;
};

/**
 * Check string is null/undefined/empty
 *
 * @param {String} _str
 * @return {Boolean}
 * @api public
 */
exports.isStringNull = function (_str) {
  return _.isString(_str) && _.isNull(_str) || _.isNaN(_str) || _.isUndefined(_str);
};
