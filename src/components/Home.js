import {Link} from 'react-router-dom'
import {getCurrentUser} from '../services/auth.service'
import {useEffect} from 'react'
import logo from '../css/images/Fetch_Logo_7.png'
import background from '../css/images/LandingPage_Background.jpg'


const Home = () => {

  const display = () => {
    return !getCurrentUser() ?
      <div className='card text-center mt-5' >
        <h1 className='card-title'>Welcome to <img src={logo} height='50px' /></h1>
        <h3 className='card-title'>Find Your Best Friend's New Best Friend</h3>
        <div className='row justify-content-between'>
        <Link to={'/login'}  className="col-md-4 btn fetch-btn">Log In</Link>
        <Link to={'/signup'} className="col-md-4 btn fetch-btn">Sign Up</Link>
        </div>
      </div>
    : (
      <div className='card text-center'>
      <h1 className='card-title'>Welcome Back!</h1>
      <Link to={'/profile'}  className="btn fetch-btn mx-auto">Go to Your Profile</Link>
    </div>
  )
}

return display()
}


export default Home;
