"use stric";
import { deleteCookie } from "../utilities/cookies.js";
import { currentUser } from "../utilities/loggedInUserChecker.js";
import showJob from "../utilities/showKobs.js";
import { getData } from "../utilities/localStorage.js";

const api = "https://mocki.io/v1/7b5cee60-dff9-4b99-a82e-95ad7f29a167";
let JobsNodeList;

$(function () {
  const processData = (nodeList) => {
    nodeList.forEach((item) => {
      const job = {
        title: "",
        description: "",
        date: "",
      };
      job.title = item.querySelector("title").textContent.split(" - Upwork")[0];
      job.description = item.querySelector("description").textContent;
      job.date = item.querySelector("pubDate").textContent;
      $(".jobs-container").append(showJob(job));
    });
  };
  fetch(api)
    .then((response) => response.json())
    .then((str) => new window.DOMParser().parseFromString(str.text, "text/xml"))
    .then((data) => {
      JobsNodeList = data.querySelectorAll("item");
      processData(JobsNodeList);
    });

  ////
  $("#logOut").click(function () {
    deleteCookie("userID", currentUser.id, 10);
    deleteCookie("email", currentUser.email, 10);
    deleteCookie("password", currentUser.password, 10);
    location.href = "login.html";
  });
  /////
  const userData = getData(currentUser.id);
  $(".current-name").text(userData.name);
});
