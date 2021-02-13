import React, {useState , useRef, useEffect} from 'react';
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select'
import CheckButton from 'react-validation/build/button'
import validator from 'validator';
import {getCurrentUser} from '../services/auth.service'
// Common components we made
import FormGroup from './common/FormGroup'
import BtnSpinner from './common/BtnSpinner'
import NotLoggedIn from './common/NotLoggedIn'

import {resMessage} from '../utils/functions.utils'
import {getProfile, editProfile } from '../services/user.service'
import logo from '../css/images/Fetch_Logo_7.png'

const required = (value) => {
  if(!value){
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const email = (value) => {
  if (!validator.isEmail(value)) {
    return (<div className="alert alert-danger" role="alert">
      `${value} is not a valid email.`
    </div>
      )
  }
};


const EditProfile = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [data,setData] = useState({email:props.location.state?props.location.state.email:"", location:props.location.state?props.location.state.location:""})
  const [message, setMessage] = useState()
  const [successful, setSuccessful] = useState(false)
  const currentUser = getCurrentUser()
  useEffect(()=>{
    // if user accessing from other than link, load with axios request
    if(!props.location.state && currentUser){
      getProfile().then(response=>{
        setData({email:response.data.email,location:response.data.location})
      })
    }
  },[])

  const handleChange = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleEditProfile = (e) => {
    e.preventDefault()
    setMessage("")
    setSuccessful(false)
    // use the library to validate all fields on the form
    form.current.validateAll()
    if(checkBtn.current.context._errors.length === 0){
      setSuccessful(true)
      // edit the user
      editProfile(data.email, data.location).then((response)=>{
        setMessage('Successfully edited your profile')

        setTimeout(()=>{
          props.history.push('/profile')
        },200)
      },
      (error)=>{
          setSuccessful(false)
          setMessage(resMessage(error))
        }
      )
    } else {
      setSuccessful(false)
    }
  }

  const display = () => {
    // if trying to access and user is not logged in
    return !currentUser ?
    <NotLoggedIn/> :
    (
      <div className="col-md-12">
      <h1> Edit your profile </h1>
        <div className="card card-container">
          <img
            src={logo}
            alt="fetch-img"
            className="mb-5"
          />
          <Form onSubmit={handleEditProfile} ref={form}>
            <FormGroup>
            <label className="sr-only" htmlFor="email">Email</label>
              <Input
                type="text"

                className="form-control text-input"
                name="email"
                value={data.email}
                onChange={handleChange}
                validations={[required, email]}
              />
            </FormGroup>

            <div className="form-group">
              <div className="row">

              <label for="location" className="col-md-4">Location: </label>
              <Select  name='location' className="form-control text-input ml-md-3" value={data.location} onChange={handleChange}validations={[required]}>
                <option value='San Francisco, CA'>San Francisco</option>
                <option value='New York, NY'>New York</option>
                <option value='Portland, OR'>Portland</option>
                <option value='Houston, TX'>Houston</option>
              </Select>
              </div>
            </div>

            <BtnSpinner loading={successful} text="Edit Profile"/>

           {message && (
               <div className='form-group'>
                   <div className={successful ? 'alert alert-success':'alert alert-danger'} role='alert'>
                       {message}
                   </div>
               </div>
           )}
           <CheckButton style={{display:'none'}} ref={checkBtn} />
          </Form>
        </div>
      </div>
    )
  }

  return display()


}


export default EditProfile;
