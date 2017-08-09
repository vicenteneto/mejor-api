import Appointment from '../models/appointment';
import Patient from '../models/patient';
import Schedule from '../models/schedule';

function possibleDates(appointments, callback) {
  Schedule.find().then((schedules) => {
    let availableDates = schedules.map((schedule) => schedule.date);
    appointments.forEach((appointment) => {
      availableDates = availableDates.filter((date) => {
        return appointment.date.getTime() !== date.getTime();
      });
    });

    callback(availableDates);
  }, (err) => next(err));
}

function create(req, res) {
  Schedule.find({date: req.body.date}).then((schedule) => {
    if (schedule) {
      Patient.findOne({email: req.body.email})
        .then((patient) => {
          if (patient) {
            Appointment.find()
              .then((appointments) => {
                possibleDates(appointments, (dates) => {
                  if (dates.find((date) => date.getTime() === req.body.date.getTime())) {
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
                });
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
  }, (err) => next(err));
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
      possibleDates(appointments, (dates) => res.json(dates));
    }, (err) => next(err));
}

export default {create, list, availables}
