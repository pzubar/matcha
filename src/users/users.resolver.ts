import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { User } from './models/user.model'

@Resolver(of => User)
export class UsersResolver {
  constructor() {}

  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return { id: 123, firstName: 'Ivan', lastName: 'Petrov' }
  }

  @Query(returns => [User])
  async users() {
    return [{ id: 123, firstName: 'Ivan', lastName: 'Petrov' }]
  }
}
