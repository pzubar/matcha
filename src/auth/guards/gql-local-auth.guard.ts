import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtAuthGuard } from './jwt-auth.guard'
import { LocalAuthGuard } from './local-auth.guard'
import { LoginInputData } from '../models/login.model'

@Injectable()
export class GqlLocalAuthGuard extends LocalAuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const { usernameOrEmail, password } = ctx.getContext().req.body
      .variables.input as LoginInputData

    ctx.getContext().req.body = { username: usernameOrEmail, password }

    return ctx.getContext().req
  }
}
