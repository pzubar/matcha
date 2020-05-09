import React, { useMemo, useEffect } from 'react'
import {
  Message,
  MessageList,
  MessageGroup,
  MessageText
  // @ts-ignore
} from '@livechat/ui-kit'
import { Message as IMessage, User } from '../shared/types'
import './Chat.scss'

type GroupedMessages = Array<
  Array<IMessage & { isOwn: boolean; authorName?: string }>
>

interface Props {
  conversation?: Array<IMessage>
  interlocutorData?: User
  subscribeToNewMessages: () => void
}

const Conversation = ({
  conversation,
  interlocutorData,
  subscribeToNewMessages
}: Props) => {
  const messages = useMemo(
    () =>
      conversation?.reduce((result: GroupedMessages, curr, index, arr) => {
        const prev = arr[index - 1]
        const isPrevSenderSame = prev?.senderId === curr.senderId
        const isOwn = curr.senderId !== interlocutorData?.id
        const messageData = {
          ...curr,
          isOwn,
          authorName: isOwn ? 'You' : interlocutorData?.username
        }

        if (isPrevSenderSame) {
          const [lastItem] = result.slice(-1)

          lastItem.push(messageData)
        } else {
          result.push([messageData])
        }
        return result
      }, []) ?? [],
    [conversation, interlocutorData]
  )

  useEffect(() => {
    subscribeToNewMessages()
  }, [])

  return (
    <div className={'conversation-block'}>
      <MessageList active>
        {messages.map(messageGroup => (
          <MessageGroup onlyFirstWithMeta>
            {messageGroup.map(message => (
              <Message isOwn={message.isOwn} authorName={message.authorName}>
                <MessageText>{message.message}</MessageText>
              </Message>
            ))}
          </MessageGroup>
        ))}
      </MessageList>
    </div>
  )
}
export default Conversation
