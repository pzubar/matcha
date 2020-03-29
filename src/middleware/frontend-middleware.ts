import { Request } from 'express'
import { join } from 'path'

export function frontendMiddleware(req: Request, res, next) {
  if (req.baseUrl.includes('api') || req.baseUrl.includes('static')) {
    return next()
  }

  res.sendFile(join(__dirname, '../../build/index.html'))
}
