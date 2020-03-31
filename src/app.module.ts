import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { frontendMiddleware } from './shared/middleware/frontend-middleware'
import { ServeStaticModule } from '@nestjs/serve-static'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build')
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      context: ({ req }) => ({ req })
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(frontendMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
