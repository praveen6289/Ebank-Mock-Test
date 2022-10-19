import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import LogIn from './components/LogIn'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route path="/ebank/login" component={LogIn} />
    <Route exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
