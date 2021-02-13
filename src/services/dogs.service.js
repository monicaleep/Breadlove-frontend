import axios from 'axios'
import authHeader from '../utils/authHeader.utils'

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL : process.env.REACT_APP_PRO_URL;

export const deleteUserDog = (dogid) => {
  return axios.delete(API_URL+'profile/dogs/'+dogid,{headers:authHeader()})
}


export const getUserDog = (dogid) => {
  return axios.get(API_URL+'profile/dogs/'+dogid,{headers:authHeader()})
}
export const updateDog = (dogid, dogData) => {
  return axios.put(API_URL+'profile/dogs/'+dogid,{...dogData},{headers:authHeader()})
}

export const getMatches = (dogid) => {
  return axios.get(API_URL+'profile/dogs/'+dogid+'/matches',{headers:authHeader()})
}

export const newUserDog = (dogData) => {
  return axios.post(API_URL+'profile/dogs',{...dogData},{headers:authHeader()})
}


export const getRandomDogs = (yourDogId) => {
  return axios.get(`${API_URL}profile/dogs/${yourDogId}/dogs`,{headers:authHeader()})
}


export const rejectDog = (yourDogId, dogToReject) => {
  return axios.put(`${API_URL}profile/dogs/${yourDogId}/reject`,{dogToReject},{headers:authHeader()})
}

export const likeDog = (yourDogId, dogToLike) => {
  return axios.put(`${API_URL}profile/dogs/${yourDogId}/like`,{dogToLike},{headers:authHeader()})
}
