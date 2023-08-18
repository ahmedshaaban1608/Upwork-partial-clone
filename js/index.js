"use strict";
$(function () {
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  $(".skills-heading h2").click(function () {
    $(".skills-heading h2").removeClass("active");
    $(this).addClass("active");
    $(".content .row").addClass("d-none");
    $(".content ." + $(this).attr("id")).toggleClass("d-none");
  });
});
