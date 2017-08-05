import bluebird from 'bluebird';
import mongoose from 'mongoose';

import app from './config/express'
import config from './config/config';

mongoose.Promise = bluebird;
mongoose.connect(config.db, {useMongoClient: true});
mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
