import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { IS_LOGGED_IN } from './index'

const SignUp = lazy(() => import('./routes/signup'))
const Home = lazy(() => import('./routes/home'))

function App() {
  const { data } = useQuery(IS_LOGGED_IN)
  // return data.isLoggedIn ? <Pages /> : <Login />;

  return (
    <Router>
      <Suspense fallback={<div>Завантаження...</div>}>
        <Switch>
          <Route exact path="/" component={data.isLoggedIn ? Home : SignUp} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
