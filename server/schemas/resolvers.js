const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({}).populate('posts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('posts');
    },
    posts: async (parent, { user }) => {
      const params = user ? { user } : {};
      return Post.find(params).sort({ createdAt: -1 });
    },
    post: async (parent, { _id }) => {
      console.log("id",_id);
      return Post.findOne({ _id: _id });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    //Adding a new post to the database, and to its user
    addPost: async (parent, { title, content }, context) => {
      console.log('title', title);
      console.log('content', content);
      if (context.user) {
        const post = await Post.create({
          title,
          content,
          user: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //Updating a post to the database, and to its user
    updatePost: async (parent, { postId, title, content }, context) => {
      if (context.user) {
        const post = await Post.findOneAndUpdate(
          {
            _id: postId
          },
          {
            title,
            content,
          },
          {
            new: true,
          }
        );

        // check later if User's post array need to be updated
        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $addToSet: { posts: post._id } }
        // );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //Removing a post from the database, and from its user
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
        });

        // await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $pull: { posts: post._id } }
        // );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //Adding a comment to a post
    addComment: async (parent, { postId, content }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { content, user: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Updating a comment to a post
    updateComment: async (parent, { postId, commentId, content }, context) => {
      if (context.user) {
        // TO CHECK
        //Post.comments to find one? Check later
        return Post.comments.findOneAndUpdate(
          { _id: commentId },
          {
            $addToSet: {
              comments: { content, user: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //Removing a comment to a post
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                user: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  }
};

module.exports = resolvers;
