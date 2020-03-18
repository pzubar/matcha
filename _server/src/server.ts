import http from 'http'
import express from 'express'

import middleware from './middleware'
import { applyMiddleware } from './utils'

const router = express()
applyMiddleware(middleware, router)

const { PORT = 3000 } = process.env
const server = http.createServer(router)

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
)
