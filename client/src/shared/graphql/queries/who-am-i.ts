import { gql } from '@apollo/client'

export const WHO_AM_I = gql`
  query whoAmI {
    whoAmI {
      username
      id
      firstName
      lastName
    }
  }
`
