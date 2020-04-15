import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { IS_LOGGED } from './shared/graphql/queries/is-logged-in'

const Auth = lazy(() => import('./auth'))
const Home = lazy(() => import('./home'))

function App() {
  const { data } = useQuery(IS_LOGGED)

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={data.isLoggedIn ? Home : Auth} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
