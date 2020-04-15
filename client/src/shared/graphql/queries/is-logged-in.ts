import { gql } from '@apollo/client'

export const IS_LOGGED = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
