'use strict';

var User = require('../api/models/User');
var local = require('./passport/local');

const passportConfig = function (passport) {
  // serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.load({ criteria: { _id: id } }, function (err, user) {
      done(err, user);
    });
  });

  // use these strategies
  passport.use(local);
};

export default passportConfig;
