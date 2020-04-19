import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '@shared/decorators/gql-current-user'
import { isError } from '@shared/types'
import fetch from 'node-fetch'
import { User } from '../users/model'
import { AuthService } from './auth.service'
import { LoginInputData, LoginResponse } from './models/login.model'
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard'
import { SignUpUserData } from './models/sign-up-user-model'

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

    const data = JSON.stringify({
      userid: result,
      event: 'signup',
      data: ''
    })

    fetch('http://127.0.0.1:8100/mail/query.php', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => console.log('Mail send to user with id', result))
      .catch(error => console.log('Mail send failed: ', error))

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
