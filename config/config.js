var path = require('path');

var rootPath = path.normalize(__dirname + '/..');
var env = process.env.NODE_ENV || 'production';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'mejor-api'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/mejor-api-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'mejor-api'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/mejor-api-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'mejor-api'
    },
    port: process.env.PORT || 5000,
    db: 'mongodb://<dbuser>:<dbpassword>@<dbhost>:<dbport>/mejor_db'
  }
};

module.exports = config[env];
