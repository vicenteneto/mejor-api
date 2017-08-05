var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var Patient = mongoose.model('Patient');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/patients', function (req, res, next) {
  Patient.find(function (err, patients) {
    if (err) return next(err);
    res.json(patients);
  });
});
