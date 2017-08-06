import Appointment from '../models/appointment';
import Patient from '../models/patient';

const POSSIBLE_SCHEDULES = [
  new Date('2017-09-02T08:00:00.000+0000'),
  new Date('2017-09-02T10:00:00.000+0000'),
  new Date('2017-09-02T12:00:00.000+0000'),
  new Date('2017-09-09T08:00:00.000+0000'),
  new Date('2017-09-09T10:00:00.000+0000'),
  new Date('2017-09-09T12:00:00.000+0000'),
  new Date('2017-09-16T08:00:00.000+0000'),
  new Date('2017-09-16T10:00:00.000+0000'),
  new Date('2017-09-16T12:00:00.000+0000'),
  new Date('2017-09-23T08:00:00.000+0000'),
  new Date('2017-09-23T10:00:00.000+0000'),
  new Date('2017-09-23T12:00:00.000+0000'),
  new Date('2017-09-30T08:00:00.000+0000'),
  new Date('2017-09-30T10:00:00.000+0000'),
  new Date('2017-09-30T12:00:00.000+0000')
];

function possibleDates(appointments, patient) {
  let availableDates = POSSIBLE_SCHEDULES;
  appointments.forEach((appointment) => {
    availableDates = availableDates.filter((date) => {
      return appointment.email === patient.email ? appointment.date.getDate() !== date.getDate() : appointment.date.getTime() !== date.getTime();
    });
  });

  return availableDates;
}

function create(req, res) {
  if (POSSIBLE_SCHEDULES.find((date) => date.getTime() === req.body.date.getTime())) {
    Patient.findOne({email: req.body.email})
      .then((patient) => {
        if (patient) {
          Appointment.find()
            .then((appointments) => {
              if (possibleDates(appointments, patient).find((date) => date.getTime() === req.body.date.getTime())) {
                Appointment.create({
                  email: req.body.email,
                  date: req.body.date
                }).then((appointment) => res.json(appointment),
                  (err) => next(err));
              } else {
                res.status(400).json({
                  message: 'O horário "' + req.body.date + '" não é permitido para o usuário "' + req.body.email + '"',
                  title: 'error'
                });
              }
            }, (err) => next(err));
        } else {
          res.status(404).json({
            message: 'Não foi encontrado nenhum paciente com este email: ' + req.body.email,
            title: 'error'
          });
        }
      }, (err) => next(err));
  } else {
    res.status(400).json({
      message: 'O horário "' + req.body.date + '" não é um horário de constulta válido',
      title: 'error'
    });
  }
}

function list(req, res, next) {
  const filter = req.query.email ? {email: req.query.email} : {};

  Appointment.find(filter)
    .then((appointments) => res.json(appointments),
      (err) => next(err));
}

function availables(req, res, next) {
  Appointment.find()
    .then((appointments) => {
      res.json(possibleDates(appointments, req.patient));
    }, (err) => next(err));
}

export default {create, list, availables}
