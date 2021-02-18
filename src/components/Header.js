import {Link} from 'react-router-dom'
import {getCurrentUser} from '../services/auth.service'


const Header = () => {

  const display = () => {
    return !getCurrentUser() ?
      <div className='card text-center mt-5' >
        <h1 className='card-title'>Bread the Love</h1>
        <h3 className='card-title'>Login or Signup to share your baked goods!</h3>
        <div className='row justify-content-between'>
        <Link to={'/login'}  className="col-md-4 btn fetch-btn">Log In</Link>
        <Link to={'/signup'} className="col-md-4 btn fetch-btn">Sign Up</Link>
        </div>
      </div>
    : (
      <div className='card text-center'>
      <h1 className='card-title'>Welcome Back! Let's browse.</h1>
      <Link to={'/profile'}  className="btn fetch-btn mx-auto">Go to Your Profile</Link>
    </div>
  )
}

return display()
}


export default Header;
