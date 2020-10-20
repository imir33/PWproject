const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String
  },
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
    }
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
