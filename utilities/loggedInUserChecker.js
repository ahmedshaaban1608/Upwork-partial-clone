"use strict";
import { getCookie } from "./cookies.js";
import { getData } from "./localStorage.js";

// get current user from cookies and export it to be reusable at any page
const cookieUser = {
  id: getCookie("userID"),
  email: decodeURIComponent(getCookie("email")),
  password: getCookie("password"),
};
// get user data from local storage based on user ID that we get from cookies
// to check if the cookie username and cookie password are the same or not
// if yes ==> the user logged in
// if not or no cookie ==> redirect to home page

// current user object data
export const currentUser = getData(cookieUser.id);
if (
  !(
    currentUser &&
    cookieUser.email === currentUser.email &&
    cookieUser.password === currentUser.password
  )
) {
  window.location.href = "login.html";
}
