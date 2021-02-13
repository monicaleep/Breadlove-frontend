import axios from 'axios'
import authHeader from '../utils/authHeader.utils'

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PRO_URL;

/*
GET	 |   /profile	 |	retrieve user's profile
DELETE	 |   /profile	 |	delete user's profile
GET	 |  /api/test/user	 |	access User's content
GET	 | /api/test/admin	 |	access Admin's content
*/

// retrieve public content
// export const getPublicContent = () => {
//   return axios.get(API_URL+'all')
// }

// retrieve user's profile
export const getProfile = () => {

  return axios.get(API_URL+'profile', {headers: authHeader()}) // HEADERS WITH AN S MONICA JFC
}

export const deleteProfile = () => {
  return axios.delete(API_URL+'profile',{headers:authHeader()})
}

// export const getAdminBoard = () => {
//   return axios.get(API_URL+'admin', {header: authHeader()})
// }

export const editProfile = (email,location) => {
  return axios.put(API_URL+'profile',{email,location},{headers:authHeader()})
}
