"use strict";
import { getData } from "../utilities/localStorage.js";
import { getCookie } from "../utilities/cookies.js";

// get current user from cookies and export it to be reusable at any page
const cookieUser = {
  id: getCookie("userID"),
  email: decodeURIComponent(getCookie("email")),
  password: getCookie("password"),
};
// get user data from local storage based on user ID that we get from cookies
// to check if the cookie email and cookie password are the same or not
// if yes ==> the user logged in ==> redirect to find work page
// if not or no cookie ===> stay in same page

const currentUser = getData(cookieUser.id);
if (
  currentUser &&
  cookieUser.email === currentUser.email &&
  cookieUser.password === currentUser.password
) {
  window.location.href = "find-work.html";
}
