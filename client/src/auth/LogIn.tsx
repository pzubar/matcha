import React, { useEffect, useCallback } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useStyles } from './styles'
import { useForm } from 'react-hook-form'
import { useApolloClient, useMutation } from '@apollo/client'
import { LOG_IN } from './graphql/mutations'
import { IS_LOGGED } from '../shared/graphql/queries/is-logged-in'
import { LoginInputData, LoginResponse } from './types/signup.types'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const Login = ({ navigateToSignUp }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const client = useApolloClient()
  const [logIn, { data, error, loading }] = useMutation<
    { login: LoginResponse },
    { input: LoginInputData }
  >(LOG_IN)

  const onSubmit = async (inputFields: Record<keyof LoginInputData, string>) =>
    logIn({
      variables: { input: inputFields as LoginInputData }
    })

  const logInUser = useCallback(token => {
    client.writeQuery({ query: IS_LOGGED, data: { isLoggedIn: true } })
    localStorage.setItem('token', token)
  }, [])

  useEffect(() => {
    if (data?.login) {
      logInUser(data?.login.token)
    }
  }, [data])

  return (
    <Container component="main" maxWidth="xs">
      {loading && 'Loading...'}
      {data && 'Success!'}
      {error && error.toString()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" onClick={navigateToSignUp}>
                Have no account? Sign Up!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default Login
