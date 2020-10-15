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
  friends: [
    {
      users: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    }
  ],
});

module.exports = User = mongoose.model('user', UserSchema);
