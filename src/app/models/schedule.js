import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  date: {type: Date, required: true}
});

export default mongoose.model('Schedule', ScheduleSchema);
