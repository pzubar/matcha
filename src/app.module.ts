import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { MessagesModule } from './messages/messages.module'
import { DatabaseModule } from './db/database.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/build'),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      formatError({ message }) {
        return new Error(message)
      }
    }),
    MessagesModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
