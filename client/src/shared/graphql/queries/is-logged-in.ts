import { gql } from '@apollo/client'

export interface IsLogged {
  isLoggedIn: boolean
}

export const IS_LOGGED = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`
