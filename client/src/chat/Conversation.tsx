import React, { useMemo } from 'react'
import {
  Message,
  MessageList,
  MessageGroup,
  MessageMedia,
  MessageText
  // @ts-ignore
} from '@livechat/ui-kit'
import { Message as IMessage, User } from '../shared/types'
import './Chat.scss'

type GroupedMessages = Array<Array<Message>>

interface Props {
  conversation?: Array<IMessage>
  interlocutorData?: User
}

const Conversation = ({ conversation, interlocutorData }: Props) => {
  const messages = useMemo(
    () =>
      conversation?.reduce((result: GroupedMessages, curr, index, arr) => {
        const prev = arr[index - 1]
        const isPrevSenderSame = prev?.senderId === curr.senderId
        // const
        if (isPrevSenderSame) {
          const [lastItem] = result.slice(-1)

          lastItem.push(curr)
        } else {
          result.push([curr])
        }
        return result
        // if (isPrevSenderSame) {
        //
        // }
        // const key = `${
        //   senderId === interlocutorData?.id ? interlocutorData?.username : 'You'
        // }`
        // if (result[key]}_`// ])
        //         return {}
        // return result
      }, []) ?? [],
    [conversation, interlocutorData]
  )

  React.useEffect(() => {
    const m = messages
    debugger
  }, [messages])
  return (
    // {}
    <div className={'conversation-block'}>
      <MessageList active>
        {messages.map(messageGroup => (
          <MessageGroup onlyFirstWithMeta>
            {messageGroup.map(message => (
              <Message
                date={message.createdAt}
                isOwn={!(message.senderId === interlocutorData?.id)}
              >
                <MessageText>{message.message}</MessageText>
              </Message>
            ))}
          </MessageGroup>
        ))}
      </MessageList>

      {/*  <MessageGroup onlyFirstWithMeta>*/}
      {/*    <Message date="21:38" isOwn={true} authorName="Visitor">*/}
      {/*      <MessageText>*/}
      {/*        I love them soooooooooooooooooooooooooooooooooooooooo*/}
      {/*        ooooooooooooooooooooooooooooooooooooooooooooooooooooooo much!*/}
      {/*      </MessageText>*/}
      {/*    </Message>*/}
      {/*    <Message date="21:38" isOwn={true} authorName="Visitor">*/}
      {/*      <MessageText>This helps me a lot</MessageText>*/}
      {/*    </Message>*/}
      {/*  </MessageGroup>*/}
      {/*  <MessageGroup*/}
      {/*    avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"*/}
      {/*    onlyFirstWithMeta*/}
      {/*  >*/}
      {/*    <Message authorName="Jon Smith" date="21:37">*/}
      {/*      <MessageText>No problem!</MessageText>*/}
      {/*    </Message>*/}
      {/*    <Message*/}
      {/*      authorName="Jon Smith"*/}
      {/*      imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"*/}
      {/*      date="21:39"*/}
      {/*    >*/}
      {/*      <MessageText>*/}
      {/*        The fastest way to help your customers - start chatting with*/}
      {/*        visitors who need your help using a free 30-day trial.*/}
      {/*      </MessageText>*/}
      {/*    </Message>*/}
      {/*    <Message authorName="Jon Smith" date="21:39">*/}
      {/*      <MessageMedia>*/}
      {/*        <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />*/}
      {/*      </MessageMedia>*/}
      {/*    </Message>*/}
      {/*  </MessageGroup>*/}
      {/*</MessageList>*/}
    </div>
  )
}
export default Conversation
