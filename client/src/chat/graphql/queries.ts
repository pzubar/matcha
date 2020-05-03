import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  {
    messages {
      id
      interlocutorId
      interlocutorName
      message
      type
    }
  }
`
export const GET_CONVERSATION = gql`
  query getConversation($interlocutorId: Float!) {
    conversation(interlocutorId: $interlocutorId) {
      message
#      interlocutorId
#      interlocutorName
#      type
    }
  }
`
