import React, {useState } from 'react';
import { useHistory} from 'react-router-dom'
import {getCurrentUser} from '../services/auth.service'
import {createBread} from '../services/bread.service'
import {resMessage} from '../utils/functions.utils'

// custom components
import ImageUpload from './ImageUpload'
import NotLoggedIn from './common/NotLoggedIn'
// Formik/yup
import {useFormik} from 'formik';
import * as yup from 'yup';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const validationSchema = yup.object({
  name: yup
  .string('Enter a name')
  .required('Name is required'),
  description: yup
  .string('Enter a description')
  .required('Password is required')
});

const NewBread = () => {
  const [steptwo, setSteptwo] = useState(false)
  const [imageurl, setImageurl] = useState()

  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const user = getCurrentUser()

  const handleUploadedImage = (imgurl) => {
    setImageurl(imgurl)
    setSteptwo(true)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      setMessage('')
      createBread(values.name, values.description,imageurl).then((res) => {
        setLoading(false)
        setMessage('Successfully added your baked good')
        history.push('/')
      }, (error) => {
        setLoading(false)
        setMessage(resMessage(error))
      })
    }
  });



  return (
    !user ? <NotLoggedIn/> : (
    <>
    <ImageUpload handleUploadedImage={handleUploadedImage}/>
    {steptwo && <form onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}/>
      <TextField
        id="description"
        name="description"
        label="description"
        type="text"
        multiline="true"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}/>
      <Button color="primary" variant="contained" type="submit" disabled={loading}>
        Submit
      </Button>
      {
        message && (<div >

          {message}

        </div>)
      }
    </form>}
    </>
  )
  );
}



export default NewBread;
