import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import { useStyles } from './styles'
import { useMutation, useApolloClient } from '@apollo/client'
import { SIGN_UP } from './graphql/mutations'
import { IS_LOGGED } from '../shared/graphql/queries/is-logged-in'
import { LoginSignUpProps } from './types/auth.types'

const SignUp = ({ onSuccess }: LoginSignUpProps) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const client = useApolloClient()
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP)

  const onSubmit = async (input: Record<string, string>) => {
    const data = await signUp({ variables: { input } })

    if (data.signUp) {
      const { token } = data.signUp

      client.writeQuery({ query: IS_LOGGED, data: { isLoggedIn: true } })
      localStorage.setItem('token', token)
    }
  }

  useEffect(() => {
    if (data?.signUp) {
      onSuccess(data?.signUp.token)
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
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              inputRef={register({ required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
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
          Sign Up
        </Button>
      </form>
    </>
  )
}

export default SignUp
