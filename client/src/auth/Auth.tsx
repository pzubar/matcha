import React, { useState, useEffect, useCallback } from 'react'
import Login from './LogIn'
import SignUp from './SignUp'
import { useLocation, useHistory, Link as RouteLink } from 'react-router-dom'
import { Routes } from '../shared/constants/routes'
import CssBaseline from '@material-ui/core/CssBaseline'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { IS_LOGGED, IsLogged } from '../shared/graphql/queries/is-logged-in'
import { useApolloClient, useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styles'

const Auth = () => {
  const [isSignUpFlow, setIsSignUpFlow] = useState<boolean>(false)
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const client = useApolloClient()
  const { data } = useQuery<IsLogged>(IS_LOGGED)

  const logInUser = useCallback(
    token => {
      client.writeQuery({ query: IS_LOGGED, data: { isLoggedIn: true } })
      localStorage.setItem('token', token)
    },
    [client]
  )

  useEffect(() => {
    setIsSignUpFlow(location?.pathname?.includes('sign-up'))
  }, [location])

  useEffect(() => {
    if (data?.isLoggedIn) {
      history.push('/')
    }
  }, [data, history])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} />
        <Typography component="h1" variant="h5">
          {isSignUpFlow ? 'Sign up' : 'Log In'}
        </Typography>
        {isSignUpFlow ? (
          <SignUp onSuccess={logInUser} />
        ) : (
          <Login onSuccess={logInUser} />
        )}
        <Grid container justify="flex-end">
          <Grid item>
            <RouteLink to={isSignUpFlow ? Routes.Login : Routes.SignUp}>
              {isSignUpFlow
                ? 'Already have account? Log in!'
                : 'Have no account? Sign Up!'}
            </RouteLink>
          </Grid>
        </Grid>
      </div>
    </Container>
  )
}

export default Auth
