import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Pool} from 'pg'
// const pg, { Pool, Client } = require('pg')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const pool = new Pool()
  // pool.query('SELECT NOW()', (err, res) => {
  //   console.log(err, res)
  //   pool.end()
  // })
// you can also use async/await
  const res = await pool.query('SELECT NOW()')
  console.log("RES:::", res);
  await pool.end()
}
bootstrap();
