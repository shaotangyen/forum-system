const { Schema, model } = require('mongoose');
//const dateFormat = require('../utils/dateFormat');

const postSchema = new Schema({
  title: {
    type: String,
    required: 'You need to write a title',
    minlength: 1,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String,
    required: true,
    trim: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      user: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Post = model('Post', postSchema);

module.exports = Post;