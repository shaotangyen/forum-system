const { School, Class, Professor } = require('../models');

const resolvers = {
  Query: {
    users: async () => { 
      return User.find().populate('posts');
    },
    post: async (parent, { postId }) => { 
      return Post.findOne({ _id: postId });
    },
    posts: async (parent, { username }) => { 
      //to do
      const params = username ? { username } : {};
      return Post.find({params});
    },
    forum: async (parent, { forumId }) => { 
      return Forum.findOne({ _id: forumId });
    },
    forums: async (parent, { postId }) => { 
      //to do
      const params = postId ? { postId } : {};
      return Forum.find({params});
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('posts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    //to do
    //create
    //update
    //remove
  }
};

module.exports = resolvers;
