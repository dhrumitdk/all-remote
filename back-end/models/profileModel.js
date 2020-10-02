import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
  name: String,
  email: String,
  role: String,
  gender: String,
  location: String,
  localTime: String,
  contact: String,
  workingHrs: String,
  accessCode: String,
});

export default mongoose.model("profile", profileSchema);
