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
  picture: {
    type: String,
    default: "https://i.ibb.co/zWgh0vx/default-profile-pic.png",
  },
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

