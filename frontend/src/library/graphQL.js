import { gql } from "apollo-boost"

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

export const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`

export const GET_CLINICS_QUERY = gql`
  query getClinicsQuery{
    clinics {
      id
      name
      clinicCode
      address1
      address2
      town
      county
      postcode
      url
      likes {
        id
      }
    }
  }
`

export const ME_QUERY = gql`
{
  me {
    id
    username
    email
    likeSet {
      clinic {
        id
      }
    }
  }
}
`

export const SEARCH_CLINICS_QUERY = gql`
  query($search: String) {
    clinics(search: $search) {
      id
      name
      clinicCode
      address1
      address2
      town
      county
      postcode
      url
      likes {
        id
      }
    }
  }
`
