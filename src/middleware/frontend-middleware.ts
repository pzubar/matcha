import { Request } from 'express'
import { resolve } from 'path'
import { join } from 'path'

export function frontendMiddleware(req: Request, res, next) {
  if (req.path.includes('api') || req.baseUrl.includes('static')) {
    return next()
  }
  console.log('PATH::: ', req.baseUrl)
  // change the path to the correct html page path in your project
  res.sendFile(join(__dirname, '../../build/index.html'))
}
