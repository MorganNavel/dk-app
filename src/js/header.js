window.addEventListener("DOMContentLoaded", function (e) {
  console.log("header.js loaded ! ");

  const li_menu = document.getElementById("li_entrainement");
  console.log(li_menu);
  const div_category = document.getElementById("menu_panel");

  li_menu.addEventListener("click", function (e) {
    console.log("test");
    if (div_category.style.display == "none") {
      div_category.style.display == "block";
    } else {
      div_category.style.display == "none";
    }
  });
});
