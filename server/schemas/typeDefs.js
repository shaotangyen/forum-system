const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Post {
    _id: ID
    title: String
    content: String
    user: String
    views: Int
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id:ID
    content: String
    user: String
    createdAt: String
  }

  type User {
    _id: ID
    username: String
    email: String
    posts: [Post]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    posts: [Post]
    post(postId: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(title: String!, content: String!): Post
    updatePost(postId: ID!, title: String!, content: String!): Post
    removePost(postId: ID!): Post
  }
`;

// To add
// addComment(CommentId: ID!, content: String!): Comment
// updateComment(CommentId: ID!): Comment
// removeComment(CommentId: ID!): Comment

module.exports = typeDefs;
