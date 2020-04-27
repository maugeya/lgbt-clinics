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
`
