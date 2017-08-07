import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import methodOverride from 'method-override';

import appointments from '../app/routes/appointments';
import patients from '../app/routes/patients';

const app = express();

let env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression());
app.use(methodOverride());
app.use(cors());

app.use('/api/appointments', appointments);
app.use('/api/patients', patients);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not Found',
    title: 'error'
  });
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
      title: 'error'
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: {},
    title: 'error'
  });
});

export default app;
