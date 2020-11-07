import mongoose from "mongoose";
import brcypt from "bcrypt";

const wallSchema = mongoose.Schema({
  title: String,
  content: String,
  accessCode: String,
});

// fires before the document is stored to the DB
wallSchema.pre("save", async function (next) {
  // generates the salt for hashing the password
  const salt = await brcypt.genSalt();
  this.accessCode = await brcypt.hash(this.accessCode, salt);
  next();
});

export default mongoose.model("wall", wallSchema);
