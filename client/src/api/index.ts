import axios from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? '/api'
      : 'http://localhost:8000/api',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

export const signUpUser = (data: unknown) => instance.post('/auth/sign-up', data)
