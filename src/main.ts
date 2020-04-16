import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as requestIp from 'request-ip'
import * as path from 'path'
import { HttpExceptionFilter } from './shared/filters/not-found-exception.filter'

async function bootstrap() {
  const port = process.env.PORT || 8000
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })
  await app.listen(port)

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useStaticAssets(path.join(__dirname, '/../build'))

  app.use(requestIp.mw())
  console.log(`Server runs on http://localhost:${port}/`)
}
bootstrap()
