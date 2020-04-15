export interface SignUpUserData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface LoginInputData {
  usernameOrEmail: string
  password: string
}

export interface LoginResponse {
  token: string
}
