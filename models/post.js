const mongoose = require('mongoose');
const { Schema } = mongoose;
const commentSchema = require('./comment');

const postSchema = new Schema({
  title: String,
  body: String,
  comments: [commentSchema],
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
