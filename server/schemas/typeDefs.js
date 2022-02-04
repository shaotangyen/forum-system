const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    _id: ID
    title: String
    content: String
    views: Int
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id:ID
    content: String
    user: User
    createdAt: String
  }

  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]!
    comments: [Comment]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    posts: [Post]
    comments: [Comment]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(PostId: ID!, title: String!, content: String!): Post
  }
`;

//query
// type Forum {
//   _id: ID
//   title: String
//   description: String
//   createdAt: String
//   userCount: Int
//   forumCategory: ForumCategory
//   posts: [Post]
// }

// type ForumCategory {
//   _id:ID
//   title: String
// }

//mutation
// addComment(CommentId: ID!, content: String!): Comment
// updatePost(PostId: ID!): Post
// updateComment(CommentId: ID!): Comment
// removePost(PostId: ID!): Post
// removeComment(CommentId: ID!): Comment

module.exports = typeDefs;
