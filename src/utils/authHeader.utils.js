import { getItem } from "./localStorage.utils.js";

export default function authHeader() {
  // grab the user from local storage (provided by browser)
  const user = getItem("user");
  // check if user was in local storage and if user has an access token
  if (user && user.accessToken) {
    return { "x-access-token": user.accessToken };
  } else {
    return {};
  }
}
