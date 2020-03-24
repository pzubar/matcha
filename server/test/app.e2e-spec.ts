import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth/sign-up', async () => {
    const result = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({
        username: 'test',
        firstName: 'FirstName',
        lastName: 'Last Name',
        password: 'password',
        email: 'a@gmail.com'
      })
      .expect(201)

    console.log(result)
  })
})
