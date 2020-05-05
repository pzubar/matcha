import React from 'react'
import {
  Message,
  MessageList,
  MessageGroup,
  MessageMedia,
  MessageTitle,
  MessageButton,
  MessageText,
  MessageButtons
  // @ts-ignore
} from '@livechat/ui-kit'
import { Message as IMessage } from '../shared/types'
import './Chat.scss'
interface Props {
  conversation?: Array<IMessage>
}

const Conversation = ({ conversation }: Props) => {
  return (
    <div className={'conversation-block'}>
      <MessageList active>
        <MessageGroup onlyFirstWithMeta>
          <Message date="21:38" isOwn={true} authorName="Visitor">
            <MessageText>
              I love them soooooooooooooooooooooooooooooooooooooooo
              ooooooooooooooooooooooooooooooooooooooooooooooooooooooo much!
            </MessageText>
          </Message>
          <Message date="21:38" isOwn={true} authorName="Visitor">
            <MessageText>This helps me a lot</MessageText>
          </Message>
        </MessageGroup>
        <MessageGroup
          avatar="https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg"
          onlyFirstWithMeta
        >
          <Message authorName="Jon Smith" date="21:37">
            <MessageText>No problem!</MessageText>
          </Message>
          <Message
            authorName="Jon Smith"
            imageUrl="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png"
            date="21:39"
          >
            <MessageText>
              The fastest way to help your customers - start chatting with
              visitors who need your help using a free 30-day trial.
            </MessageText>
          </Message>
          <Message authorName="Jon Smith" date="21:39">
            <MessageMedia>
              <img src="https://static.staging.livechatinc.com/1520/P10B78E30V/dfd1830ebb68b4eefe6432d7ac2be2be/Cat-BusinessSidekick_Wallpapers.png" />
            </MessageMedia>
          </Message>
        </MessageGroup>
      </MessageList>
    </div>
  )
}
export default Conversation
