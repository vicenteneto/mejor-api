import bluebird from 'bluebird';
import mongoose from 'mongoose';
import schedule from 'node-schedule';

import app from './config/express';
import config from './config/config';
import Patient from './app/models/patient';
import Schedule from './app/models/schedule';

mongoose.Promise = bluebird;
mongoose.connect(config.db, {useMongoClient: true});
mongoose.connection.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

schedule.scheduleJob('0 0 3 * * *', function () {
  let now = new Date();
  now.setDate(now.getDate() - 3);

  Patient.find({createdAt: {$lte: now}}, function (err, docs) {
    docs.remove();
  });
});

Schedule.find().then((schedules) => {
  if (schedules.length === 0) {
    Schedule.create({date: new Date('2017-09-02T08:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-02T10:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-02T12:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-09T08:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-09T10:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-09T12:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-16T08:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-16T10:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-16T12:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-23T08:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-23T10:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-23T12:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-30T08:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-30T10:00:00.000+0000')});
    Schedule.create({date: new Date('2017-09-30T12:00:00.000+0000')});
  }
});

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
