import React from 'react'
import Container from '@material-ui/core/Container'
import { useApolloClient } from '@apollo/client'
import { IS_LOGGED } from '../shared/graphql/queries/is-logged-in'

const Home = () => {
  const client = useApolloClient()
  return (
    <Container component="main" maxWidth="xs">
      Welcome Home!
      <button
        onClick={() => {
          client.writeQuery({ query: IS_LOGGED, data: { isLoggedIn: false } })
          localStorage.clear()
        }}
      >
        Log out
      </button>
    </Container>
  )
}

export default Home
