import axios from 'axios'
import authHeader from '../utils/authHeader.utils'

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/' : process.env.REACT_APP_PRO_URL;

export const getAllBread = () => {
  return axios.get(API_URL, {headers: authHeader()})
}

export const getOneBread = (breadid) => {
  return axios.get(API_URL+`bread/${breadid}`,{headers:authHeader()})

}

export const deleteBread = (bgid) => {
  return axios.delete(API_URL+'bread/'+bgid,{headers:authHeader()})
}



export const updateDog = (dogid, dogData) => {
  return axios.put(API_URL+'profile/dogs/'+dogid,{...dogData},{headers:authHeader()})
}



export const newComment = (breadid, commentData) => {
  return axios.post(API_URL+`bread/${breadid}/comments`,{...commentData},{headers:authHeader()})
}
