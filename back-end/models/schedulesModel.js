import mongoose from "mongoose";

const scheduleSchema = mongoose.Schema({
  title: String,
  date: String,
  url: String,
});

export default mongoose.model("schedules", scheduleSchema);
