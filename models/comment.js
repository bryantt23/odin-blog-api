const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true // Making the body field required
  },
  author: {
    type: String,
    required: true // Making the author field a required string
  }
  // You can add other fields like timestamp here
});

// Optional: You can then export this schema or use it to define a Comment model
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
