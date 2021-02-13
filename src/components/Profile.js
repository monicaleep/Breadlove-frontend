import React, {useState, useEffect} from 'react';
import {getCurrentUser, logout} from '../services/auth.service'
import {getProfile, deleteProfile} from '../services/user.service'
import {Link} from 'react-router-dom'
import NotLoggedIn from './common/NotLoggedIn'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Profile = (props) =>{

  const currentUser = getCurrentUser() // from the header info
  const [data,setData] = useState({})
  const [dogs, setDogs] = useState([])

  useEffect(()=>{
    if(currentUser){
      getProfile().then(response=>{
        setData(response.data)
        setDogs(response.data.dogs)
      })
    }
  },[])

  const deleteUser = () => {
    deleteProfile().then(data=>{
    })
    logout()
    props.history.push("/signup")
    window.location.reload()
  }

  const display = () => {

    return !currentUser ?
       <NotLoggedIn/>
     :  (
        <div className="container">
        <h3 className="text-center">
        <strong>{currentUser.username}</strong>
        </h3>
          <header className='jumbotron'>
          <p><span className="orange-bold">City:</span> {data.location}</p>
          <p><span className="orange-bold">Email Address:</span>Email: {data.email}</p>
          <hr/>
          <Link to={{pathname:"/profile/edit",state:{email:data.email,location:data.location}}} className="btn fetch-btn">Edit Profile</Link>
          <form onSubmit={deleteUser}>
            <button className="btn delete-btn">Delete Account</button>
          </form>
          </header>

          <h2 className="orange-bold">Your Dogs:</h2>
          {dogs?<div className="container">
            {dogs.map(dog=>{
              return (<Link  to={ { pathname:`/profile/dogs/${dog._id}`,state:{dog:dog} } } key={dog._id} >
                <div className="row align-items-center justify-content-start">
                  <div className="col-3"><h3 className="orange-bold">{dog.name}</h3></div>
                  <div className="col-5">
                    <img  className="profile-img-card" src={dog.picture_url} alt={dog.name}/>
                  </div>

              </div>
              </Link>)
            })}
          </div>:<></>}
          <div className="container">
            <Link to="/profile/dogs/new" className="">

            <div className="row align-items-center justify-content-start">
              <div className="col-12">
                <h4 className="orange-bold">
                  Add a dog
                <FontAwesomeIcon className="ml-3 orange-bold" icon={['fas', 'plus']} size="1x"/>
              </h4>



              </div>


            </div>
          </Link>

          </div>






        </div>
      )
    }



  return display()
}

export default Profile;
