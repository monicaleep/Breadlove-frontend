import React, {useState, useRef} from 'react';
import axios from 'axios'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import Select from 'react-validation/build/select'
import ImageUpload from './ImageUpload'


// Common components we made
import FormGroup from './common/FormGroup'
import BtnSpinner from './common/BtnSpinner'
import NotLoggedIn from './common/NotLoggedIn'
// helpers
import {resMessage} from '../utils/functions.utils'
import {getCurrentUser} from '../services/auth.service'
import {newUserDog} from '../services/dogs.service.js'

const required = (value) => {
  if(!value){
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

const vurl = (value) => {
  const img_regex = /(\.jpg)$|(\.png)$|(\.jpeg$)/
  if(!value.match(img_regex)){
    return (
      <div className="alert alert-danger" role="alert">
        Must be a valid image (jpeg, jpg, or png)
      </div>
    )
  }
}


const textLengthBio = (value) => {
  if(value.length>500){
    return (
      <div className="alert alert-danger" role="alert">
        Must be less than 500 characters
      </div>
    )
  }
}

const textLengthTemp = (value) => {
  if(value.length>25){
    return (
      <div className="alert alert-danger" role="alert">
        One or two words will suffice
      </div>
    )
  }
}


const BreadForm = (props) => {
  const form = useRef()
  const checkBtn = useRef()

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

// *** State for image uploader ***
  const [previewSelection, setPreviewSelection] = useState('')
  const [selectedImage, setSelectedImage] = useState('')


  // *** Functions for image uploader ***
  const handleImageChange = e => {
    //sets image state to file selected by user
    const imageFile = e.target.files[0]
    previewImageFile(imageFile)
  }

  // previews the selected image
  const previewImageFile = (imageFile) => {
    const reader = new FileReader()
    reader.readAsDataURL(imageFile)
    reader.onloadend = () => {
      setPreviewSelection(reader.result)
    }
  }


  const handleSubmitImage = (e) => {
    e.preventDefault()
    if (!previewSelection) return
    uploadImage(previewSelection)
  }

  const uploadImage = async (image) => {
    const url= 'https://api.cloudinary.com/v1_1/sfx818fetchapp/image/upload/'
    const preset = 'nl04th0n'

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', preset)
    try {
      const res = await axios.post(url, formData);
      const imageUrl = res.data.secure_url;
      handleImageValue(imageUrl)
    } catch (err) {
      console.error('ERROR HAPPENING', err);
    }
}

const handleImageValue = (imageUrl) => {
  setData({...data, picture_url: imageUrl})
}

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage("")
    // use the library to validate all fields on the form
    form.current.validateAll()
    // check on ages and sizes
    if(data.min_age>data.max_age){
      setMessage("Min age must be less than max age")
      return
    }
    if(data.min_size>data.max_size){
      setMessage("Min size must be less than max size")
      return
    }
    setLoading(true)
    // check min_age lte max_age and same for size
    if(checkBtn.current.context._errors.length === 0){
      setLoading(false)
      newUserDog(data).then((response)=>{
        setMessage(`Successfully added ${data.name}`)
        setSuccessful(true)
        setLoading(false)
        setTimeout(()=>{
          props.history.push('/profile')
        },200)
      },
      (error)=>{
        setSuccessful(false)
        setLoading(false)
        setMessage(resMessage(error))
      }
    )} else {
      setSuccessful(false)
      setLoading(false)
    }
  }

  const display = () => {
    return !getCurrentUser() ?
    <NotLoggedIn/>
    : (
      <div className="col-md-12">
        <div className="card">
          <Form onSubmit={handleSubmit} ref={form}>
            <FormGroup text="Title">
              <Input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={handleChange}
                validations={[required]}
              />
            </FormGroup>
           {/* image upload component */}
            <ImageUpload
              handler={handleImageChange}
              previewState={previewSelection}
              preview={previewImageFile}
              imageState={selectedImage}
              imageSubmit={handleSubmitImage}
            />
            <FormGroup className='d-none' text=''>
              <Input
                type="text"
                className="form-control d-none"
                name="imageurl"
                value={data.imageurl}
                onChange={handleImageValue}
                validations={[required,vurl]}
              />
            </FormGroup>

            <FormGroup text="description">
              <Input
                type="text"
                className="form-control"
                name="description"
                value={data.description}
                onChange={handleChange}
                validations={[required,textLengthBio]}
              />
            </FormGroup>

            <FormGroup text="Temperament">
              <Input
                type="text"
                className="form-control"
                name="temperament"
                value={data.temperament}
                onChange={handleChange}
                validations={[required,textLengthTemp]}
              />
            </FormGroup>








            </Form>
            </div>




            <BtnSpinner loading={loading} text="Create Dog"/>

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

export default BreadForm;
