import axios from "axios";
import authHeader from "../utils/authHeader.utils";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/"
    : process.env.REACT_APP_PRO_URL;

/*
GET	 |   /profile	 |	retrieve user's profile
DELETE	 |   /profile	 |	delete user's profile
*/

// retrieve user's profile
export const getProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() }); // HEADERS WITH AN S MONICA JFC
};

// delete user's profile
export const deleteProfile = () => {
  return axios.delete(API_URL + "profile", { headers: authHeader() });
};
