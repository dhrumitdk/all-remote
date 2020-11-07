import mongoose from "mongoose";
import brcypt from "bcrypt";

const taskSchema = mongoose.Schema({
  taskName: String,
  assignee: String,
  startDate: String,
  dueDate: String,
  priority: String,
  status: String,
  accessCode: String,
});

// fires before the document is stored to the DB
taskSchema.pre("save", async function (next) {
  // generates the salt for hashing the password
  const salt = await brcypt.genSalt();
  this.accessCode = await brcypt.hash(this.accessCode, salt);
  next();
});

export default mongoose.model("tasks", taskSchema);
