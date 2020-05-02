import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import './index.css'
import App from './App'
import { IS_LOGGED } from './shared/graphql/queries'
import { typeDefs, resolvers } from './shared/graphql'
import { ThemeProvider } from '@livechat/ui-kit'
import { setContext } from 'apollo-link-context'

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

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
