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
import { IS_LOGGED } from './shared/graphql/queries/is-logged-in'
import { typeDefs, resolvers } from './shared/graphql'

const cache = new InMemoryCache()
const client= new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:8000/graphql'
  }),
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
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
