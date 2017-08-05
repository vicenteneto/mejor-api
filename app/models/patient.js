var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PatientSchema = new Schema({
  email: {type: String, required: true, lowercase: true, index: {unique: true}},
  name: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  location: {type: String, required: true},
  height: {type: Number, required: true, min: 0},
  weight: {type: Number, required: true, min: 0}
});

mongoose.model('Patient', PatientSchema);
