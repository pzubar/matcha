import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as requestIp from 'request-ip'
import * as express from 'express'
import { join } from 'path'

async function bootstrap() {
  const port = process.env.PORT || 8000
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await app.listen(port)

  app.use(requestIp.mw())

  app.use(express.static(join(process.cwd(), '../build/')))
  console.log(`Server runs on http://localhost:${port}/`)
}
bootstrap()
