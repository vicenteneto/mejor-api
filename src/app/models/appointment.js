import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  email: {type: String, required: true, lowercase: true},
  date: {type: Date, required: true}
});

export default mongoose.model('Appointment', AppointmentSchema);
