import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const port = process.env.PORT || 8000
  const app = await NestFactory.create(AppModule)
  await app.listen(port)

  console.log('Server runs on a port: ', port)
}
bootstrap()
