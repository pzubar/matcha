import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation signup($input: SignUpUserData!) {
    signUp(signUpUserData: $input) {
      token
    }
  }
`

export const LOG_IN = gql`
  mutation Login($input: LoginInputData!) {
    login(loginInputData: $input) {
      token
    }
  }
`
