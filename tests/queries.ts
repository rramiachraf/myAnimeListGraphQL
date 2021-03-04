import { gql } from 'apollo-server-express'

export const CREATE_ACCOUNT = gql`
  mutation createAccountMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password)
  }
`

export const LOGIN = gql`
  mutation loginMutation($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

export const ME = gql`
  {
    me {
      username
      email
    }
  }
`

export const ADD_POST = gql`
  mutation addPostMutation($title: String!) {
    addPost(title: $title)
  }
`

export const POSTS = gql`
  {
    posts {
      title
      body
    }
  }
`
