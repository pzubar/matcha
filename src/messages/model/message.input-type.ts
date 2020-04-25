import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class MessageInputData {
  @Field()
  message: string

  @Field(type => Int)
  receiverId: number
}
