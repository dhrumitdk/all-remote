import mongoose from "mongoose";

const invitationSchema = mongoose.Schema({
  email: String,
  accessCode: String,
});

export default mongoose.model("invitations", invitationSchema);
