'use strict';

var join = require('path').join,
    config = require('../config/config');

module.exports = function(app) {
  var swagger = require('swagger-noodle')({
    API_SPEC_FILE: join(config.root, 'api/swagger.json'),
    CONTROLLERS_DIR: join(config.root, 'api/controllers'),
    MOCK_MODE: true
  });
  app.use(swagger);
};
