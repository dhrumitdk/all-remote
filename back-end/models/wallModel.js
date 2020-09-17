import mongoose from "mongoose";

const wallSchema = mongoose.Schema({
  title: String,
  content: String,
});

export default mongoose.model("wall", wallSchema);
