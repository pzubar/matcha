import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
export class LoginInputData {
  @Field()
  usernameOrEmail: string

  @Field()
  password: string
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string
}
