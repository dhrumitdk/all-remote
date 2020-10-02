import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  taskName: String,
  assignee: String,
  startDate: String,
  dueDate: String,
  priority: String,
  status: String,
});

export default mongoose.model("tasks", taskSchema);
