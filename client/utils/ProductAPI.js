// 'use strict';

// import request from 'superagent';
// import Promise from 'bluebird';

// module.exports = {

//   getCategories: function() {
//     return new Promise(function(fulfill, reject) {
//       request.get('/api/categories')
//         .set('Accept', 'application/json')
//         .end(function(err, res) {
//           if (err) {
//             reject(err);
//           }
//           fulfill(res.body);
//         });
//     });
//   },

//   getProducts: function(catId, perPage, page) {
//     // Request get products
//     perPage = perPage || 5;
//     page = page || 1;

//     var url = '/api/products/'+ ( catId ? catId +'/' : '' );
//     url += perPage +'/'+ page;

//     return new Promise(function(fulfill, reject) {
//       request.get(url)
//         .set('Accept', 'application/json')
//         .end(function(err, res) {
//           if (err) {
//             reject(err);
//           }
//           else {
//             var data = res.body;

//             var pages = Math.floor(data.total/perPage);
//             pages += (data.total%perPage > 0) ? 1 : 0;

//             data.pages = pages;
//             data.perPage = perPage;
//             data.page = page;
//             data.catId = catId;

//             fulfill(data);
//           }
//         });
//     });
//   }

// };
