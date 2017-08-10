import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true, index: {unique: true}},
  name: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  location: {type: String, required: true},
  height: {type: Number, required: true, min: 0},
  weight: {type: Number, required: true, min: 0},
  createdAt: {type: Date, required: true}
});

export default mongoose.model('Patient', PatientSchema);
