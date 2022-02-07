import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_POST = gql`
  mutation addPost($title: String!, $content: String!) {
    addPost(title: $title, content:$content) {
      _id
      title
      content
      user
      createdAt
      comments {
        _id
        content
        user
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $content: String!) {
    addComment(postId: $postId, content: $content) {
      _id
      content
      user
      createdAt
      comments {
        _id
        content
        createdAt
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($postId: ID!, $title: String!, $content: String!){
    updatePost(postId: $postId, title: $title, content: $content){
      _id
      title
      content
      user
      createdAt
    }
  }
`;

// to do
// export const UPDATE_COMMENT = gql`
// `;

export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
      _id
    }
  }
`;

// to do
// export const REMOVE_COMMENT = gql`
// `;