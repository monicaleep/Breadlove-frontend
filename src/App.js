import {Switch, Route} from "react-router-dom"

// Components imports
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import FourOFour from './components/FourOFour'


// HOC which wraps around other Components
import Layout from './components/common/Layout'
// CSS imports
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/App.css";

// Icon library
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

library.add(fas, far)

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={['/','/home']} component={Home}/>
        <Route exact path={'/login'} component={Login}/>
        <Route exact path={'/signup'} component={Signup}/>
        <Route exact path={'/profile'} component={Profile}/>
        <Route exact path={'/profile/edit'} component={EditProfile}/>
        <Route path={'*'} component={FourOFour}/>
      </Switch>
    </Layout>
  )
};

export default App;
