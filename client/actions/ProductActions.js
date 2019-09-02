// 'use strict';

// var AppConstants = require('./../constants/AppConstants');
// var AppDispatcher = require('./../dispatcher/AppDispatcher');
// var ProductAPI = require('./../utils/ProductAPI');

// var ProductActions = {

//   loadData: function(state) {
//     Promise.all([
//         this.getCategories(),
//         this.getProducts(state.currentCat, state.perPage, state.currentPage)
//       ]).then(function() {
//         // AppDispatcher.handleServerAction({
//         //   actionType: AppConstants.LOAD_DATA_FOR_PRODUCT_FORM
//         // });
//       });
//   },

//   getCategories: function() {
//     var getCats = ProductAPI.getCategories();
//     getCats.then(function(data) {
//       AppDispatcher.handleServerAction({
//         actionType: AppConstants.GET_CATS_FROM_SERVER,
//         data: data
//       });
//     }).catch(function(err) {
//       console.error(err.toString());
//     });
//   },

//   getProducts: function(catId, perPage, page) {
//     var getProducts = ProductAPI.getProducts(catId, perPage, page);
//     getProducts.then(function(data) {
//       AppDispatcher.handleServerAction({
//         actionType: AppConstants.GET_PRODUCTS_FROM_SERVER,
//         data: data
//       });
//     }).catch(function(err) {
//       console.error(err.toString());
//     });
//   }

// };

// module.exports = ProductActions;
