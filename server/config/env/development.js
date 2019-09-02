// 'use strict';

// var fs = require('fs');
// var envFile = require('path').join(__dirname, 'config', 'env.json');

// // loading file env.json if it exists
// if(fs.existsSync(envFile)) {
//   var env = {};
//   env = fs.readFileSync(envFile, 'utf-8');
//   env = JSON.parse(env);
//   Object.keys(env).forEach(function(key) {
//     process.env[key] = env[key];
//   });
// }

// module.exports = {
//   'db': {
//     'mongodb': 'mongodb://localhost/sales-manager'
//   }
// };
