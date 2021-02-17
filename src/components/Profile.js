import React, {useState, useEffect} from 'react';
import {getCurrentUser, logout} from '../services/auth.service'
import {getProfile, deleteProfile} from '../services/user.service'
import {Link} from 'react-router-dom'
import NotLoggedIn from './common/NotLoggedIn'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const Profile = ({history}) =>{

  const currentUser = getCurrentUser() // from the header info
  const [data,setData] = useState({})

  useEffect(()=>{
    if(currentUser){
      getProfile().then(response=>{
        console.log(response.data)
        setData(response.data)
      })
    }
  },[])

  const deleteUser = () => {
    deleteProfile().then(data=>{
    })
    logout()
    history.push("/signup")
    window.location.reload()
  }

  const display = () => {
    console.log(data)
    return !currentUser ?
       <NotLoggedIn/>
     :  (

        <div className="container">
        <h3 className="text-center">
        <strong>{data.name}</strong>
        </h3>
          <header className='jumbotron'>
          <p><span className="orange-bold">Email Address:</span>{data.email}</p>
          <hr/>
          <form onSubmit={deleteUser}>
            <button className="btn delete-btn">Delete Account</button>
          </form>
          </header>

          <h2 className="orange-bold">Your Baked Goods:</h2>
          {data.bread?<div className="container">
            {data.bread.map(bg=>{
              return (<Link  to={ { pathname:`/profile/bread/${bg._id}`,state:{bg:bg} } } key={bg.id} >
                <div className="row align-items-center justify-content-start">
                  <div className="col-3"><h3 className="orange-bold">{bg.name}</h3></div>
                  <div className="col-5">
                    <img  className="profile-img-card" src={bg.imageurl} alt={bg.name}/>
                  </div>

              </div>
              </Link>)
            })}
          </div>:<></>}
          <div className="container">
            <Link to="/bread/new" className="">
            <div className="row align-items-center justify-content-start">
              <div className="col-12">
                <h4 className="orange-bold">
                  Add a baked good to share!
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
