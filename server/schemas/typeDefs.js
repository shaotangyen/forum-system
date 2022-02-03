const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Forum {
    _id: ID
    title: String
    description: String
    createdAt: String
    userCount: Int
    forumCategory: ForumCategory
    posts: [Post]
  }

  type ForumCategory {
    _id:ID
    title: String
  }

  type Post {
    _id: ID
    title: String
    content: String
    views: Int
    createdAt: String
    user: User
    comments: [Comment]
  }

  type Comment {
    _id:ID
    content: String
    createdAt: String
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    passwordd: String
    isAdmin: boolean
    forums: [Forum]
    posts: [Post]
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
    forums: [Forum]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addForum(title: String!): Forum
    addPost(PostId: ID!, title: String!, content: String!): Post
    removeForum(forumId: ID!): Forum
    removePost(PostId: ID!): Post
  }
`;

module.exports = typeDefs;
