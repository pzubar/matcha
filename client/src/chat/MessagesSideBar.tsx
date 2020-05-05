import React from 'react'
import { Message } from '../shared/types'
import {
  ChatList,
  ChatListItem,
  Avatar,
  Column,
  Row,
  Title,
  Subtitle
  // @ts-ignore
} from '@livechat/ui-kit'
interface Props {
  messages: Array<Message>
}

const MessagesSideBar = ({ messages }: Props) => {
  return (
    <ChatList style={{ maxWidth: 300 }}>
      {messages.map(({ interlocutorName, message, id }) => (
        <ChatListItem active key={id}>
          <Avatar letter={interlocutorName[0]} />
          <Column fill={'red'}>
            <Row justify>
              <Title ellipsis>{interlocutorName}</Title>
            </Row>
            <Subtitle ellipsis>{message}</Subtitle>
          </Column>
        </ChatListItem>
      ))}
      {'-----'}
    {/*  <ChatListItem active>*/}
    {/*    <Avatar letter="J" />*/}
    {/*    <Column fill>*/}
    {/*      <Row justify>*/}
    {/*        <Title ellipsis>{'Andrew'}</Title>*/}
    {/*        <Subtitle nowrap>{'14:31 PM'}</Subtitle>*/}
    {/*      </Row>*/}
    {/*      <Subtitle ellipsis>{'actually I just emailed you back'}</Subtitle>*/}
    {/*    </Column>*/}
    {/*  </ChatListItem>*/}
    {/*  <ChatListItem>*/}
    {/*    <Avatar letter="M" />*/}
    {/*    <Column fill>*/}
    {/*      <Row justify>*/}
    {/*        <Title ellipsis>{'Michael'}</Title>*/}
    {/*        <Subtitle nowrap>{'14:31 PM'}</Subtitle>*/}
    {/*      </Row>*/}
    {/*      <Subtitle ellipsis>*/}
    {/*        {"Ok, thanks for the details, I'll get back to you tomorrow."}*/}
    {/*      </Subtitle>*/}
    {/*    </Column>*/}
    {/*  </ChatListItem>*/}
    </ChatList>
  )
}

export default MessagesSideBar
