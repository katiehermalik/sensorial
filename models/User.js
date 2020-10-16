const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: String,
  isLoggedin: {
    type: Boolean,
    default: false,
  },
  activities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity'
  }]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;

