const { User, Post } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find({}).populate('posts');
    },
    posts: async () => {
      // const params = user ? { user } : {};
      // return Post.find({params}).sort({ createdAt: -1 });
      return Post.find({}).populate('comments');
    },
    
    // NEED TO ADD POST(ID) QUERY

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
          });

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
          user: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: post._id } }
        );

        return post;
      }
      throw new AuthenticationError('You need to be logged in!');
      // return Post.findOneAndDelete({ _id: postId });
    },
    //addComment
    //updateComment
    //removeComment
  }
};

module.exports = resolvers;
