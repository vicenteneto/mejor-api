const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 5000,
    db: 'mongodb://mejor:m3j0r@ds135983.mlab.com:35983/mejor_db'
  }
};

export default config[env];
