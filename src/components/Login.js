import {useState} from 'react';
import { useHistory} from 'react-router-dom'
// helpers
import {login} from '../services/auth.service'
import {resMessage} from '../utils/functions.utils'
// Formik/yup
import {useFormik} from 'formik';
import * as yup from 'yup';
//material ui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const validationSchema = yup.object({
  email: yup
  .string('Enter your email')
  .email('Enter a valid email')
  .required('Email is required'),
  password: yup
  .string('Enter your password')
  .min(8, 'Password should be of minimum 8 characters length')
  .required('Password is required')
});


const Login = () => {
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true)
      setMessage("")
      login(values.email, values.password).then((res) => {
        setLoading(false)
        setMessage('You successfully logged in')
        history.push('/')
      }, (error) => {
        setLoading(false)
        setMessage(resMessage(error))
      })
    }
  });


  return (
    <div>
    <form onSubmit={formik.handleSubmit}>
      <TextField
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}/>
      <TextField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}/>
      <Button color="primary" variant="contained" type="submit" disabled={loading}>
        Submit
      </Button>
      {
        message && (<div >

          {message}

        </div>)
      }
    </form>
  </div>)
}

export default Login;
