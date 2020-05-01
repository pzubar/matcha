import React from 'react'
import {
  TextComposer,
  Row,
  IconButton,
  AddIcon,
  TextInput,
  SendButton,
  EmojiIcon
} from '@livechat/ui-kit'

export default () => {
  return (
    <TextComposer defaultValue="Hello, can you help me?">
      <Row align="center">
        <IconButton fit>
          <AddIcon />
        </IconButton>
        <TextInput fill />
        <SendButton fit />
      </Row>

      <Row verticalAlign="center" justify="right">
        <IconButton fit>
          <EmojiIcon />
        </IconButton>
      </Row>
    </TextComposer>
  )
}
