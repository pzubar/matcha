import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { AppModule } from '../src/app.module'
import * as request from 'supertest'
import * as randomString from 'randomstring'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  // it('/auth/sign-up', async () => {
  //   await request(app.getHttpServer())
  //     .post('/auth/sign-up')
  //     .set('X-Forwarded-For', '192.168.2.1')
  //     .send({
  //       username: `u_${randomString.generate()}`,
  //       firstName: 'FirstName',
  //       lastName: 'Last Name',
  //       password: 'password',
  //       email: `${randomString.generate(5)}@gmail.com´`
  //     })
  //     .expect(201)
  // })

  it('/auth/sign-up', async () => {
    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .set('X-Forwarded-For', '192.168.2.1')
      .send({
        username: `u_test`,
        firstName: 'FirstName',
        lastName: 'Last Name',
        password: 'password',
        email: `${randomString.generate(5)}@gmail.com`
      })
      .expect(201)

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'u_test',
        password: 'password'
      })
      .expect(201)
  })
})
