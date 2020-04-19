import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
class User {
  @Field(type => Int)
  id: number

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field()
  email?: string

  @Field()
  password?: string

  @Field()
  username?: string

  @Field(type => Int, { nullable: true })
  distance?: number
}

export default User
