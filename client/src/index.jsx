import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  split
} from '@apollo/client'
import './index.css'
import App from './App'
import { IS_LOGGED } from './shared/graphql/queries'
import { typeDefs, resolvers } from './shared/graphql'
import { ThemeProvider } from '@livechat/ui-kit'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const cache = new InMemoryCache()
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql'
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/graphql`,
  options: {
    reconnect: true
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)
const client = new ApolloClient({
  cache,
  link: splitLink,
  resolvers,
  typeDefs
})

cache.writeQuery({
  query: IS_LOGGED,
  data: {
    isLoggedIn: !!localStorage.getItem('token')
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
