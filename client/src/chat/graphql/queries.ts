import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  {
    messages {
      interlocutorId
      message
      type
    }
  }
`
