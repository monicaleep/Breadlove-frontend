import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {getCurrentUser, logout} from '../../services/auth.service'
import icon from '../../css/images/logo.png'
import {AppBar, Toolbar, IconButton, MenuIcon, Typography, Button} from '@material-ui/core'

const Layout = (props) => {

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
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    {props.children}
  </div>
    // <nav className="navbar navbar-expand navbar-dark bg-dark">
    //   <Link to="/" className="navbar-brand">
    //     <img
    //       src={icon}
    //       alt="Monica Logo"
    //       className='rounded-circle'
    //       width='35px'
    //       height='35px'
    //     />
    //     </Link>
    //   <div className="navbar-nav mr-auto">
    //     <li className="nav-item">
    //       <Link to={"/home"} className="nav-link">Home</Link>
    //     </li>
    //
    //
    //     {/* {
    //       currentUser && (
    //         <li className="nav-item">
    //           <Link to={"/profile"} className="nav-link">
    //             Profile
    //             </Link>
    //         </li>
    //       )
    //     } */}
    //
    //   </div>
    //
    //     {currentUser ?
    //       <div className="navbar-nav ml-auto">
    //         <li className="nav-item">
    //           <Link to={'/profile'} className="nav-link">
    //             {currentUser.username}
    //           </Link>
    //         </li>
    //         <li>
    //           <a  href="/"  onClick={logOut}>
    //             Log out
    //           </a>
    //         </li>
    //       </div> : (
    //         <div >
    //           <li >
    //             <Link to={'/login'} >
    //               Login
    //             </Link>
    //           </li>
    //           <li >
    //             <Link to={'/signup'} >
    //               Signup
    //             </Link>
    //           </li>
    //       </div>)}
    //
    // </nav>
    //<div>

  //</div>
)}

export default Layout;
