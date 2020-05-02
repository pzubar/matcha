import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Id } from '@shared/types'

@ObjectType()
export class Message {
  @Field(type => Int)
  id: Id

  @Field()
  message: string

  @Field()
  interlocutorId: Id

  @Field()
  type: string

  senderId: number
}
