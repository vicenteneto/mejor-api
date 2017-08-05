var path = require('path');

var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mejor-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mejor-api-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'mejor-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mejor-api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'mejor-api'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/mejor-api-production'
  }
};

module.exports = config[env];
