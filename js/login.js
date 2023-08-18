"use strict";
import { getAllData } from "../utilities/localStorage.js";
import { setCookie } from "../utilities/cookies.js";
$(function () {
  const checkEmail = $(".check-email");
  const emailExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/i;

  let userLogin = {};

  $("#email, #password").focus(function () {
    $(this).removeClass("is-valid is-invalid");
  });

  checkEmail.click(function () {
    const emailValidate = emailExp.test($("#email").val());
    if (!emailValidate) {
      $("#email").addClass("is-invalid").removeClass("is-valid");
      $("#email")
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("enter a valid email format!");
    } else {
      const allUsersArr = getAllData("user");
      allUsersArr.forEach((user) => {
        if (user.email === $("#email").val()) {
          userLogin = user;
        }
      });
      $(".first-step, .second-step").toggleClass("d-none");
      $(".correct-email").text($("#email").val());
    }
  });

  $(".back-step").click(function () {
    $(".first-step, .second-step").toggleClass("d-none");
  });
  $("#loginBtn").click(function () {
    if ($("#password").val() === "") {
      $("#password").addClass("is-invalid").removeClass("is-valid");
      $("#password")
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("password can't be empty");
    } else {
      if ($("#password").val() === userLogin.password) {
        setCookie("userID", userLogin.id, 7);
        setCookie("email", userLogin.email, 7);
        setCookie("password", userLogin.password, 7);
        location.href = "/find-work.html";
      } else {
        const alertText = `<div class="alert alert-warning alert-dismissible fade" role="alert">
        <strong>Oops! </strong> Email or Password is not correct!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
        $("header").append(alertText);
        $(".alert").addClass("show");
      }
    }
  });
});
