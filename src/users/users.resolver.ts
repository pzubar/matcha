import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '@shared/decorators/gql-current-user'
import { User } from './model'
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard'
import { UsersService } from './users.service'
import { isError } from '@shared/types'

@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}
  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    const result = await this.usersService.findOne(id)

    if (isError(result)) {
      throw result.error
    }
    return result
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => [User])
  async users() {
    return await this.usersService.getAllUsers()
  }
}
