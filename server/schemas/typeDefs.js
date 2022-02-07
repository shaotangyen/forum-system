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
    user(username: String!): User
    posts(user: String): [Post]
    post(_id: ID!): Post
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(title: String!, content: String!): Post
    updatePost(postId: ID!, title: String!, content: String!): Post
    removePost(postId: ID!): Post
    addComment(postId: ID!, content: String!): Post
    updateComment(postId: ID!, commentId: ID!, content: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;



module.exports = typeDefs;
