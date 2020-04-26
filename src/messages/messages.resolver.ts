import { Query, Resolver, Subscription, Mutation, Args } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '@shared/decorators/gql-current-user'
import { User } from '../users/model'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { Message } from './model'
import { MessagesService } from './messages.service'
import { MessageInputData } from './model/message.input-type'
import { UsersService } from '../users/users.service'

const pubSub = new PubSub()

export const enum SubscriptionEvents {
  MESSAGE_SENT = 'MESSAGE_SENT'
}

@Resolver('Messages')
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService
  ) {
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Message])
  async messages(
    @CurrentUser() user: User
    // @Args('cursor') cursor: number
  ) {
    const messages = await this.usersService.getMessages(user.id)

    return messages
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [Message])
  async conversation(
    @CurrentUser() user: User,
    @Args('interlocutorId') interlocutorId: number
  ) {
    const messages = await this.messagesService.getConversation(
      user.id,
      interlocutorId
    )

    return messages
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Message)
  async sendMessage(
    @CurrentUser() user: User,
    @Args('messageInputData') messageInputData: MessageInputData
  ) {
    const { message, receiverId } = messageInputData

    const receiver = await this.usersService.findOne(receiverId)

    if (!receiver) {
      throw new Error('receiver not found')
    }

    try {
      const result = await this.messagesService.sendMessage(
        message,
        user.id,
        receiverId
      )

      const newMessage = {
        id: result[0],
        message,
        receiver,
        sender: user
      }

      pubSub
        .publish(SubscriptionEvents.MESSAGE_SENT, {
          messageSent: newMessage
        })
        .catch(e => {
          console.error('Error occurred while publishing message', e)
        })

      return newMessage
    } catch (e) {
      console.error('Error occurred while addingMessage', e)
      throw new Error('No message sent!')
    }
  }

  @Subscription(returns => Message, {
    name: SubscriptionEvents.MESSAGE_SENT
  })
  addCommentHandler() {
    return pubSub.asyncIterator(SubscriptionEvents.MESSAGE_SENT)
  }
}