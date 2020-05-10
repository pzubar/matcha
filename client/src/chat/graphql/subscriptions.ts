import { gql } from '@apollo/client'

export const MESSAGE_SENT = gql`
  subscription($receiverId: Int!) {
    messageSent(receiverId: $receiverId) {
      id
      message
      receiverId
      senderId
      createdAt
    }
  }
`
