import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    projectName: String,
    password: String
});

export default mongoose.model('users', userSchema);