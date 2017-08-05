import Patient from '../models/patient';

function create(req, res, next) {
  Patient.findOne({email: req.body.email}).then((patient) => {
    if (patient === null) {
      Patient.create({
        email: req.body.email,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        location: req.body.location,
        height: req.body.height,
        weight: req.body.weight
      }).then((patient) => res.json(patient),
        (err) => next(err));
    } else {
      res.status(400).json({
        message: 'User with email "' + req.body.email + '" already exists.',
        title: 'error'
      });
    }
  });
}

function list(req, res, next) {
  const filter = req.query.email ? {email: req.query.email} : {};
  const limit = Number.parseInt(req.query.limit) || 50;
  const skip = Number.parseInt(req.query.skip) || 0;

  Patient.find(filter)
    .skip(skip)
    .limit(limit)
    .exec()
    .then((patients) => res.json(patients),
      (err) => next(err));
}

export default {create, list}
