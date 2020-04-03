import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtAuthGuard } from './jwt-auth.guard'

@Injectable()
export class GqlAuthGuard extends JwtAuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    console.log("HERE", ctx.getContext().req.headers)
    return ctx.getContext().req
  }
}