import React from 'react'
import {
  ChatList,
  ChatListItem,
  Avatar,
  Column,
  Row,
  Title,
  Subtitle
} from '@livechat/ui-kit'

export default () => {
  return (
    <ChatList style={{ maxWidth: 300 }}>
      <ChatListItem active>
        <Avatar letter="J" />
        <Column fill>
          <Row justify>
            <Title ellipsis>{'Andrew'}</Title>
            <Subtitle nowrap>{'14:31 PM'}</Subtitle>
          </Row>
          <Subtitle ellipsis>{'actually I just emailed you back'}</Subtitle>
        </Column>
      </ChatListItem>
      <ChatListItem>
        <Avatar letter="M" />
        <Column fill>
          <Row justify>
            <Title ellipsis>{'Michael'}</Title>
            <Subtitle nowrap>{'14:31 PM'}</Subtitle>
          </Row>
          <Subtitle ellipsis>
            {"Ok, thanks for the details, I'll get back to you tomorrow."}
          </Subtitle>
        </Column>
      </ChatListItem>
    </ChatList>
  )
}
