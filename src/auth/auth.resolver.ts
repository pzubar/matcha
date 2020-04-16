import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { User } from '../users/models/user.model'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '../shared/decorators/gql-current-user'
import { AuthService } from './auth.service'
import { LoginInputData, LoginResponse } from './models/login.model'
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard'
import { SignUpUserData } from './models/sign-up-user-model'
import { isError } from '../shared/types'
import * as http from 'http'

@Resolver(of => LoginResponse)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => LoginResponse)
  async signUp(@Args('signUpUserData') signUpUserData: SignUpUserData) {
    const result = await this.authService.createUser(signUpUserData)

    if (isError(result)) {
      throw result.error
    }
    const { access_token: token } = await this.authService.login({
      username: signUpUserData.username,
      id: result
    })



    console.log('RESULT! ::: ', { token })
    return { token }
  }

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
