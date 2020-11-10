import mongoose from "mongoose";

const invitationSchema = mongoose.Schema({
  name: String,
  email: String,
  designation: String,
  location: String,
  accessCode: String,
});

export default mongoose.model("invitations", invitationSchema);
