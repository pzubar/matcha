import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { useApolloClient, useQuery } from '@apollo/client'
import { WHO_AM_I, IS_LOGGED } from '../shared/graphql/queries'

const Home = () => {
  const client = useApolloClient()
  const { data, loading } = useQuery(WHO_AM_I)

  return (
    <Container component="main" maxWidth="xs">
      {loading ? (
        'Loading...'
      ) : (
        <div>
          Welcome Home, {data?.whoAmI?.username}!
          <button
            onClick={() => {
              client.writeQuery({
                query: IS_LOGGED,
                data: { isLoggedIn: false }
              })
              localStorage.clear()
            }}
          >
            Log out
          </button>
        </div>
      )}
    </Container>
  )
}

export default Home
