import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql'
import { User } from '../users/models/user.model'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '../shared/decorators/gql-current-user'
import { Auth } from './models/auth.model'
import { AuthService } from './auth.service'
import { LoginInputData, LoginResponse } from './models/login.model'
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard'

@Resolver(of => Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => LoginResponse)
  @UseGuards(GqlLocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Args('loginInputData') loginInputData: LoginInputData
  ) {
    const { access_token: token } = await this.authService.login(user)

    return { token }
  }
}
