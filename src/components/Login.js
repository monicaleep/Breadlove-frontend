import React, {useState, useRef} from 'react';
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
// Common componenets
import FormGroup from './common/FormGroup'
import BtnSpinner from './common/BtnSpinner'
// helper
import { login } from '../services/auth.service'
import {resMessage} from '../utils/functions.utils'
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
const Login = (props) => {
  const form = useRef()
  const checkBtn = useRef()

  const [data, setData] = useState({email:"",password:""})
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)
    // use the library to validate all fields on the form
    form.current.validateAll()
    // validator stores errrors and we can check if error exists
    if(checkBtn.current.context._errors.length === 0){
      login(data.email, data.password).then((res)=>{
        setLoading(false)
        console.log(res.data)
      },
      (error)=>{


          setLoading(false)
          setMessage(resMessage(error))
        }
      )
    } else {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setData({...data,[e.target.name]:e.target.value})
  }


  return (
  <div className="col-md-12">
    <div className="card card-container">
      <img
        src={logo}
        alt="fetch-img"
        className="mb-5"
      />
      <Form onSubmit={handleLogin} ref={form} className="mt-5">
        <FormGroup >
        <label className="sr-only" htmlFor="email">Email</label>
          <Input
            placeholder="Email"
            type="text"
            className="text-input form-control "
            name="email"
            value={data.email}
            onChange={handleChange}
            validations={[required]}
          />
        </FormGroup>
        <FormGroup>
        <label className="sr-only" htmlFor="password">Password</label>
          <Input
            placeholder="Password"
            type="password"
            className="form-control text-input"
            name="password"
            value={data.password}
            onChange={handleChange}
            validations={[required]}
          />
        </FormGroup>

        <BtnSpinner loading={loading} text="Login"/>

       {message && (
           <div className='form-group'>
               <div className='alert alert-danger' role='alert'>
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

export default Login;
