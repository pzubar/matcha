import React from 'react'
import { TextComposer, Row, TextInput, SendButton } from '@livechat/ui-kit'

export default ({onSend}) => {
  return (
    <TextComposer onSend={onSend}>
      <Row align="center">
        <TextInput />
        <SendButton fit />
      </Row>
    </TextComposer>
  )
}
