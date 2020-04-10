import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as requestIp from 'request-ip'

async function bootstrap() {
  const port = process.env.PORT || 8000
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  })
  await app.listen(port)

  app.use(requestIp.mw())
  console.log(`Server runs on http://localhost:${port}/`)
  /**
   * async function bootstrap() {
    const server = express();
    const config = require('../../etc/config.js');

    const apiFactory = new NestFactoryStatic();
    const api = await apiFactory.create(ApiModule, server);
    api.setGlobalPrefix("/api/v1");
    await api.init();

    const adminFactory = new NestFactoryStatic();
    const admin = await adminFactory.create(AdminModule, server);
    admin.setGlobalPrefix("/admin");
    await admin.init();

    http.createServer(server).listen(config.server.port);
}

   bootstrap();
   */
}
bootstrap()
