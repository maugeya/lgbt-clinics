import { gql } from "apollo-boost";

export const REGISTER_MUTATION = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createUser(username:$username, email:$email, password:$password) {
      user {
        id
        username
        email
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`;
