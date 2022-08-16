const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  passwordHash: { type: String, required: true },
  userType: { type: String, required: true },
}, {
  timestamps: true,
});

// Creating a model for users
const User = mongoose.model('User', userSchema);

module.exports = User;
