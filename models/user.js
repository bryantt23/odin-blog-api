const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  // You can add more fields here if needed later.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
