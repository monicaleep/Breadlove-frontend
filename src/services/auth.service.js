import axios from 'axios'
import {setItem, getItem, removeItem} from '../utils/localStorage.utils'
const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PRO_URL_AUTH;

/*
POST |	/api/signup |	signup new account
POST |	/api/signin |	login an account
*/


//function to register user
export const register = (username, email, password, location) => {
  return axios.post(API_URL+'signup', {
    username,
    email,
    password,
  })
}

// login the user
export const login = (email, password) => {
  console.log(process.env.NODE_ENV)
  return axios.post(API_URL+'signin', {
    email,
    password
  })
  .then((response) => {
    // if we got an access token back
    if(response.data.accessToken){
      setItem("user", response.data)
    }
    return response.data
  })
}

export const logout = () => {
  return removeItem("user")
}

// get the current user
export const getCurrentUser = () => {
  return getItem('user')
}
