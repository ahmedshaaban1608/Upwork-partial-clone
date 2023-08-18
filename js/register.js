"use strict";
import { setData, getData, getAllData } from "../utilities/localStorage.js";
import { setCookie } from "../utilities/cookies.js";
$(function () {
  const nextStep = $(".choose-account");
  const labels = $(".createLabel");
  const nameExp = /^[a-zA-z]{3,}$/i;
  const emailExp = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/i;
  const passExp = /^[a-zA-z0-9-_]{8,}$/i;

  // style radio on select and hover
  labels.hover(
    function () {
      $(this).addClass("border-primary");
    },
    function () {
      $(this).removeClass("border-primary");
    }
  );
  labels.click(function () {
    $(".createLabel").removeClass("bg-light");
    nextStep.prop("disabled", false);
    nextStep.addClass("my-primary text-white");
    $(this).addClass("bg-light");
    const radioValue = $(this).children("input").val();
    if (radioValue === "freelancer") {
      nextStep.text("Apply as a Freelancer");
    } else {
      nextStep.text("Join as a Client");
    }
  });
  // go to next step
  nextStep.click(function () {
    $(".first-step, .second-step").toggleClass("d-none");
  });
  ///////////// form validation for account creation
  const submit = $("#submitBtn");

  let validFname, validLname, validEmail, validPass;
  const validator = () => {
    if (
      validFname &&
      validLname &&
      validEmail &&
      validPass &&
      $("#agreeSend").prop("checked") &&
      $("#agreePolicy").prop("checked")
    ) {
      submit.prop("disabled", false);
      submit.addClass("my-primary text-white");
    } else {
      submit.prop("disabled", true);
      submit.removeClass("my-primary text-white");
    }
  };
  // hide validation when focus on input
  $("#fName, #lName, #email, #password").focus(function () {
    $(this).removeClass("is-valid is-invalid");
  });
  // first name validation
  $("#fName").blur(function () {
    if (nameExp.test($(this).val())) {
      $(this).addClass("is-valid").removeClass("is-invalid");
      $(this)
        .siblings("div")
        .attr("class", "valid-feedback")
        .text("Looks Good!");
      validFname = true;
    } else {
      validFname = false;
      $(this).addClass("is-invalid").removeClass("is-valid");
      $(this)
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("enter a valid name!");
    }
    validator();
  });
  // last name validation
  $("#lName").blur(function () {
    if (nameExp.test($(this).val())) {
      $(this).addClass("is-valid").removeClass("is-invalid");
      $(this)
        .siblings("div")
        .attr("class", "valid-feedback")
        .text("Looks Good!");
      validLname = true;
    } else {
      validLname = false;
      $(this).addClass("is-invalid").removeClass("is-valid");
      $(this)
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("enter a valid name!");
    }
    validator();
  });
  // email validation
  $("#email").blur(function () {
    if (emailExp.test($(this).val())) {
      $(this).addClass("is-valid").removeClass("is-invalid");
      $(this)
        .siblings("div")
        .attr("class", "valid-feedback")
        .text("Looks Good!");
      validEmail = true;
    } else {
      validEmail = false;
      $(this).addClass("is-invalid").removeClass("is-valid");
      $(this)
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("enter a valid email format!");
    }
    validator();
  });
  // password validation
  $("#password").blur(function () {
    if (passExp.test($(this).val())) {
      $(this).addClass("is-valid").removeClass("is-invalid");
      $(this)
        .siblings("div")
        .attr("class", "valid-feedback")
        .text("Looks Good!");
      validPass = true;
    } else {
      validPass = false;
      $(this).addClass("is-invalid").removeClass("is-valid");
      $(this)
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("password must be more than 7 characters");
    }
    validator();
  });
  // checkbox validation
  $("#agreeSend, #agreePolicy").click(function () {
    if ($(this).prop("checked")) {
      $(this).addClass("is-valid").removeClass("is-invalid");
      $(this)
        .siblings("div")
        .attr("class", "valid-feedback")
        .text("Looks Good!");
    } else {
      $(this).addClass("is-invalid").removeClass("is-valid");
      $(this)
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("Required checkbox");
    }
    validator();
  });

  submit.click(function (e) {
    e.preventDefault();
    let counter = getData("counter") ?? 0;
    const allUsersArr = getAllData("user");
    let existEmail = false;
    const alertText = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Email already used! </strong> if you have an account, try to <a
  href="login.html"
  class="text-primary fw-bold"
  >Log in!
</a>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
    allUsersArr.forEach((user) => {
      // email must be a unique
      if (user.email === $("#email").val()) {
        $("header").append(alertText);
        $(".alert").addClass("show");
        existEmail = true;
        return;
      }
    });
    if (
      !existEmail &&
      validFname &&
      validLname &&
      validEmail &&
      validPass &&
      $("#agreeSend").prop("checked") &&
      $("#agreePolicy").prop("checked")
    ) {
      counter++;
      const newUser = {
        id: `user_${counter}`,
        name: $("#fName").val() + " " + $("#lName").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      };
      setData(newUser.id, newUser);
      setData("counter", counter);
      setCookie("userID", newUser.id, 7);
      setCookie("email", newUser.email, 7);
      setCookie("password", newUser.password, 7);
      location.href = "find-work.html";
    } else {
      $("input:not('.is-valid')")
        .addClass("is-invalid")
        .siblings("div")
        .attr("class", "invalid-feedback")
        .text("Invalid field");
    }
  });
});
