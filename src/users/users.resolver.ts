import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { User } from './model'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { CurrentUser } from '../shared/decorators/gql-current-user'

@Resolver(of => User)
export class UsersResolver {
  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return { id: 321312, firstName: 'Petr', lastName: 'Ivanov' }
  }

  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return { id: 123, firstName: 'Ivan', lastName: 'Petrov' }
  }

  @Query(returns => [User])
  async users() {
    return [{ id: 123, firstName: 'Ivan', lastName: 'Petrov' }]
  }
}
