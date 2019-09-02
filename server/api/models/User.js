// 'use strict';

// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var crypto = require('crypto');

// var oAuthTypes = [
//   'github',
//   'twitter',
//   'facebook',
//   'google',
//   'linkedin'
// ];

// /**
//  * User Schema
//  */
// var UserSchema = new Schema({
//   'name': { type: String, default: '', trim : true },
//   'email': { type: String, default: '', trim : true },
//   'userName': { type: String, default: '', trim : true },
//   'provider': { type: String, default: '' },
//   'hashedPassword': { type: String, default: '' },
//   'salt': { type: String, default: '' },
//   'authToken': { type: String, default: '' }
// });

// /**
//  * Virtuals
//  */
// UserSchema
//   .virtual('password')
//   .set(function(password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashedPassword = this.encryptPassword(password);
//   })
//   .get(function() { return this._password; } );

// /**
//  * Validations
//  */
// var validatePresenceOf = function (value) {
//   return value && value.length;
// };

// // the below 5 validations only apply if you are signing up traditionally

// UserSchema.path('name').validate(function (name) {
//   if (this.skipValidation()) { return true; }
//   return name.length;
// }, 'Name cannot be blank');

// UserSchema.path('email').validate(function (email) {
//   if (this.skipValidation()) { return true; }
//   return email.length;
// }, 'Email cannot be blank');

// UserSchema.path('email').validate(function (email, fn) {
//   var User = mongoose.model('User');
//   if (this.skipValidation()) { fn(true); }

//   // Check only when it is a new user or when email field is modified
//   if (this.isNew || this.isModified('email')) {
//     User.find({ email: email }).exec(function (err, users) {
//       fn(!err && users.length === 0);
//     });
//   } else { fn(true); }
// }, 'Email already exists');

// UserSchema.path('userName').validate(function (userName) {
//   if (this.skipValidation()) { return true; }
//   return userName.length;
// }, 'UserName cannot be blank');

// UserSchema.path('hashedPassword').validate(function (hashedPassword) {
//   if (this.skipValidation()) { return true; }
//   return hashedPassword.length && this._password.length;
// }, 'Password cannot be blank');

// /**
//  * Pre-save hook
//  */
// UserSchema.pre('save', function(next) {
//   if (!this.isNew) { return next(); }

//   if (!validatePresenceOf(this.password) && !this.skipValidation()) {
//     next(new Error('Invalid password'));
//   } else {
//     next();
//   }
// });

// /**
//  * Methods
//  */
// UserSchema.methods = {

//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashedPassword;
//   },

//   makeSalt: function () {
//     return Math.round((new Date().valueOf() * Math.random())) + '';
//   },

//   encryptPassword: function (password) {
//     if (!password) { return ''; }
//     try {
//       return crypto
//         .createHmac('sha1', this.salt)
//         .update(password)
//         .digest('hex');
//     } catch (err) {
//       return '';
//     }
//   },

//   /**
//    * Validation is not required if using OAuth
//    */
//   skipValidation: function() {
//     return ~oAuthTypes.indexOf(this.provider);
//   }
// };

// /**
//  * Statics
//  */
// UserSchema.statics = {

//   load: function (options, callback) {
//     var _criteria = options.criteria || {},
//         _select = options.select || 'name userName';
//     this.findOne(_criteria).select(_select).exec(callback);
//   },

//   list: function (options) {
//     var _criteria = options.criteria || {},
//         _limit = options.perPage || 0,
//         _skip = (options.page || 0) * _limit,
//         _sort = options.sort || {};

//     return this.find(_criteria)
//       .sort(_sort)
//       .limit(_limit)
//       .skip(_skip)
//       .exec();
//   }
// };

// module.exports = mongoose.model('User', UserSchema);
