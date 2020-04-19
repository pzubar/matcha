import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Id } from '@shared/types'

@ObjectType()
export class Message {
  @Field(type => Int)
  id: Id

  @Field()
  message: string

  @Field()
  senderId: Id

  @Field()
  receiverId: Id
}
