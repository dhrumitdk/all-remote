import mongoose from "mongoose";

const wallSchema = mongoose.Schema({
  title: String,
  content: String,
  accessCode: String,
});

export default mongoose.model("wall", wallSchema);
