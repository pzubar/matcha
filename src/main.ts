import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as requestIp from 'request-ip'

async function bootstrap() {
  const port = process.env.PORT || 8000
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(port)

  app.use(requestIp.mw())
  console.log('Server runs on a port: ', port)
}
bootstrap()
