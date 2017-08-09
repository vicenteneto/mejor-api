import Schedule from '../models/schedule';

function list(req, res, next) {
  Schedule.find()
    .then((schedules) => res.json(schedules),
      (err) => next(err));
}

export default {list}
