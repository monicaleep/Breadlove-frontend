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

export const createBread = (name, description, imageurl) => {
  return axios.post(API_URL+'bread',{name, description, imageurl},{headers:authHeader()})
}

export const updateBread = (id, data) => {
  return axios.put(API_URL+'bread/'+id,{...data},{headers:authHeader()})
}

export const deleteComment = (breadid, commentid) => {
  return axios.delete(API_URL+`bread/${breadid}/comment/${commentid}`,{headers:authHeader()})
}

export const newComment = (breadid, commentData) => {
  return axios.post(API_URL+`bread/${breadid}/comment`,{...commentData},{headers:authHeader()})
}
