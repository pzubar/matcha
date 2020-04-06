import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'

const SignUp = lazy(() => import('./routes/signup'))

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:8000/'
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Suspense fallback={<div>Завантаження...</div>}>
        <Switch>
          <Route exact path="/" component={SignUp} />
        </Switch>
      </Suspense>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
