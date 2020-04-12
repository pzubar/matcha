import React from 'react'
import Container from '@material-ui/core/Container'
import { useApolloClient } from '@apollo/client'

const Home = () => {
  const client = useApolloClient()
  return (
    <Container component="main" maxWidth="xs">
      Welcome Home!
      <button
        onClick={() => {
          client.writeData({ data: { isLoggedIn: false } })
          localStorage.clear()
        }}
      >
        Log out
      </button>
    </Container>
  )
}

export default Home
