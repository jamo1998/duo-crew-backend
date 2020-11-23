import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  summonerName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  currentRank: {
    type: String,
    required: true,
  },
  mainRole: {
    type: String,
    required: true,
  },
  secondaryRole: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
