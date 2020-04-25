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
  ) {}

  @Query(returns => [Message])
  @UseGuards(GqlAuthGuard)
  async messages(@CurrentUser() user: User) {
    if (!user) {
      throw new Error('You must be logged in')
    }

    // const { cursor } = args
    // const users = await this.messagesService.
    // const messages = await models.user.getMessages(user.id, cursor)
    //
    // const filteredMessages = messages.map(message => {
    //   const sender = users.find(user => user.id === message.senderId)
    //   const receiver = users.find(user => user.id === message.receiverId)
    //   return { ...message, sender, receiver }
    // })

    return []
  }


  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Message)
  async sendMessage(
    @CurrentUser() user: User,
    @Args('messageInputData') messageInputData: MessageInputData
  ) {
    if (!user) {
      throw new Error('You must be logged in')
    }
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

      pubSub.publish(SubscriptionEvents.MESSAGE_SENT, {
        messageSent: newMessage
      })

      return newMessage
    } catch (e) {
      console.error("ERRRRR:::", e)
      throw new Error('No message sent!')
    }
  }

  @Subscription(returns => Message, {
    name: 'messageSent'
  })
  addCommentHandler() {
    return pubSub.asyncIterator('messageSent')
  }
}
