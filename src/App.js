import {Switch, Route} from "react-router-dom"

// Components imports
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import FourOFour from './components/FourOFour'
import NewBread from './components/NewBread'
import ViewBread from './components/ViewBread'

// HOC which wraps around other Components
import Layout from './components/common/Layout'

// CSS imports
import "./css/App.css";



const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={['/','/home']} component={Home}/>
        <Route exact path={'/login'} component={Login}/>
        <Route exact path={'/signup'} component={Signup}/>
        <Route exact path={'/profile'} component={Profile}/>
        <Route exact path={'/bread/new'} component={NewBread}/>
        <Route exact path={'/bread/:id'} component={ViewBread}/>
        <Route path={'*'} component={FourOFour}/>
      </Switch>
    </Layout>
  )
};

export default App;
