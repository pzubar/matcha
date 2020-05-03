import { gql } from '@apollo/client'

export const SEND_MESSAGE = gql`
  mutation sendMessage($input: MessageInputData!) {
    sendMessage(messageInputData: $input) {
      message
    }
  }
`
