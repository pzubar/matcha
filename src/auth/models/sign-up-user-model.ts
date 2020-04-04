import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SignUpUserData {
  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  firstName: string

  @Field()
  lastName: string
}
