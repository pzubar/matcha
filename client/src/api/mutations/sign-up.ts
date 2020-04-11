import { gql } from '@apollo/client'

export const SIGN_UP = gql`
  mutation signup($input: SignUpUserData!) {
    signUp(signUpUserData: $input)
  }
`
