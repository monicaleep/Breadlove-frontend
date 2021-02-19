import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom'
import {getCurrentUser, logout} from '../../services/auth.service'
import icon from '../../css/images/logo.png'
import {AppBar, Toolbar, IconButton, MenuIcon, Typography, Button, Link} from '@material-ui/core'

const Layout = ({children}) => {

  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(()=>{
    // get the cuurent user from the auth service
    const user = getCurrentUser();
    if (user){
      // set current user to the currentUser state
      setCurrentUser(user)

    }

  },[])

  const logOut = () => {
    logout()
  }

  return (
    <div>
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" >
          Bread the love
        </Typography>
        {currentUser?
          (<>
            <Button color="inherit">
            <Link to={"/profile"} component={RouterLink}>
                Profile
            </Link>
          </Button>
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </>
        ):
        <>
        <Button color="inherit">
          <Link to={"/login"} component={RouterLink}>
            Login
          </Link>
        </Button>
        <Button color="inherit">
          <Link to={"/signup"} component={RouterLink}>
            Sign Up
          </Link>
        </Button>
      </> }
      </Toolbar>
    </AppBar>
    {children}
  </div>
)}

export default Layout;
