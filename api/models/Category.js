'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Category Schema
 */
var CategorySchema = new Schema({
  _id: { type: Number, unique: true },
  categoryName: { type : String, default : '', trim : true },
  description: { type : String, default : '', trim : true },
  parents: [],
  createdAt : { type : Date, default : Date.now }
});

/**
 * Validations
 */
CategorySchema.path('categoryName').required(true, 'Category\'s name cannot be blank');

/**
 * Pre-remove hook
 */
CategorySchema.pre('remove', function (next) {
  next();
});

/**
 * Pre-save hook
 */
CategorySchema.pre('save', function (next) {
  var category = this;
  if (this.isNew) {
    category.createdAt = new Date();
  }
  next();
});

/**
 * Methods
 */
CategorySchema.methods = {

};

/**
 * Statics
 */
CategorySchema.statics = {

  load: function (options) {
    var _criteria = options.criteria || {};
    var _select = options.select || 'categoryName';
    return this.find(_criteria).select(_select).exec();
  },

  list: function (options) {
    var _criteria = options.criteria || {},
        _select = options.select || '',
        _limit = options.perPage || 0,
        _skip = (options.page || 0) * _limit,
        _sort = options.sort || {};

    return this.find(_criteria)
      .select(_select)
      .sort(_sort)
      .limit(_limit)
      .skip(_skip)
      .exec();
  }
};

module.exports = mongoose.model('Category', CategorySchema);
