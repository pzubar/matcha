import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as requestIp from 'request-ip'
import * as path from 'path'
import { HttpExceptionFilter } from './shared/filters/not-found-exception.filter'
import * as http from 'http'
const fetch = require('node-fetch')

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

  const data = JSON.stringify({
    userid: 27,
    event: 'signup',
    data: ''
  })

  const options = {
    hostname: 'localhost',
    port: 8100,
    path: '/mail.query.php',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  }

  fetch('http://127.0.0.1:8100/mail/query.php', {
    method: 'post',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => console.log(res.status))
    .catch(error => console.log(error))
}
bootstrap()
