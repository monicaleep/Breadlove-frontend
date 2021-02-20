import React, {useState, useEffect } from 'react';
import { useHistory} from 'react-router-dom'
import {getCurrentUser} from '../services/auth.service'
import {updateBread, getOneBread} from '../services/bread.service'
import {resMessage} from '../utils/functions.utils'

// custom components

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

const EditBread = ({match}) => {
  const history = useHistory()
  const currentUser = getCurrentUser()
  const [loading, setLoading] = useState()
  const [message,setMessage] = useState()
  const [data, setData] = useState()
  const id = match.params.id

  useEffect(()=>{
    getOneBread(id).then(res=>{
      setData(res.data)
    }).catch(err=>setMessage(resMessage(err)))
  })
  const formik = useFormik({
    initialValues: {
      name: (data && data.name) || '',
      description: (data && data.description) || ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      setMessage('')
      updateBread(id, values.name, values.description,data.imageurl).then((res) => {
        setLoading(false)
        setMessage('Successfully edited your baked good')

      }, (error) => {
        setLoading(false)
        setMessage(resMessage(error))
      })
    }
  });

  return ( currentUser ?
    <form onSubmit={formik.handleSubmit}>
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
        multiline={true}
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
    </form> : <NotLoggedIn/>
  );
}



export default EditBread;
