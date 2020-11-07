import mongoose from "mongoose";
import brcypt from "bcrypt";

const scheduleSchema = mongoose.Schema({
  title: String,
  date: String,
  url: String,
  accessCode: String,
});

// fires before the document is stored to the DB
scheduleSchema.pre("save", async function (next) {
  // generates the salt for hashing the password
  const salt = await brcypt.genSalt();
  this.accessCode = await brcypt.hash(this.accessCode, salt);
  next();
});

export default mongoose.model("schedules", scheduleSchema);
