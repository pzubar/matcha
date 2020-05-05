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

  @Field({ nullable: true })
  type?: string

  @Field()
  interlocutorName: string

  @Field(type => Int, { nullable: true })
  senderId?: number

  @Field(type => Int, { nullable: true })
  receiverId?: number
}
