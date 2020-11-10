import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
  title: String,
  date: String,
  url: String,
  accessCode: String,
});

export default mongoose.model("schedules", scheduleSchema);
