import React, {useState} from 'react';
import axios from 'axios'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import Select from 'react-validation/build/select'
import ImageUpload from './ImageUpload'


// Common components we made
import FormGroup from './common/FormGroup'
import NotLoggedIn from './common/NotLoggedIn'

// helpers
import {resMessage} from '../utils/functions.utils'
import {getCurrentUser} from '../services/auth.service'
import {createBread} from '../services/bread.service.js'




const BreadForm = (props) => {


  const [message,setMessage] = useState("")
  const [loading,setLoading] = useState(false)
  const [successful, setSuccessful] = useState(false)
  const [data,setData] = useState(
    {
      name:"",
      picture_url:"",
      description:"",
      }
    )

  const handleChange = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }







  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage("")
    setLoading(true)
    // check min_age lte max_age and same for size
      createBread(data).then((response)=>{
        setMessage(`Successfully added ${data.name}`)
        setSuccessful(true)
        setLoading(false)
        setTimeout(()=>{
          props.history.push('/')
        },200)
      },
      (error)=>{
        setSuccessful(false)
        setLoading(false)
        setMessage(resMessage(error))
      }
    )
  }

  const display = () => {
    return (
      <div className="col-md-12">
        <div className="card">
          <Form onSubmit={handleSubmit} >
            <FormGroup text="name">
              <Input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup text="description">
              <Input
                type="text"
                className="form-control"
                name="description"
                value={data.description}
                onChange={handleChange}

              />
            </FormGroup>
           {message && (
               <div className='form-group'>
                   <div className={successful ? 'alert alert-success':'alert alert-danger'} role='alert'>
                       {message}
                   </div>
               </div>
           )}
          </Form>
        </div>
      </div>
    )
  }
  return display()
}

export default BreadForm;
