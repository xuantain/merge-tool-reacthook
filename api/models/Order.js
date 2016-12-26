'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderStatus: { type: String, default: 'opening' },
  createdAt: { type: Date, default: Date.now },
  billingDate: { type: Date, default: Date.now },
  amount: { type: Number, default: 0 },
  shopName: { type: String, default: '' },
  customerName: { type: String, default: '', trim : true },
  customerPhone: { type: String, default: '' },
  customerAddress: { type: String, default: '', trim : true },
  customerNote: { type: String, default: '', trim : true },
  orderItems:[{
    product: { type: String, ref: 'Product' },
    quantity: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    discount: { type: Number, min: 0, max: 100 },
    amount: { type: Number, default: 0 },
  }]
});

/*
 * Validations
 */
OrderSchema.path('customerName').required(true, 'Customer\'s name cannot blank');
OrderSchema.path('customerPhone').required(true, 'Customer\'s phone cannot blank');
OrderSchema.path('customerAddress').required(true, 'Customer\'s address cannot blank');
OrderSchema.path('orderItems').validate(function(items) {
  return items.length > 0;
}, 'Order\' items cannot empty');


/**
 * Pre-save hook
 */
OrderSchema.pre('save', function(next) {
  if (this.isNew) {
    return next();
  }
});

/*
 * Methods
 */
OrderSchema.methods = {

};

/*
* Statics
*/
OrderSchema.statics = {

  load: function (options) {
    return this.findOne(options.criteria)
      .select(options.select)
      .populate('orderItems.product')
      .exec();
  },

  list: function (options) {
    var _criteria = options.criteria || {},
        _select = options.select || {},
        _limit = options.perPage || 0,
        _skip = (options.page || 0) * _limit,
        _sort = options.sort || {};

    return this.find(_criteria)
      .select(_select)
      .sort(_sort)
      .limit(_limit)
      .skip(_skip)
      .populate('orderItems.product')
      .exec();
  },

  count: function (options) {
    var _criteria = options.criteria || {};

    return this.find(_criteria)
      .count()
      .exec();
  }
};

module.exports = mongoose.model('Order', OrderSchema);
