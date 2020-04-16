import React, { useEffect } from 'react'
import { useStyles } from './styles'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LOG_IN } from './graphql/mutations'
import {
  LoginInputData,
  LoginResponse,
  LoginSignUpProps
} from './types/auth.types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const Login = ({ onSuccess }: LoginSignUpProps) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [logIn, { data, error, loading }] = useMutation<
    { login: LoginResponse },
    { input: LoginInputData }
  >(LOG_IN)

  const onSubmit = async (inputFields: Record<keyof LoginInputData, string>) =>
    logIn({
      variables: { input: inputFields as LoginInputData }
    })

  useEffect(() => {
    if (data?.login) {
      onSuccess(data?.login.token)
    }
  }, [data, onSuccess])

  return (
    <>
      {loading && 'Loading...'}
      {data && 'Success!'}
      {error && error.toString()}
      <form
        className={classes.form}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Username or email"
              name="usernameOrEmail"
              autoComplete="email"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register({ required: true })}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In
        </Button>
      </form>
    </>
  )
}

export default Login
