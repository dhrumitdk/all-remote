import mongoose from "mongoose";
import brcypt from "bcrypt";

const userSchema = mongoose.Schema({
  projectName: String,
  password: String,
});

// fires before the document is stored to the DB
userSchema.pre("save", async function (next) {
  // generates the salt for hashing the password
  const salt = await brcypt.genSalt();
  this.password = await brcypt.hash(this.password, salt);
  next();
});

export default mongoose.model("users", userSchema);
