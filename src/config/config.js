const env = process.env.NODE_ENV || 'production';

const config = {
  development: {
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/mejor-api-development'
  },

  test: {
    port: process.env.PORT || 5000,
    db: 'mongodb://localhost/mejor-api-test'
  },

  production: {
    port: process.env.PORT || 5000,
    db: 'mongodb://<dbuser>:<dbpassword>@<dbhost>:<dbport>/mejor_db'
  }
};

export default config[env];
