import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth.service";
import { AppBar, Toolbar, Typography, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  navlink: {
    color: "white",
    "&:hover": {
      textDecoration: "none",
    },
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});
const Layout = ({ children }) => {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    // get the cuurent user from the auth service
    const user = getCurrentUser();
    if (user) {
      // set current user to the currentUser state
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    logout();
    window.location.reload();
  };

  return (
    <div>
      <AppBar position="static" >
        <Toolbar className={classes.navbar}>
        <Link to={'/'} component={RouterLink} className={classes.navlink}>
        <Typography variant="h6">Bread the Love</Typography>
        </Link>
        <div >
          {currentUser ? (
            <>
              <Button color="inherit">
                <Link
                  to={"/profile"}
                  component={RouterLink}
                  className={classes.navlink}
                >
                  Profile
                </Link>
              </Button>
              <Button color="inherit" onClick={logOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to={"/login"}
                  component={RouterLink}
                  className={classes.navlink}
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to={"/signup"}
                  component={RouterLink}
                  className={classes.navlink}
                >
                  Sign Up
                </Link>
              </Button>
            </>
          )}
          </div>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default Layout;
