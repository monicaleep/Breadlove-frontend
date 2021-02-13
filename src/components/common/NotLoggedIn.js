import React from 'react';
import {Link} from 'react-router-dom'

const NotLoggedIn = () => {
  return (
    <div>
     You must be logged in:
     <div>
       <Link to={'/login'} >
       Login
     </Link>
     </div>
     or
     <div>
       <Link to={'/signup'}>
       Signup
     </Link>
     </div>
   </div>
  );
}



export default NotLoggedIn;
